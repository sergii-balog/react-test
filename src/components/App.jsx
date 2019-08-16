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
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

class App extends Component {
  state = {};
  handleSelectFlag = countryCode => {
    const lang = countryCode === "US" ? "en" : "ua";
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    this.setState({ lang });
  };
  componentDidMount() {
    const user = authService.getCurrentUser();
    const lang = localStorage.getItem("lang");
    if (lang) i18n.changeLanguage(lang);
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <I18nextProvider i18n={i18n}>
        <div className="container p-2">
          <ToastContainer />
          <NavBar user={user} onSelectFlag={this.handleSelectFlag} />
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
      </I18nextProvider>
    );
  }
}

export default App;
