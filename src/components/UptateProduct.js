import axios from 'axios'
import React, { Component } from 'react'
import Navbar from "../components/Navbar";

const validate=values=>{
  const errors={}
  if (values.nombre.length<1) {
    errors.nombre='El nombre es obligatorio'
  }
  if (values.precio.length<1) {
    errors.precio='El precio es obligatorio'
  }
  if(values.categoria.length<1 || values.categoria==='Seleccione una categoria' ){
    errors.categoria='Seleccione una categoria'
  }
  if (values.cantidad.length<1) {
    errors.cantidad='Ingrese la cantidad'
  }
  return errors;
}


export default class UptateProduct extends Component {
    state={
        create_at:'',
        nombre:'',
        precio:'',
        categoria:'',
        cantidad:'',
        categorias:[],
        errors:{}
    }
    async componentDidMount(){
        if(!localStorage.getItem('idedit')){
            window.location.href='/listproduct'
        }
        const id =localStorage.getItem('idedit');
        const res=await axios.get('http://localhost:4000/api/products/'+id);
        this.getCategorias();
        this.setState({
            nombre:res.data.product.nombre,
            precio:res.data.product.precio,
            categoria:res.data.product.categoria,
            cantidad:res.data.product.cantidad,
        })
        console.log(res);
        
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
    save=async(e)=>{
        const id =localStorage.getItem('idedit');
        const { create_at, nombre, precio, categoria,cantidad }=this.state
        const { errors, categorias, ...notErrors } = this.state;
    const result = validate(notErrors);
    this.setState({ errors: result });
    if(!Object.keys(result).length){
      const res=await axios.put('http://localhost:4000/api/products/'+id,{
            create_at:localStorage.getItem('id'),
            nombre,
            precio,
            categoria,
            cantidad
        });
        window.location.href='/listproduct'

    }
        
    }
    handleChange = async (e) => {
        await this.setState({
          [e.target.name]: e.target.value,
        });
      };
    render() {
        return (
            <div className="container">
        <Navbar></Navbar>
        <div className="card card-body my-5 col-md-6 offset-md-3">
          <h2>Edita el producto</h2>
          <div className="form-froup">
            <label htmlFor="nombre">Nombre del producto</label> <br />
            <input 
            value={this.state.nombre}  
            onChange={this.handleChange}
            type="text" 
            name="nombre"
            id="nombre" />
          </div>
          {this.state.errors.nombre &&<p className="alert alert-danger"> <small> {this.state.errors.nombre} </small> </p>}
          <div className="form-group">
            <label htmlFor="precio">Precio del producto</label> <br />
            <input 
            type="Number" 
            id="precio" 
            name='precio'
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

            <div 
            className="form-group">
                <label htmlFor="cantidad">Cantidad</label><br/>
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
          >Actualizar</button>




        </div>
      </div>
        )
    }
}
