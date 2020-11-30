import axios from "axios";
import React, { Component } from "react";

import Navbar from "../components/Navbar";

export default class ListProducts extends Component {
  state = {
    id: localStorage.getItem("id"),
    products: [],
    categoria: "",
    categorias: [],
    nombre: "",
    toggle: false,
    empty:false
  };
  async componentDidMount() {
    this.getProducts();
    this.getCategorias();
    this.setState({
      categoria: "todos",
    });
  }
  async getProducts() {
    let id = localStorage.getItem("id");
    const res = await axios.post("http://localhost:4000/api/products/prod", {
      id,
    });
    this.setState({
      products: res.data.products,
    });
  }
  deleteNote = async (id) => {
    await axios.delete("http://localhost:4000/api/products/" + id);
    this.getProducts();
  };
  edit = async (id) => {
    const res = await axios.get("http://localhost:4000/api/products/" + id);
    localStorage.setItem("idedit", res.data.product._id);
    console.log(res.data.product._id);
    window.location.href = "./editproduct";
  };

  seleccion = async (categorias) => {
    await this.getProducts();
    if (categorias === "todos") {
      await this.getProducts();
    } else {
      var categoria = [];
      for (let index = 0; index < this.state.products.length; index++) {
        if (this.state.products[index].categoria === categorias) {
          categoria[index] = this.state.products[index];
        } else {
        }
      }
      this.setState({
        products: categoria,
      });
    }
  };
  async getCategorias() {
    let id = localStorage.getItem("id");
    const res = await axios.post(
      "http://localhost:4000/api/categorias/categoriauser",
      {
        id,
      }
    );
    this.setState({
      categorias: res.data.products,
    });
  }
  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
      toggle:false,
      empty:false
    });
    const producto = this.state.categoria;
    this.seleccion(producto);
  };
  search = async (e) => {
    e.preventDefault();
    await this.getProducts();
    this.setState({
      toggle: false,
    });
    const producto = [];
    const nombre = this.state.nombre;
    for (let index = 0; index < this.state.products.length; index++) {
      if (this.state.products[index].nombre === nombre) {
        producto[index] = this.state.products[index];
      } else {
        
      }
    }
    if (nombre.length < 1) {
      this.setState({
        empty: true,
      });
      return null;
    }
    if (producto.length < 1) {
      this.setState({
        toggle: true,
      });
      return null;
    }
    this.setState({
      products: producto,
      empty:false
    });
  };
  render() {
    return (
      <div className="container">
        <Navbar></Navbar>
        <div>
          {this.state.toggle && (
            <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Producto no encontrado</h4>
            <p>No se encontró un producto con ese nombre en la base de datos</p>
            <hr />
            
          </div>
          )}
        </div>

        <h2>Lista de los productos creados </h2>
        <div className="row">
          <div className="col-lg-8">
            <select
              id="categoria"
              name="categoriaSelectet"
              className="form-control col-md-4"
              onChange={this.handleChange}
              name="categoria"
              value={this.state.categoria}
            >
              <option value="todos">Todos los productos</option>
              {this.state.categorias.map((categoria) => {
                return (
                  <option key={categoria._id}> {categoria.nombre} </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <form onSubmit={this.search} className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Buscar por nombre"
                aria-label="Search"
                value={this.state.nombre}
                name="nombre"
                onChange={this.handleChange}
              />
              <button
                className="btn btn-success my-2 my-sm-0"
                type="submit"
                data-toggle={this.state.toggle}
                data-target="#exampleModal"
              >
                Search
              </button>
              {this.state.empty &&<p className="alert alert-danger"> <small> Digite el nombre del producto a buscar </small> </p>}
            </form>
          </div>
        </div>

        <div className="row ">
          {this.state.products.map((product) => (
            <div className="col-md-4 p-2" key={product._id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between ">
                  <h4>Nombre: {product.nombre} </h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.edit(product._id)}
                  >
                    Editar
                  </button>
                </div>
                <div className="card-body">
                  <p>Hay: {product.cantidad} unidades </p>
                  <p>Categoria: {product.categoria} </p>
                  <p> el precio de cada unidad es de: {product.precio} </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteNote(product._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
