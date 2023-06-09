import React from 'react';
import { TextField } from '@mui/material';
import { Stack } from '@mui/system';

function OtpInput({ onChange, error }) {
  const [values, setValues] = React.useState(['', '', '', '', '', '']);
  const inputRefs = React.useRef([]);

  const handleValueChange = (index) => (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    if (newValue.length > 1) {
      return;
    }
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
    if (newValue && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    if (onChange) {
      onChange(newValues.join(''));
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.ctrlKey && event.keyCode === 8) {
      setValues(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } else if (event.key === 'Backspace' && !values[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'row' }} gap={3}>
      {values.map((value, index) => (
        <TextField
          error={error ? error : false}
          key={index}
          inputRef={(ref) => (inputRefs.current[index] = ref)}
          variant="outlined"
          value={value}
          onChange={handleValueChange(index)}
          onKeyDown={handleKeyDown(index)}
          inputProps={{
            autoComplete: 'off'
          }}
        />
      ))}
    </Stack>
  );
}

export default OtpInput;
