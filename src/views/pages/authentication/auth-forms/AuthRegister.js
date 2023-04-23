import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NumberWithCountryCode } from 'components';
import APIManager from 'utils/APImanager';
import { PhoneNumberContext } from 'contexts/PhoneNumberContext';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const apiManager = new APIManager();

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { setDetail } = useContext(PhoneNumberContext);
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { borderRadius } = useConfig();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { firebaseRegister, firebaseGoogleSignIn } = useAuth();

    const googleHandler = async () => {
        try {
            await firebaseGoogleSignIn();
        } catch (err) {
            console.error(err);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            {/* <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign up with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]} !important`,
                                fontWeight: 500,
                                borderRadius: `${borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid> */}

            <Formik
                initialValues={{
                    phoneDetailObj: '',
                    fullName: '',
                    email: '',
                    password: '',
                    submit: null,
                    termsAndConditions: false
                }}
                validationSchema={Yup.object().shape({
                    fullName: Yup.string().max(100,'Full name is too long').required('Full name is required'),
                    email: Yup.string().email('Must be a valid email address').max(255,'Email address is too long').required('Email address is required'),
                    termsAndConditions: Yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
                })}
                onSubmit={async (values) => {
                    const res = await apiManager.post('auth/register', {
                        fullName: values.fullName,
                        countryCode: values.phoneDetailObj.dialCode,
                        phoneNumber: values.phoneDetailObj.phoneNumber,
                        email: values.email
                      })
                    if(!res.error){
                        setDetail({countryCode:values.phoneDetailObj.dialCode,phoneNumber:values.phoneDetailObj.phoneNumber});
                        navigate('/otp-screen')
                    }
                    // try {
                        // await firebaseRegister(values.email, values.password).then(
                        //     () => {
                        //         // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                        //         // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                        //         // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                        //         // github issue: https://github.com/formium/formik/issues/2430
                        //     },
                        //     (err) => {
                        //         if (scriptedRef.current) {
                        //             setStatus({ success: false });
                        //             setErrors({ submit: err.message });
                        //             setSubmitting(false);
                        //         }
                        //     }
                        // );
                        console.log(values,'valuesss')
                    // }
                    // catch (err) {
                    //     console.error(err);
                    //     if (scriptedRef.current) {
                    //         setStatus({ success: false });
                    //         setErrors({ submit: err.message });
                    //         setSubmitting(false);
                    //     }
                    // }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.fullName && errors.fullName)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Full Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="text"
                                value={values.fullName}
                                name="fullName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.fullName && errors.fullName && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.fullName}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                            <NumberWithCountryCode fieldName="phoneDetailObj" />
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {/* <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl> */}

                        {/* {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )} */}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.termsAndConditions}
                                            onChange={handleChange}
                                            name="termsAndConditions"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.termsAndConditions && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.termsAndConditions}</FormHelperText>
                            </Box>
                        )}
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
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
