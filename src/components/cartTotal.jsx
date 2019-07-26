import React, { Component } from "react";
class CartTotal extends Component {
  render() {
    return (
      <div className="container">
        <div
          className="badge badge-info float-right m-2 p-2"
          style={{ borderRadius: "0px" }}
        >
          Total: $
          {this.props.items
            .reduce((a, b) => a + b.value * b.price, 0)
            .toFixed(2)}
        </div>
        <button
          className="btn btn-warning foat-left m-2"
          onClick={this.props.onUndo}
          title="Reload"
        >
          <i className="fa fa-undo" />
        </button>
      </div>
    );
  }
}

export default CartTotal;
