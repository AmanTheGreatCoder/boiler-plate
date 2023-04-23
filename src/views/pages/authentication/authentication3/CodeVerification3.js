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

// assets

// ===========================|| AUTH3 - CODE VERIFICATION ||=========================== //

const apiManager = new APIManager();

const CodeVerification = () => {
  const theme = useTheme();
  const [OTP, setOTP] = useState(null)
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { detail } = useContext(PhoneNumberContext);
  const maskedNumber = maskPhoneNumber(detail.phoneNumber)
  console.log('myvalue',detail)
  useEffect(() => {
    console.log('useeffect called')
    if(!detail.phoneNumber){
      navigate('/login')
    }
  }, [detail])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiManager.post('auth/verify-otp', {
      countryCode: detail.countryCode,
      phoneNumber: detail.phoneNumber,
      otp: parseInt(OTP)
    })
    if(!res.error){
      localStorage.setItem('token',res.data['access_token'])
      navigate('/dashboard/default')
    }
  }

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
                              We’ve send you code on {maskedNumber}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthCodeVerification onChange={otp=> setOTP(otp)} />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography
                          component={Link}
                          to="#"
                          variant="subtitle1"
                          sx={{ textDecoration: 'none' }}
                          textAlign={matchDownSM ? 'center' : 'inherit'}
                        >
                          Did not receive the OTP?
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          fullWidth
                          size="large"
                          type="submit"
                          variant="outlined"
                          color="secondary"
                        >
                          Resend Code
                        </Button>
                      </AnimateButton>
                    </Grid>
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

export default CodeVerification;
