import React from "react";

const Input = ({ name, label, hint, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={name}
        name={name}
        aria-describedby="emailHelp"
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
      />
      {hint && (
        <small id="emailHelp" className="form-text text-muted">
          {hint}
        </small>
      )}
    </div>
  );
};

export default Input;
