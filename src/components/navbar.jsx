import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import LanguageSelector from "./common/langSelector";
import i18n from "../i18n";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Movie Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              {i18n.t("Movies")}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              {i18n.t("Customers")}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              {i18n.t("Rentals")}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/cart">
              {i18n.t("Cart")}
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  {i18n.t("Login")}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  {i18n.t("Register")}
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  {i18n.t("Logout")}
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
        <LanguageSelector onSelectFlag={this.props.onSelectFlag} />
      </nav>
    );
  }
}

export default NavBar;
