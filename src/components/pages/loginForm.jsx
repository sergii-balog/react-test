import React, { Component } from "react";
import Input from "../common/input";

class LoginForm extends Component {
  state = {
    data: { username: "", password: "" }
  };
  handleSubmit = e => {
    e.preventDefault();
    // call the server
    console.log("Submited");
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="User name"
            value={this.state.data.username}
            onChange={this.handleChange}
            hint="We'll never share your email with anyone else"
            placeholder="User name"
          />
          <Input
            name="password"
            label="Password"
            value={this.state.data.password}
            onChange={this.handleChange}
            placeholder="Type password"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
