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


const CustomPhoneStyle = styled.div`
& > div > label{
  top: 20px;
}
& > div > div{
  padding-top: 11px;
}
& > div{
  width: 100%;
}
&.error > div > label{
  // color: ${props=>props.theme.palette.error.main};
}
.error{
    background: ${props=>props.theme.palette.error.dark};
    height: 40px;
    width: 40px;
  }

  `;

function NumberWithCountryCode({  fieldName }) {
  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: (newValue) =>{
      let error = null;
      console.log(newValue.phoneNumber,'check phone lefkjdsal')
      if(!phoneRegExp.test(newValue.phoneNumber)){
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
    <CustomPhoneStyle>
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
        onChange={(phone, others) => {
          phoneNumber = removeFirstSubstring(phone, others.dialCode)
          simplePhoneNumber = simplifyString(phoneNumber)
          setValue({
            phoneNumber: simplePhoneNumber || '',
            ...others
          })
        }}
      />
    </CustomPhoneStyle>
  )
}

export default NumberWithCountryCode