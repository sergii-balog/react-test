import React, { Component } from "react";

class CartHeader extends Component {
  render() {
    if (this.numberOfItems === 0) {
      return (
        <div
          className="alert alert-info text-muted"
          style={{ textAlign: "center" }}
        >
          Your cart is empty
        </div>
      );
    }
    return (
      <div className="alert alert-info" style={{ textAlign: "center" }}>
        <strong>{this.numberOfItems}</strong> item(s) in your cart
      </div>
    );
  }
  get numberOfItems() {
    return this.props.cartItems.reduce((a, b) => a + b.value, 0);
  }
}

export default CartHeader;
