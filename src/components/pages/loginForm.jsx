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
    const { username, password } = this.state.data;
    const result = await authService.login(username, password);
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
