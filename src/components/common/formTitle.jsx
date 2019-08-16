import React from "react";
import i18n from "../../i18n";

const FormTitle = ({ title }) => {
  return <h3 className="text-info text-center">{i18n.t(title)}</h3>;
};

export default FormTitle;
