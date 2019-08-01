import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
//import Cart from "./components/cart/cart";
import Movies from "./components/movies/movies";

// ReactDOM.render(
//   <Cart dataUrl="http://localhost:4546/api/cart" />,
//   document.getElementById("root")
// );
ReactDOM.render(<Movies />, document.getElementById("root"));
