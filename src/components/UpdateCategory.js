import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


const validate=data=>{
  const errors={}
  if (data.length<1) {
    errors.nombre='El nombre es obligatorio'
  }
  return errors;
}

export default class UpdateCategory extends Component {
  state = {
    nombre: "",
    create_at: "",
    id:'',
    errors:{}
  };
  async componentDidMount() {
    const id = localStorage.getItem("idCategory");
    this.setState({
      id
    })
    const categoria = await axios.get(
      "http://localhost:4000/api/categorias/" + id
    );
    console.log(categoria.data);
    this.setState({
      nombre: categoria.data.categoria.nombre,
      create_at: categoria.data.categoria.create_at,
    });
  }
  handleChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  save = async (e) => {
    e.preventDefault();
    const { nombre, create_at,id } = this.state;
    const result =validate(nombre);
    this.setState({errors:result});
    if (!Object.keys(result).length) {
      await axios.put("http://localhost:4000/api/categorias/"+id,{
      nombre,
      create_at,
    });
    window.location.href = "/createcategory";
    localStorage.removeItem('idCategory');
      
    }
    
  };
  render() {
    return (
      <div className="container">
        <Navbar></Navbar>
        <form
          className=""
          onSubmit={this.save}
          className="col-md-6 offset-md-3" 
        >
          <div className="form-group offset-md-3 ">
            <label htmlFor="nombre">Actualizar Categoria</label>
            <br />
            <input
              type="text"
              name="nombre"
              onChange={this.handleChange}
              id="nombre"
              value={this.state.nombre}
            />
             {this.state.errors.nombre &&<p className="alert alert-danger"> <small> {this.state.errors.nombre} </small> </p>}
          </div>

          <button type="submit" className="btn btn-primary offset-md-3">
            Actualizar Categoria
          </button>
        </form>
      </div>
    );
  }
}
