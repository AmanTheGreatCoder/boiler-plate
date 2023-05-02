import React, { useEffect } from 'react'
import styled from '@emotion/styled';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { simplifyString, removeFirstSubstring } from 'utils/Helper'
import { useTheme } from '@mui/material/styles';
import { useField } from 'formik';
import { countryCodeRegex, phoneRegExp, onlyNumber, isoCountryRegex } from 'utils/Regex';

function ReusableValidation({ fieldName, disabled, required, control, fieldValue, isSubmitting, varName }) {
  const theme = useTheme();
  const errorMessage = (fieldName) => {
    return `${fieldName} is not valid`
  }
  const validation = (value) => {
    let error = null;
    if (required && !value?.trim()) {
      error = `${fieldName} is required`
    }
    else if (control) {
      switch (control) {
        case "countryCode":
          if (!countryCodeRegex.test(value)) error = errorMessage(fieldName)
          break;
        case "isoCountry":
          if (!isoCountryRegex.test(value)) error = errorMessage(fieldName)
          break;
        case "isNumber":
          if (!onlyNumber.test(value)) error = errorMessage(fieldName)
          break;
      }
    }
    console.log('error1', error)
    return error;
  }
  const [field, meta, helpers] = useField({
    name: varName,
    validate: (newValue) => {
      return validation(newValue);
    }
  });

  const { name, onBlur, value = "" } = field;
  const { error, touched, } = meta;
  const { setValue, setTouched, setError } = helpers;
  const hasError = Boolean(error) && touched;

  useEffect(() => {
    console.log('error1 it should run')
    if (fieldValue) {
      setValue(fieldValue);
    }
    // setTouched(false,true);
  }, []);
  // useEffect(() => {
  //   console.log('isSubmitting', isSubmitting)
  //   if(isSubmitting){
  //     setTouched(true,true);
  //   }
  // }, [isSubmitting]);

  return (
    <FormControl disabled={disabled} fullWidth error={hasError} sx={{ ...theme.typography.customInput }}>
      <InputLabel htmlFor="outlined-adornment-email-register">{fieldName}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-email-register"
        type="text"
        disabled={disabled}
        value={value}
        name={name}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{}}
      />
      {hasError && (
        <FormHelperText error id="standard-weight-helper-text--register">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default ReusableValidation;