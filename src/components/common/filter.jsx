import React, { Component } from "react";
class Filter extends Component {
  render() {
    const { options, selectedIndex, onFilterSelected } = this.props;

    return (
      <ul className="list-group">
        <a
          href="# "
          key={0}
          className={
            0 === selectedIndex
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => {
            onFilterSelected(0);
          }}
        >
          All Items
        </a>
        {options.map((x, i) => (
          <a
            href="# "
            key={i}
            className={
              i + 1 === selectedIndex
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            onClick={() => {
              onFilterSelected(i + 1);
            }}
          >
            {x}
          </a>
        ))}
      </ul>
    );
  }
}

export default Filter;
