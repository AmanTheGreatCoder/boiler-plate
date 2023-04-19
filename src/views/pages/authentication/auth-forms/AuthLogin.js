import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  TextField
} from '@mui/material';
// import { Box } from "@material-ui/core";


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/material.css'
import MuiPhoneNumber from 'material-ui-phone-number';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { countryCodeRegex, phoneRegExp } from 'utils/Regex';
import APImanager from 'utils/APImanager';
import { NumberWithCountryCode} from 'components'

const apiManager = new APImanager();

const Login = ({ loginProp, ...others }) => {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(true);


  return (
    <>

      <Formik
        initialValues={{
          phone_number: '123456',
          countryCode: '91',
          phoneNumber: '',
          submit: null
        }}
        validateOnChange
        validateOnBlur={true}
        validationSchema={Yup.object().shape({
          phoneNumber: Yup.string().matches(phoneRegExp, 'Must be a valid phone number').min(5,'Phone number is too short').max(20).required('Phone number is required'),
          countryCode: Yup.string().matches(countryCodeRegex, 'Must be a valid country code').required('Country code is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const res = await apiManager.post('auth/login', {
            countryCode: values.countryCode,
            phoneNumber: values.phoneNumber
          })
          console.log('response', res)
        }
        }
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <NumberWithCountryCode error={Boolean(touched.phoneNumber && errors.phoneNumber)} onChange={e=>{
                setFieldValue('phoneNumber',e.phoneNumber)
                setFieldValue('countryCode',e.dialCode)
                console.log(e,'imcheck')
                }} />
            </FormControl>
            {touched.phoneNumber && errors.phoneNumber && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.phoneNumber}
                </FormHelperText>
              )}
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Typography
                variant="subtitle1"
                component={Link}
                to={
                  loginProp
                    ? `/pages/forgot-password/forgot-password${loginProp}`
                    : '/pages/forgot-password/forgot-password3'
                }
                color="secondary"
                sx={{ textDecoration: 'none' }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

Login.propTypes = {
  loginProp: PropTypes.number
};

export default Login;
