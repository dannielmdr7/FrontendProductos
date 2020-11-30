import React, { Component } from "react";

const axios = require("axios");



export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  crearUsuario = (e) => {
    e.preventDefault();
    window.location.href = "/createuser";
  };
  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };
  iniciarSesion = async (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    const res = await axios.post("http://localhost:4000/api/users/auth/", user);
    if(res.data[0] === undefined){
        alert('Usuario o contraseña incorrecta');
    }else{
        localStorage.setItem('id',res.data[0]._id);
        window.location.href='/listproduct'

    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="col-md-6 offset-md-5">Login</h1>
        <form onSubmit={this.iniciarSesion} className="col-md-6 offset-md-3">
          <div className="form-group  ">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password" 
              className="form-control"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary offset-md-4 ">
            Ingresar
          </button>
        </form>
        <button
          className="btn btn-success mt-5  offset-md-4"
          onClick={this.crearUsuario}
        >
          Crear usuario
        </button>
      </div>
    );
  }
}
