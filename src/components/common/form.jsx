import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";

class FormBase extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    //console.log(result.error);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value, options }) => {
    let validateObject = { [name]: value };
    if (options) {
      validateObject = {};
      validateObject._id = options[options.selectedIndex].value;
      validateObject.name = options[options.selectedIndex].text;
    }
    const schema = { [name]: this.schema[name] };
    console.log(this.schema[name].keys());
    const { error } = Joi.validate(validateObject, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    //console.log(input, this.state.data[input.name], input.value);
    const data = { ...this.state.data };
    if (input.type === "select-one") {
      data[input.name]._id = input.value;
    } else {
      data[input.name] = input.value;
    }

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };
  renderButton = buttonLabel => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {buttonLabel}
      </button>
    );
  };
  renderInput = (
    name,
    label,
    placeholder,
    hint,
    type = "text",
    options = []
  ) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        hint={hint}
        placeholder={placeholder}
        error={errors[name]}
        type={type}
        options={options}
      />
    );
  };
}

export default FormBase;
