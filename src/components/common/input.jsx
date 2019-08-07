import React from "react";

const Input = ({ name, label, hint, placeholder, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        aria-describedby="emailHelp"
        placeholder={placeholder || ""}
        {...rest}
      />
      {hint && (
        <small id="emailHelp" className="form-text text-muted">
          {hint}
        </small>
      )}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;
