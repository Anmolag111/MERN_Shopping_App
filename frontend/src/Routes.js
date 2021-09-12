import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import NotFound from "./NotFound";
import Security from "./user/Security";
import ManageOrders from "./user/ManageOrders";
import ForgetPassword from "./user/ForgetPassword";
import Orders from "./admin/Orders";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/forgetpassword" component={ForgetPassword} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
        <PrivateRoute
          exact
          path="/user/dashboard/security"
          component={Security}
        />
        <PrivateRoute
          exact
          path="/user/dashboard/orders"
          component={ManageOrders}
        />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={ManageCategories}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute
          exact
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
        <AdminRoute
          exact
          path="/admin/category/update/:categoryId"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/admin/orders" component={Orders} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
