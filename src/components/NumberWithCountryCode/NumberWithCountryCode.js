import React from 'react'
import styled from '@emotion/styled';
import {
  FormControl
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { simplifyString, removeFirstSubstring } from 'utils/Helper'
import { useTheme } from '@mui/material/styles';
import { useField } from 'formik';
import { countryCodeRegex, phoneRegExp } from 'utils/Regex';

const NumberStyle = styled.div`

  & > div{
    width:100%;
  }

  label{
    background: #fff;
    top:2px;
    padding: 0 10px;
  }
  
`

function NumberWithCountryCode({ fieldName, onlyCountries }) {
  const theme = useTheme()
  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: (newValue) => {
      let error = null;

      if (newValue?.phoneNumber && !phoneRegExp.test(newValue.phoneNumber)) {
        error = "Phone number is not valid"
      }
      return error;
    }
  });

  const { name, onBlur, value = "" } = field;
  const { error, touched } = meta;
  const { setValue } = helpers;
  const hasError = Boolean(error) && touched;

  let phoneNumber = '';
  let simplePhoneNumber = '';
  return (
    <NumberStyle>
      <MuiPhoneNumber
        error={hasError}
        name={name}
        onBlur={onBlur}
        helperText={hasError && error}
        value={value}
        disableAreaCodes={true}
        variant="outlined"
        id="phone-input"
        label="Phone number"
        defaultCountry={'in'}
        onlyCountries={onlyCountries}
        onChange={(phone, others) => {
          phoneNumber = removeFirstSubstring(phone, others.dialCode)
          simplePhoneNumber = simplifyString(phoneNumber)
          setValue({
            phoneNumber: simplePhoneNumber || '',
            ...others
          })
        }}
      />
    </NumberStyle>
  )
}

export default NumberWithCountryCode