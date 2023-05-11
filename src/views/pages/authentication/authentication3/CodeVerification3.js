import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthCodeVerification from '../auth-forms/AuthCodeVerification';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { PhoneNumberContext } from 'contexts/PhoneNumberContext';
import { maskPhoneNumber } from 'utils/Helper';
import APIManager from 'utils/APImanager';
import { AzhaiAuthContext } from 'contexts/AzhaiAuthContext';
import withTitle from 'higher order components/withTitle';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

// assets

// ===========================|| AUTH3 - CODE VERIFICATION ||=========================== //

const apiManager = new APIManager();

const CodeVerification = () => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(false);
  const [OTP, setOTP] = useState('')
  const [time, setTime] = useState(60);
  const [error, setError] = useState(false);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { detail } = useContext(PhoneNumberContext);
  const maskedNumber = maskPhoneNumber(detail.phoneNumber)

  useEffect(() => {

    if (!detail.phoneNumber) {
      navigate('/login')
    }
  }, [detail])

  const validOtp = () => {
    console.log("otp ", OTP)
    if (OTP.length < 6) {
      dispatch(
        openSnackbar({
          open: true,
          message: "Please enter valid otp",
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validOtp()) {
      const res = await apiManager.post('auth/verify-otp', {
        countryCode: detail.countryCode,
        phoneNumber: detail.phoneNumber,
        isRemember: detail.isRemember,
        otp: parseInt(OTP)
      })
      if (!res.error) {
        localStorage.setItem('token', res.data['access_token'])
        navigate('/dashboard/default')
      }
    }
    else {
      setError(true);
    }
  }


  useEffect(() => {
    let timerId;
    if (disabled) {
      timerId = setTimeout(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          setDisabled(false);
          setTime(60);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [disabled, time]);

  return (
    <AuthWrapper1>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={matchDownSM ? 'column-reverse' : 'row'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography
                              color={theme.palette.secondary.main}
                              gutterBottom
                              variant={matchDownSM ? 'h3' : 'h2'}
                            >
                              Enter Verification Code
                            </Typography>
                            <Typography variant="subtitle1" fontSize="1rem">
                              We send you on your phone.
                            </Typography>
                            <Typography
                              variant="caption"
                              fontSize="0.875rem"
                              textAlign={matchDownSM ? 'center' : 'inherit'}
                            >
                              We've send you code on +{detail.countryCode} {maskedNumber}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthCodeVerification error={error} onChange={otp => setOTP(otp)} />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} item xs={12}>
                      <Grid>
                        <Typography
                          variant="subtitle1"
                          sx={{ textDecoration: 'none' }}
                          textAlign={matchDownSM ? 'center' : 'inherit'}
                        >
                          {disabled ? `Time Remaining: 0:${time}` : 'Did not receive the OTP?'}
                        </Typography>
                      </Grid>
                      <Grid >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: disabled ? theme.palette.grey[500] : theme.palette.primary.main, cursor: disabled ? "not-allowed" : "pointer" }}
                          style={{ textDecoration: "underline" }}
                          textAlign={matchDownSM ? 'center' : 'inherit'}
                          onClick={async () => {
                            if (!disabled) {
                              try {
                                const res = await apiManager.post('auth/admin-login', {
                                  countryCode: detail.countryCode,
                                  phoneNumber: detail.phoneNumber
                                })
                                setDisabled(true)
                              } catch (e) {
                                console.error(e)
                              }
                            }
                          }}
                        >
                          Resend Code
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={12}> */}
                    {/* <AnimateButton>
                        <Button
                          disableElevation
                          disabled={disabled}
                          fullWidth
                          size="large"
                          onClick={async () => {
                            try {
                              const res = await apiManager.post('auth/admin-login', {
                                countryCode: detail.countryCode,
                                phoneNumber: detail.phoneNumber
                              })
                              setDisabled(true)
                            } catch (e) {
                              console.error(e)
                            }
                          }}
                          variant="outlined"
                          color="secondary"
                        >
                          {disabled ? time : ' Resend Code'}
                        </Button>
                      </AnimateButton> */}
                    {/* </Grid> */}
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <AuthFooter />
          </Grid>
        </Grid>
      </form>
    </AuthWrapper1>
  );
};

export default withTitle(CodeVerification, 'Phone Number Verification');
