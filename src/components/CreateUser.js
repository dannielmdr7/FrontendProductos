import React, { Component } from "react";
const axios=require('axios');


const validate=data=>{
  const errors={}
  if (data.username.length<1) {
    errors.username='El usuario es obligatorio'   
  }
  if (data.password.length<1) {
    errors.password='El password es obligatorio'
    
  }

  return errors;
}

export default class CreateUser extends Component {
  state = {
    username: "",
    password: "",
    errors:{}
  };

  save = async (e) => {
    e.preventDefault();
    const {errors,...data}=this.state
    const result=validate(data);
    this.setState({errors:result})
    if (!Object.keys.length) {
      const newUser={
        username:this.state.username,
        password:this.state.password
    };
    await axios.post('http://localhost:4000/api/users',newUser)
        .then(res=>console.log(res))
        .catch(err=>err);
    window.location.href='/'
      
    }
    
  };
  handleChange=async e=>{
    await this.setState({
            [e.target.name]:e.target.value
    });
    
}

  render() {
    return (
      <div className="container">
        <h1 className="col-md-6 offset-md-4">Crear Usuario</h1>
        <form className="col-md-6 offset-md-6" onSubmit={this.save}
         className="col-md-6 offset-md-3">
            <div className="form-group offset-md-3 ">

            <label htmlFor="username">Username</label>
            <br/>
            <input 
            type="text"
            name='username'
            onChange={this.handleChange}
            id='username'
            value={this.state.username}
            
            />
            {this.state.errors.username && <p className="alert alert-danger"> <small> {this.state.errors.username} </small> </p> }
            </div>
            <div className="form-group offset-md-3 ">
                <label htmlFor="password">Password</label>
                <br/>
                <input 
                type="text"
                name='password'
                id='username'
                value={this.state.password}
                onChange={this.handleChange}
                />
                {this.state.errors.password && <p className="alert alert-danger"> <small> {this.state.errors.password} </small> </p> }
            </div>
          
          <button type="submit" className="btn btn-primary offset-md-4 ">
            Crear Usuario
          </button>
        </form>
      </div>
    );
  }
}
