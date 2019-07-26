import React, { Component } from "react";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import CartHeader from "./cartHeader";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  handleUndo = () => {
    this.getItems();
  };
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    fetch(this.props.dataUrl)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          items: jsonData
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          items: []
        });
      });
  }
  handleDelete = counterId => {
    if (
      window.confirm(
        "Are you sure you want to delete '" +
          this.state.items.filter(x => x.id === counterId)[0].product +
          "'?"
      )
    ) {
      this.setState({
        items: this.state.items.filter(x => x.id !== counterId)
      });
    }
  };
  handleChange = (counterId, count) => {
    let newItems = this.state.items.slice();
    newItems.filter(x => x.id === counterId)[0].value = count > 0 ? count : 0;
    this.setState({
      items: newItems
    });
  };
  render() {
    return (
      <div className="p-2">
        <div className="container p-2" style={{ backgroundColor: "#f5f5f5" }}>
          <CartHeader cartItems={this.state.items} />
          {this.state.items.map((item, i) => (
            <CartItem
              key={item.id}
              item={item}
              onDelete={this.handleDelete}
              onChange={this.handleChange}
            >
              {i + 1}.&nbsp;
            </CartItem>
          ))}
          <CartTotal items={this.state.items} onUndo={this.handleUndo} />
        </div>
      </div>
    );
  }
}

export default Cart;
