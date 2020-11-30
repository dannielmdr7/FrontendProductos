import axios from "axios";
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Cookies from "universal-cookie";
const cookie = new Cookies();



const validate=values=>{
  const errors={}
  if (values.nombre.length<1) {
    errors.nombre='El nombre es obligatorio'
  }
  if (values.precio.length<1) {
    errors.precio='El precio es obligatorio'
  }
  if(values.categoria.length<1){
    errors.categoria='Seleccione una categoria'
  }
  if (values.cantidad.length<1) {
    errors.cantidad='Ingrese la cantidad'
  }
  return errors;
}
 




export default class CreateProduct extends Component {
  state = {
    create_at: "",
    nombre: "",
    precio: "",
    categoria: "",
    cantidad: "",
    categorias: [],
    errors: {},
  };
  componentDidMount() {
    if (!localStorage.getItem("id")) {
      window.location.href = "/";
    }
    this.getCategorias();
    this.setState({
      categoria: "",
      create_at: localStorage.getItem("id"),
    });
  }

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

  save = async (e) => {
    const { create_at, nombre, precio, categoria, cantidad } = this.state;
    const { errors, categorias, ...notErrors } = this.state;
    const result = validate(notErrors);
    this.setState({ errors: result });
    if (!Object.keys(result).length) {
      const res = await axios.post("http://localhost:4000/api/products", {
        create_at,
        nombre,
        precio,
        categoria,
        cantidad,
      });
      console.log(res);
      localStorage.setItem("ids", this.state.create_at);
      window.location.href = "/listproduct";
    }
  };

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="container">
        <Navbar></Navbar>
        <div className="card my-5 card-body col-md-6 offset-md-3">
          <h2>Crea un nuevo producto</h2>
          <div className="form-froup">
            <label htmlFor="nombre">Nombre del producto</label> <br />
            <input
              value={this.state.nombre}
              onChange={this.handleChange}
              type="text"
              name="nombre"
              id="nombre"
            />
            {this.state.errors.nombre &&<p className="alert alert-danger"> <small> {this.state.errors.nombre} </small> </p>}
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio del producto</label> <br />
            <input
              type="Number"
              id="precio"
              name="precio"
              onChange={this.handleChange}
              value={this.state.precio}
            />
            {this.state.errors.precio &&<p className="alert alert-danger"> <small> {this.state.errors.precio} </small> </p>}
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              name="categoriaSelectet"
              className="form-control col-md-4"
              onChange={this.handleChange}
              name="categoria"
              value={this.state.categoria}
            >
              <option> Seleccione una categoria </option>
              {this.state.categorias.map((categoria) => {
                return (
                  <option key={categoria._id}> {categoria.nombre} </option>
                );
              })}
            </select>
            {this.state.errors.categoria &&<p className="alert alert-danger"> <small> {this.state.errors.categoria} </small> </p>}

            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <br />
              <input
                id="cantidad"
                type="Number"
                name="cantidad"
                onChange={this.handleChange}
                value={this.state.cantidad}
              />
              {this.state.errors.cantidad &&<p className="alert alert-danger"> <small> {this.state.errors.cantidad} </small> </p>}
            </div>
          </div>
          <button
            className="btn btn-primary col-md-6 offset-md-3 "
            onClick={this.save}
          >
            Guardar
          </button>
        </div>
      </div>
    );
  }
}
