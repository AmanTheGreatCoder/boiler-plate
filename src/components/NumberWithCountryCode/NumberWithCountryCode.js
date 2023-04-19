import React from 'react'
import styled from '@emotion/styled';
import {
  FormControl
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { simplifyString, removeFirstSubstring } from 'utils/Helper'
import { useTheme } from '@mui/material/styles';


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

function NumberWithCountryCode({ onChange, error }) {

  let phoneNumber = '';
  let simplePhoneNumber = '';
  return (
    <CustomPhoneStyle>
      <MuiPhoneNumber
        disableAreaCodes={true}
        variant="outlined"
        id="phone-input"
        name='phoneNumber'
        label="Phone number"
        error={error}
        defaultCountry={'in'}
        onChange={(phone, others) => {
          console.log(phone,others,'heree')
          phoneNumber = removeFirstSubstring(phone, others.dialCode)
          simplePhoneNumber = simplifyString(phoneNumber)
          onChange({
            phoneNumber: simplePhoneNumber || '',
            ...others
          });
        }}
      />
    </CustomPhoneStyle>
  )
}

export default NumberWithCountryCode