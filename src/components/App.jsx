import React, { Component } from "react";
import Movies from "./movies/movies";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./pages/customers";
import NavBar from "./navbar";
import NotFound from "./pages/notfound";
import HomePage from "./pages/home";
import MovieForm from "./pages/movieform";
import Cart from "./cart/cart";

class App extends Component {
  render() {
    return (
      <div className="container p-2">
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route
              path="/cart"
              render={props => (
                <Cart dataUrl="http://localhost:4546/api/cart" {...props} />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
