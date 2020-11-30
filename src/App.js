import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Route } from 'react-router-dom'



import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Productos from './components/Productos'
import CreateProduct from './components/CreateProduct';
import ListProduct from './components/ListProducts';
import UpdateProduct from './components/UptateProduct'
import CreateCategory from './components/CreateCategory'
import UpdateCategory from './components/UpdateCategory';
function App() {
  return (
    <div className="App ">
      <Router>
        <Route path='/' exact component={Login} />
        <Route path='/createuser' exact component={CreateUser} />
        <Route path='/productos' exact component={Productos} />
        <Route path='/createproduct' exact component={CreateProduct} />
        <Route path='/listproduct' exact component={ListProduct} />
        <Route path='/editproduct' exact component={UpdateProduct} />
        <Route path='/createcategory' exact component={CreateCategory} />
        <Route path='/updatecategory' exact component={UpdateCategory} />
      </Router>
    </div>
  );
}

export default App;
