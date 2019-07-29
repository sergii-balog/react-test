import React, { Component } from "react";
class MoviesHeader extends Component {
  render() {
    const { numberOfItems, numberOfLiked } = this.props;
    if (numberOfItems === 0) {
      return (
        <div
          className="alert alert-info text-muted"
          style={{ textAlign: "center" }}
        >
          There are no movies in the database
        </div>
      );
    }
    return (
      <div className="alert alert-info" style={{ textAlign: "center" }}>
        Showing <strong>{numberOfItems}</strong> movies in the database [{" "}
        <strong>{numberOfLiked}</strong> liked ]
      </div>
    );
  }
}

export default MoviesHeader;
