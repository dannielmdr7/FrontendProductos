import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div >
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to='./listproduct' >
            Productos
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/createproduct' >Crear Producto</Link>
                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/listproduct' >Lista de productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/createcategory' >Crear Categoria</Link>                
              </li>
              <li className="nav-item">
                <Link className="nav-link " to='/productos' >Cerrar sesión</Link>                
              </li>
              
            </ul>
          </div>
        </nav>
        
      </div>
    );
  }
}
