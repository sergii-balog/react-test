import React from "react";
import Joi from "joi-browser";
import FormBase from "../common/form";
import FormTitle from "../common/formTitle";

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

  doSubmit = () => {
    // call the server
    console.log("Registered");
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
