import React from "react";
import PropTypes from "prop-types";
import AutoComplete from "components/AutoComplete/AutoComplete";

const ChooseCountry = (props) => {
  const {
    disabled = false,
    required = true,
    disableClear = false,
    valueToShowInField,
  } = props;

  return (
    <AutoComplete
      disabled={disabled}
      disableClear={disableClear}
      placeholder="Choose a country"
      url="country/list"
      fieldName={"countryId"}
      errorName={"Country"}
      optionRow={[
        "countryName",
        "isoCountry",
        { countryCode: true, field: "countryCode" },
      ]}
      showFlag={true}
      valueToShowInField={valueToShowInField || ["countryName", "isoCountry"]}
      required={required}
      inputProps={{
        style: { textTransform: "capitalize" },
      }}
    />
  );
};

ChooseCountry.propTypes = {};

export default ChooseCountry;
