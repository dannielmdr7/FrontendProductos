import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Createproduct from '../components/CreateProduct'
import ListProduct from '../components/ListProducts'

const cookie=new Cookies();

export default class Productos extends Component {
    state={
        username:'',
        id:''
    }
    componentDidMount(){
        if(! localStorage.getItem('id') ){
            window.location.href='./'
        }else{
            this.setState({
                username:cookie.get('username'),
                id:localStorage.getItem('id')
            })
            this.cerrarSesion();
            // console.log(cookie.get('username'));
        }
    }
    getUsers(){
        
    }
    cerrarSesion=()=>{
        cookie.remove('username',{path:'/'} );
        localStorage.clear();
        window.location.href='./'
    }
    render() {
        const user=cookie.get('username');
        return (
            <div className='container' >
                
            </div>
        )
    }
}
