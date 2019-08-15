import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./movies/movies";
import Customers from "./pages/customers";
import NavBar from "./navBar";
import NotFound from "./pages/notFound";
import HomePage from "./pages/home";
import MovieForm from "./pages/movieForm";
import Cart from "./cart/cart";
import LoginForm from "./pages/loginForm";
import RegistrationForm from "./pages/registrationForm";
import Logout from "./pages/logOut";
import * as authService from "../services/authService";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="container p-2">
        <ToastContainer />
        <NavBar user={user} />
        <div className="content">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies user={user} {...props} />}
            />
            <Route path="/customers" component={Customers} />
            <Route
              path="/cart"
              render={props => (
                <Cart dataUrl="http://localhost:4546/api/cart" {...props} />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/" exact component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
