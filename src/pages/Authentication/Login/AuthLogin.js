import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'components/AnimateButton';
import CustomAlert from 'components/CustomAlert';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginProp, ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: 'example@gmail.com',
        password: '12345'
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        CustomAlert({
          message: 'Login Successfull',
          color: 'success'
        });
        navigate('/dashboard');
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
            <InputLabel htmlFor="outlined-adornment-email-login">
              Email Address / Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address / Username"
              inputProps={{}}
            />
          </FormControl>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
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
