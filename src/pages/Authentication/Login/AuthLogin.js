import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Stack } from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'components/AnimateButton';
import APImanager from 'utils/APImanager';
import { PhoneNumberContext } from 'contexts/PhoneNumberContext';
import CustomAlert from 'components/CustomAlert';
import NumberWithCountryCode from 'components/NumberWithCountryCode';

const apiManager = new APImanager();

const Login = ({ loginProp, ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { detail, setDetail } = useContext(PhoneNumberContext);

  return (
    <Formik
      initialValues={{
        phoneDetailObj: '',
        checked: true
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (!values.phoneDetailObj.phoneNumber) {
            CustomAlert({
              message: 'Please enter phone number',
              color: 'error'
            });
            return;
          }
          const res = await apiManager.post('auth/admin-login', {
            countryCode: values.phoneDetailObj.dialCode,
            phoneNumber: values.phoneDetailObj.phoneNumber
          });
          if (!res.error) {
            setDetail({
              countryCode: values.phoneDetailObj.dialCode,
              phoneNumber: values.phoneDetailObj.phoneNumber,
              isRemember: values.checked
            });
            navigate('/otp-screen');
          }
        } catch (e) {
          console.error(e);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <NumberWithCountryCode fieldName="phoneDetailObj" />
          </FormControl>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.checked}
                  onChange={handleChange}
                  name="checked"
                  color="primary"
                />
              }
              label="Remember me"
            />
          </Stack>
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
                Send Code
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

Login.propTypes = {
  loginProp: PropTypes.number
};

export default Login;
