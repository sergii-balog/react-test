import React, { Component } from "react";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

class LanguageSelector extends Component {
  getDefaultCountry() {
    const lang = localStorage.getItem("lang");
    if (lang && lang === "ua") return "UA";
    return "US";
  }
  render() {
    return (
      <ReactFlagsSelect
        defaultCountry={this.getDefaultCountry()}
        countries={["US", "UA"]}
        customLabels={{ US: "EN", UA: "UA" }}
        onSelect={this.props.onSelectFlag}
      />
    );
  }
}

export default LanguageSelector;
