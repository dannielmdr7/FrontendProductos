import React, { Component } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";


const validate=values=>{
  const errors={}
  if (values.length<1) {
    errors.nombre='Ingrese un nombre'
    
  }


  return errors;
}


export default class CreateCategory extends Component {
  state = {
    nombre: "",
    create_at: "",
    categorias: [],
    errors:{}
  };
  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.setState({
      create_at: localStorage.getItem("id"),
    });
    this.getCategorias();
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
    e.preventDefault();
    const {nombre}=this.state;
    const res=validate(nombre);
    this.setState({errors:res})
    if (!Object.keys(res).length) {
      const newUser = {
        nombre: this.state.nombre,
        create_at: this.state.create_at,
      };
      await axios
        .post("http://localhost:4000/api/categorias", newUser)
        .then((res) => console.log(res))
        .catch((err) => err);
      this.setState({
        nombre: "",
      });
      this.getCategorias();
      
    }
    
  };

  deleteCategory = async (id) => {
    await axios.delete("http://localhost:4000/api/categorias/" + id);
    this.getCategorias();
  };
  updateCategory= async(id)=>{
      await localStorage.setItem('idCategory',id);
      window.location.href='/updatecategory'
  }

  render() {
    return (
      <div className="container">
        <Navbar></Navbar>
        
        <div className="row my-5">
          <div className="col-6">
            <form
              className=""
              onSubmit={this.save}
              className="col-md-6 offset-md-3"
            >
              <div className="form-group offset-md-3 ">
                <label htmlFor="nombre">Nueva Categoria</label>
                <br />
                <input
                  type="text"
                  name="nombre"
                  onChange={this.handleChange}
                  id="nombre"
                  value={this.state.nombre}
                />
              </div>
              {this.state.errors.nombre && <p className="alert alert-danger offset-md-3 "> <small> {this.state.errors.nombre} </small> </p> }

              <button
                type="submit"
                className="btn btn-primary offset-md-3"
              >Crear Categoria</button>
            </form>
          </div>
          <div className="col-6">
            <h2 className='offset-3' >Categorias creadas</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                </tr>
              </thead>
              {this.state.categorias.map((categoria) => {
                return (
                  <tbody key={categoria._id}>
                    <tr>
                      <td> {categoria.nombre} </td>
                      <td>
                        <button onClick={ ()=>this.updateCategory(categoria._id) } className="btn btn-primary m-1">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-pencil-square"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => this.deleteCategory(categoria._id)}
                          className="btn btn-danger m-1 "
                        >
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-trash-fill"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
