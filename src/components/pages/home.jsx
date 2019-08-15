import React from "react";
import * as auth from "../../services/authService";
const HomePage = () => {
  const user = auth.getCurrentUser();
  return (
    <React.Fragment>
      <h5 className="text-center">
        Welcome{user ? " " + user.name : " to our movie shop"}!
      </h5>
      <p>Welcome to our movies shop. Hope you have good time and enjoy it :)</p>
    </React.Fragment>
  );
};

export default HomePage;
