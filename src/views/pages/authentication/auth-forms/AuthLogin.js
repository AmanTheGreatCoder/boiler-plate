import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
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
  TextField,
} from "@mui/material";
// import { Box } from "@material-ui/core";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/material.css'
import MuiPhoneNumber from "material-ui-phone-number";

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";
import { countryCodeRegex, phoneRegExp } from "utils/Regex";
import APImanager from "utils/APImanager";
import { NumberWithCountryCode } from "components";
import { PhoneNumberContext } from "contexts/PhoneNumberContext";
import { dispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";

const apiManager = new APImanager();

const Login = ({ loginProp, ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { detail, setDetail } = useContext(PhoneNumberContext);

  return (
    <Formik
      initialValues={{
        phoneDetailObj: "",
        checked: true,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (!values.phoneDetailObj.phoneNumber) {
            dispatch(
              openSnackbar({
                open: true,
                message: "Please enter phone number",
                variant: "alert",
                alert: {
                  color: "error",
                },
                close: false,
              })
            );
            return;
          }
          const res = await apiManager.post("auth/admin-login", {
            countryCode: values.phoneDetailObj.dialCode,
            phoneNumber: values.phoneDetailObj.phoneNumber,
          });
          if (!res.error) {
            setDetail({
              countryCode: values.phoneDetailObj.dialCode,
              phoneNumber: values.phoneDetailObj.phoneNumber,
              isRemember: values.checked,
            });
            navigate("/otp-screen");
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
        setFieldValue,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <NumberWithCountryCode fieldName="phoneDetailObj" />
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
            {/* <Typography
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
              </Typography> */}
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
  loginProp: PropTypes.number,
};

export default Login;
