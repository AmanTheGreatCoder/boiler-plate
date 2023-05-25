import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';

// third-party
import OtpInput from 'react-otp-input-rc-17';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = ({ onChange, error }) => {
  const theme = useTheme();
  const [otp, setOtp] = useState();
  const borderColor =
    theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OtpInput
          isInputNum={true}
          shouldAutoFocus={true}
          value={otp}
          onChange={(otpNumber) => {
            setOtp(otpNumber);
            onChange(otpNumber);
          }}
          errorStyle={{ borderColor: 'red' }}
          hasErrored={error}
          numInputs={6}
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{
            width: '100%',
            margin: '8px',
            padding: '10px',
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            ':hover': {
              borderColor: theme.palette.primary.main
            }
          }}
          focusStyle={{
            outline: 'none',
            border: `2px solid ${theme.palette.primary.main}`
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button disableElevation fullWidth size="large" type="submit" variant="contained">
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};
export default AuthCodeVerification;
