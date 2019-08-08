import React from "react";

const SearchBox = props => {
  return (
    <input
      className="form-control my-2"
      id="search"
      name="search"
      type="text"
      value={props.value}
      placeholder="Search..."
      onChange={e => props.onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
