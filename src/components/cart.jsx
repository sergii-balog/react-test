import React, { Component } from "react";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import CartHeader from "./cartHeader";

class Cart extends Component {
  handleUndo = () => {
    this.getItems();
  };
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    // fetch(this.props.dataUrl)
    //   .then(response => response.json())
    //   .then(items => {
    //     this.setState({ items });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     this.setState({
    //       items: []
    //     });
    //   });
    var xmlhttp = new XMLHttpRequest();
    var self = this;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var items = JSON.parse(this.responseText);
        self.setState({ items });
      }
    };
    xmlhttp.open("GET", this.props.dataUrl, true);
    xmlhttp.send();
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
    if (this.state === null) return null;
    const { items } = this.state;
    return (
      <div className="p-2">
        <div className="container p-2" style={{ backgroundColor: "#f5f5f5" }}>
          <CartHeader cartItems={items} />
          {items.map((item, i) => (
            <CartItem
              key={item.id}
              item={item}
              onDelete={this.handleDelete}
              onChange={this.handleChange}
            >
              {i + 1}.&nbsp;
            </CartItem>
          ))}
          <CartTotal items={items} onUndo={this.handleUndo} />
        </div>
      </div>
    );
  }
}

export default Cart;
