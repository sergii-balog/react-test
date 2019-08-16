import React, { Component } from "react";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

class LanguageSelector extends Component {
  render() {
    return (
      <ReactFlagsSelect
        defaultCountry="US"
        countries={["US", "UA"]}
        customLabels={{ US: "EN", UA: "UA" }}
        onSelect={this.props.onSelectFlag}
      />
    );
  }
}

export default LanguageSelector;
