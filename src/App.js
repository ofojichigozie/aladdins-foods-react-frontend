import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './Admin/Login'
import AddNewAdmin from './Admin/AddNewAdmin'
import Dashboard from './Admin/Dashboard'
import AddNewProduct from './Admin/AddNewProduct'
import ManageProducts from './Admin/ManageProducts'
import ManageCustomers from './Admin/ManageCustomers'
import ManageOrders from './Admin/ManageOrders'

import Home from './Customer/Home';
import Cart from './Customer/Cart';
import Checkout from './Customer/components/Checkout';

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          {/* Customer Routes */}
          <Route exact path="/admin" component={Login}/>
          <Route exact path="/admin/dashboard" component={Dashboard}/>
          <Route exact path="/admin/add-new-admin" component={AddNewAdmin}/>
          <Route exact path="/admin/products" component={ManageProducts}/>
          <Route exact path="/admin/add-new-product" component={AddNewProduct}/>
          <Route exact path="/admin/customers" component={ManageCustomers}/>
          <Route exact path="/admin/orders" component={ManageOrders}/>

          {/* Customer Routes */}
          <Route exact path="/" component={Home}/>
          <Route exact path="/cart" component={Cart}/>
          <Route exact path="/checkout" component={Checkout}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
