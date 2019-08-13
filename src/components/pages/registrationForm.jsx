import React from "react";
import Joi from "joi-browser";
import FormBase from "../common/form";
import FormTitle from "../common/formTitle";
import * as userService from "../../services/userService";
import * as authService from "../../services/authService";

class RegistrationForm extends FormBase {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("User name"),
    password: Joi.string()
      .required()
      .min(6)
      .max(12)
      .label("Password"),
    name: Joi.string()
      .required()
      .min(3)
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      authService.loginWithJwt(response.headers["x-auth-token"]);
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
        <FormTitle title="Registration" />
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
          {this.renderInput("name", "Name", "Name", "Your preferred name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
