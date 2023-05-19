import React, { useEffect, memo } from "react";
import styled from "@emotion/styled";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { simplifyString, removeFirstSubstring } from "utils/Helper";
import { useTheme } from "@mui/material/styles";
import { useField } from "formik";
import {
  countryCodeRegex,
  phoneRegExp,
  onlyNumber,
  isoCountryRegex,
  domainRegex,
  ipRegex,
  isEmail,
  minMaxRegex,
} from "utils/Regex";

const ReusableValidation = memo(
  ({
    label,
    disabled,
    required,
    control,
    fieldValue,
    isSubmitting,
    fieldName,
    type,
    InputProps,
    min,
    max,
    maxLength,
  }) => {
    const theme = useTheme();
    const errorMessage = (label) => {
      return `${label} is not valid`;
    };
    const validation = (value) => {
      let error = null;
      if (required && typeof value === "string" && !value?.trim()) {
        error = `${label} is required`;
      } else if (control) {
        switch (control) {
          case "countryCode":
            if (!countryCodeRegex.test(value)) error = errorMessage(label);
            break;
          case "isoCountry":
            if (!isoCountryRegex.test(value)) error = errorMessage(label);
            break;
          case "isNumber":
            if (!onlyNumber.test(value)) {
              error = errorMessage(label);
            }
            if (!isNaN(value)) {
              if (!isNaN(min)) {
                if (parseInt(value) < min) {
                  error = `${label} must be greater than ${min}`;
                }
              } else if (!isNaN(max)) {
                if (parseInt(value) > max) {
                  error = `${label} must be less than ${max}`;
                }
              }
            }
            break;
          case "isEmail":
            if (!isEmail.test(value)) error = errorMessage(label);
            break;
          case "isDomain":
            if (!domainRegex.test(value)) error = errorMessage(label);
            break;
          case "isIP":
            if (!ipRegex.test(value)) error = errorMessage(label);
            break;
          case "isPort":
            if (value < 1 || value > 65535) error = errorMessage(label);
            break;
          case "isDomainOrIP":
            if (!ipRegex.test(value) && !domainRegex.test(value))
              error = errorMessage(label);
            break;
        }
      }

      return error;
    };
    const [field, meta, helpers] = useField({
      name: fieldName,
      validate: (newValue) => {
        return validation(newValue);
      },
    });

    const { name, onBlur, value = "" } = field;
    const { error, touched } = meta;
    const { setValue, setTouched, setError } = helpers;
    const hasError = Boolean(error) && touched;

    useEffect(() => {
      if (fieldValue) {
        setValue(fieldValue);
      }
      // setTouched(false,true);
    }, []);
    // useEffect(() => {
    //
    //   if(isSubmitting){
    //     setTouched(true,true);
    //   }
    // }, [isSubmitting]);

    return (
      <FormControl
        disabled={disabled}
        fullWidth
        error={hasError}
        sx={{ mt: 1, mb: 0.5 }}
      >
        <TextField
          type={type || "text"}
          label={label}
          error={hasError}
          variant="outlined"
          disabled={disabled}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={(e) => {
            if (
              (control === "isNumber" || control === "isPort") &&
              !onlyNumber.test(e.target.value)
            ) {
              if (e.target.value === "") {
                setValue("");
              }
              return;
            }
            setValue(e.target.value);
          }}
          inputProps={{ maxLength }}
          InputProps={{ ...InputProps }}
        />
        {hasError && (
          <FormHelperText error id="standard-weight-helper-text--register">
            {error}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default ReusableValidation;
