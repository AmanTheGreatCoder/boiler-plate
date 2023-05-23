import { useEffect, memo } from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useField } from "formik";
import {
  countryCodeRegex,
  onlyNumber,
  isoCountryRegex,
  domainRegex,
  ipRegex,
  isEmail,
} from "utils/Regex";
import phone from "phone";

const ReusableValidation = memo((props) => {
  const {
    label,
    propValue,
    disabled,
    required,
    control,
    fieldValue,
    fieldName,
    type,
    inputProps,
    InputProps,
    onChange,
    min,
    max,
    maxLength,
  } = props;
  const errorMessage = (label) => {
    return `${label} is not valid`;
  };

  const validation = (value) => {
    let error = null;
    if (required && typeof value === "string" && !value?.trim()) {
      error = `${label} is required`;
    } else if (control) {
      switch (control) {
        case "isValidPhoneNumber":
          let valid = phone(`+${propValue.countryCode}${value}`, {
            country: propValue.isoCountry,
          });

          if (!valid.isValid) error = errorMessage(label);
          break;
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
  }, []);

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
            (control === "isNumber" ||
              control === "isPort" ||
              control === "isPhoneNumber") &&
            !onlyNumber.test(e.target.value)
          ) {
            if (e.target.value === "") {
              setValue("");
            }
            return;
          }
          setValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        inputProps={{ maxLength, ...inputProps }}
        InputProps={{ ...InputProps }}
      />
      {hasError && (
        <FormHelperText error id="standard-weight-helper-text--register">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
});

export default ReusableValidation;
