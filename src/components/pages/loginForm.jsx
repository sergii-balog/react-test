import React from "react";
import Joi from "joi-browser";
import FormBase from "../common/form";
import FormTitle from "../common/formTitle";
import * as authService from "../../services/authService";

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
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <FormTitle title="Login" />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            "User name",
            "User name",
            "We'll never share your email with anyone else"
          )}
          {this.renderInput(
            "password",
            "Password",
            "Type password",
            "",
            "password"
          )}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
