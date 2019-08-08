import React from "react";

const Input = ({
  name,
  label,
  hint,
  placeholder,
  error,
  options,
  type,
  value,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <select
          className="form-control"
          id={name}
          name={name}
          value={value._id}
          {...rest}
        >
          {options.map(x => (
            <option key={x._id} value={x._id}>
              {x.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="form-control"
          id={name}
          name={name}
          type={type}
          placeholder={placeholder || ""}
          {...rest}
        />
      )}
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
