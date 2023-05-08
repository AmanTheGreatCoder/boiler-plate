import React, { useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useField } from "formik";

function ReusableSwitch({
  fieldName,
  disabled,
  required,
  control,
  fieldValue,
  isSubmitting,
  varName,
}) {
  const theme = useTheme();
  const [field, meta, helpers] = useField({
    name: varName,
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
      label={fieldName}
    />
  );
}

export default ReusableSwitch;
