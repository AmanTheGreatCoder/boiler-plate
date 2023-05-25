import React, { useEffect } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useField } from 'formik';

function ReusableSwitch({
  label,
  disabled,
  required,
  control,
  fieldValue,
  isSubmitting,
  fieldName
}) {
  const theme = useTheme();
  const [field, meta, helpers] = useField({
    name: fieldName
  });

  const { name, value = true } = field;
  const { error, touched } = meta;
  const { setValue, setTouched, setError } = helpers;

  // useEffect(() => {
  //
  //   if(isSubmitting){
  //     setTouched(true,true);
  //   }
  // }, [isSubmitting]);

  return (
    <FormControlLabel
      control={
        <Switch
          name={name}
          checked={value}
          onClick={() => {
            setValue(!value);
          }}
          color="primary"
        />
      }
      label={label}
    />
  );
}

export default ReusableSwitch;
