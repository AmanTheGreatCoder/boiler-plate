import React from 'react';
import styled from '@emotion/styled';
import { FormControl } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { simplifyString, removeFirstSubstring } from 'utils/Helper';
import { useTheme } from '@mui/material/styles';
import { useField } from 'formik';
import { countryCodeRegex, phoneRegExp } from 'utils/Regex';

const NumberStyle = styled.div`
  & > div {
    width: 100%;
  }

  label {
    background: #fff;
    top: 1px;
    padding: 0 10px;
  }
`;

function NumberWithCountryCode(props) {
  const { fieldName, onlyCountries, propValue, disabled, disableDropdown, sx } = props;
  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: (newValue) => {
      let error = null;

      if (newValue?.phoneNumber && !phoneRegExp.test(newValue.phoneNumber)) {
        error = 'Phone number is not valid';
      }
      return error;
    }
  });
  const { name, onBlur, value = propValue || '' } = field;
  const { error, touched } = meta;
  const { setValue } = helpers;
  const hasError = Boolean(error) && touched;

  let phoneNumber = '';
  let simplePhoneNumber = '';

  return (
    <NumberStyle>
      <MuiPhoneNumber
        error={hasError}
        disabled={disabled}
        name={name}
        disableDropdown={disableDropdown || disabled}
        onBlur={onBlur}
        helperText={hasError && error}
        value={value}
        disableAreaCodes={true}
        variant="outlined"
        id="phone-input"
        label="Phone number"
        defaultCountry={'in'}
        sx={{ ...sx }}
        onlyCountries={onlyCountries}
        onChange={(phone, others) => {
          phoneNumber = removeFirstSubstring(phone, others.dialCode);
          simplePhoneNumber = simplifyString(phoneNumber);
          setValue({
            phoneNumber: simplePhoneNumber || '',
            ...others
          });
        }}
      />
    </NumberStyle>
  );
}

export default NumberWithCountryCode;
