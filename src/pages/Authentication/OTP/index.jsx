import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'components/Logo';
import { useContext, useEffect, useState } from 'react';
import { PhoneNumberContext } from 'contexts/PhoneNumberContext';
import { maskPhoneNumber } from 'utils/Helper';
import APIManager from 'utils/APImanager';
import withTitle from 'hoc/withTitle';
import CustomAlert from 'components/CustomAlert';
import { KeyboardBackspaceTwoTone } from '@mui/icons-material';
import AuthCodeVerification from './AuthCodeVerification';
import { AzhaiAuthContext } from 'contexts/AuthContext';

const apiManager = new APIManager();

const CodeVerification = () => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(false);
  const [OTP, setOTP] = useState('');
  const [time, setTime] = useState(60);
  const [error, setError] = useState(false);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { setAuth } = useContext(AzhaiAuthContext);
  const { detail } = useContext(PhoneNumberContext);
  const maskedNumber = maskPhoneNumber(detail.phoneNumber);

  useEffect(() => {
    if (!detail.phoneNumber) {
      navigate('/login');
    }
  }, [detail]);

  const validOtp = () => {
    if (OTP.length < 6) {
      CustomAlert({
        message: 'Please enter otp',
        color: 'error'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validOtp()) {
      const res = await apiManager.post('auth/verify-otp', {
        countryCode: detail.countryCode,
        phoneNumber: detail.phoneNumber,
        isRemember: detail.isRemember,
        otp: parseInt(OTP)
      });
      if (!res.error) {
        localStorage.setItem('token', res.data['access_token']);
        const result = await apiManager.get('auth/profile');
        setAuth(result.data);
        navigate('/dashboard');
      }
    } else {
      setError(true);
    }
  };

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
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: 'calc(100vh - 68px)' }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    position={'relative'}
                  >
                    <Grid display={'flex'} alignItems={'center'} item sx={{ mb: 3 }}>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          left: 0,
                          marginLeft: '12px'
                        }}
                        onClick={() => navigate('/')}
                        color="secondary"
                        size="medium"
                      >
                        <KeyboardBackspaceTwoTone />
                      </IconButton>
                      <Logo />
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
                      <AuthCodeVerification error={error} onChange={(otp) => setOTP(otp)} />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      item
                      xs={12}
                    >
                      <Grid>
                        <Typography
                          variant="subtitle1"
                          sx={{ textDecoration: 'none' }}
                          textAlign={matchDownSM ? 'center' : 'inherit'}
                        >
                          {disabled
                            ? `Time Remaining: 0:${
                                time.toString().length === 1 ? `0${time}` : time
                              }`
                            : 'Did not receive the OTP?'}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: disabled ? theme.palette.grey[500] : theme.palette.primary.main,
                            cursor: disabled ? 'not-allowed' : 'pointer'
                          }}
                          style={{ textDecoration: 'underline' }}
                          textAlign={matchDownSM ? 'center' : 'inherit'}
                          onClick={async () => {
                            if (!disabled) {
                              try {
                                const res = await apiManager.post('auth/admin-login', {
                                  countryCode: detail.countryCode,
                                  phoneNumber: detail.phoneNumber
                                });
                                setDisabled(true);
                              } catch (e) {
                                console.error(e);
                              }
                            }
                          }}
                        >
                          Resend Code
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            {/* <AuthFooter /> */}
          </Grid>
        </Grid>
      </form>
    </AuthWrapper1>
  );
};

export default withTitle(CodeVerification, 'Phone Number Verification');
