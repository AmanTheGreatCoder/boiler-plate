import React from "react";
import PropTypes from "prop-types";
import CustomAutoComplete from "components/CustomAutoComplete";

const ChooseCountry = (props) => {
  const {
    disabled = false,
    required = true,
    disableClear = false,
    valueToShowInField,
    onChange,
  } = props;

  return (
    <CustomAutoComplete
      disabled={disabled}
      disableClear={disableClear}
      placeholder="Choose a country"
      url="country/list"
      fieldName={"countryId"}
      errorName={"Country"}
      onChange={onChange}
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
