import React, { Component } from "react";

class CartItem extends Component {
  render() {
    const { children, item, onChange, onDelete } = this.props;
    return (
      <div className="row m-1" style={{ borderBottom: "solid 1px #cacaca" }}>
        <div className="col-sm-4" style={{ verticalAlign: "center" }}>
          <div className="m-2">
            {children}
            {item.product}
          </div>
        </div>
        <div className="col-sm-2">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          <span
            className="badge badge-info p-2"
            style={{ borderRadius: "0px" }}
          >
            $ {(item.price * item.value).toFixed(2)}
          </span>
        </div>
        <div className="col">
          <button
            onClick={() => {
              onChange(item.id, item.value + 1);
            }}
            className="btn btn-sm btn-secondary m-2"
          >
            <i className="fa fa-plus-circle" />
          </button>
          <button
            onClick={() => {
              onChange(item.id, item.value - 1);
            }}
            className="btn btn-sm btn-secondary"
          >
            <i className="fa fa-minus-circle" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="btn btn-sm btn-danger m-2"
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses = () => {
    let classes = "badge m-2 p-2 badge-";
    classes += this.props.item.value === 0 ? "warning" : "primary";
    return classes;
  };
  formatCount = () => {
    const count = this.props.item.value;
    return count === 0 ? "None" : count;
  };
}

export default CartItem;
