import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom'

import Home from './container/Home/Home'
import Signup from './container/User/Signup/Signup'
import Signin from './container/User/Signin/Signin'
import PrivateRoute from './Auth/PrivateRoute'
import AdminRoute from './Auth/AdminRoute'
import UserDashboard from './component/UserDashboard/UserDashboard'
import AdminDashboard from "./component/AdminDashboard/AdminDashboard"
import AddCategory from "./container/AdminArea/AddCategory/AddCategory"
import AddProduct from "./container/AdminArea/AddProduct/AddProduct"
import Shopping from './container/Shopping/Shopping'
import Product from "./container/Product/Product"
import Cart from "./container/Cart/Cart"
import Profile from "./component/UserDashboard/Profile/Profile"
import ManageProducts from "./container/AdminArea/ManageProducts/ManageProducts"
import UpdateProduct from "./container/AdminArea/UpdateProduct/UpdateProduct"

const routes = () => {
    return (
        <BrowserRouter>
         
            <Switch>
                
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path='/shop'exact component={Shopping}/>
                <Route path='/'exact component={Home}/>
                <PrivateRoute path="/user/dashboard" component={UserDashboard} exact/>   
                <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact/>
                <AdminRoute path="/create/category" component={AddCategory} exact />
                <AdminRoute path="/create/product" component={AddProduct} exact />
                <Route path="/product/:productId" exact component={Product} exact />
                <PrivateRoute path="/cart" exact component={Cart}/>
                <PrivateRoute path="/profile/:userId" component={Profile} exact/> 
                <AdminRoute path="/admin/products" component={ManageProducts} exact/>  
                <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} exact />

            </Switch>
        </BrowserRouter>
    )
}
export default routes