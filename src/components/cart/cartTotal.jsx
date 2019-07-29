import React from "react";

const CartTotal = props => {
  return (
    <div className="container">
      <div
        className="badge badge-info float-right m-2 p-2"
        style={{ borderRadius: "0px" }}
      >
        Total: $
        {props.items.reduce((a, b) => a + b.value * b.price, 0).toFixed(2)}
      </div>
      <button
        className="btn btn-warning foat-left m-2"
        onClick={props.onUndo}
        title="Reload"
      >
        <i className="fa fa-undo" />
      </button>
    </div>
  );
};

export default CartTotal;
