import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import FormBase from "../common/form";
import FormTitle from "../common/formTitle";
import * as authService from "../../services/authService";
import i18n from "../../i18n";

class LoginForm extends FormBase {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .required()
      .label("User name"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await authService.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <FormTitle title="Login" />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            i18n.t("User name"),
            i18n.t("User name"),
            i18n.t("UserName hint")
          )}
          {this.renderInput(
            "password",
            i18n.t("Password"),
            i18n.t("Type password"),
            "",
            "password"
          )}
          {this.renderButton(i18n.t("Login"))}
        </form>
      </div>
    );
  }
}

export default LoginForm;
