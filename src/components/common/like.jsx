import React from "react";

const Like = props => {
  const { onClick, liked } = props;
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={liked ? "fa fa-heart" : "fa fa-heart-o"}
    />
  );
};

export default Like;
