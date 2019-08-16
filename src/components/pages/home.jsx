import React from "react";
import * as auth from "../../services/authService";
import i18n from "../../i18n";

const HomePage = () => {
  const user = auth.getCurrentUser();
  return (
    <React.Fragment>
      <h5 className="text-center">
        Welcome{user ? " " + user.name : " to our movie shop"}!
      </h5>
      <p>{i18n.t("Welcome message")}</p>
    </React.Fragment>
  );
};

export default HomePage;
