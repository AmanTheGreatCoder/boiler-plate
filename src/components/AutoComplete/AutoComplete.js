import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import APIManager from 'utils/APImanager';
import debounce from 'lodash.debounce'
import { useField } from 'formik';
import './AutoComplete.css'
import { addDefaultSrc } from 'utils/Helper'

const apiManager = new APIManager();

function AutoComplete({ placeholder, url, customOptions, showCustomOptions = false, optionRow, valueToShowInField, fieldName, errorName, disabled, showFlag, query, onChange, multiple, freeSolo, required }) {
  const [options, setOptions] = useState([]);
  const [formValue, setFormValue] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const fetchData = async (value) => {
    let queryString = `${url}?limit=20&pageNo=1&search=${value ? value : ''}`
    if (query) {
      Object.keys(query).map(e => {
        if (query[e]) {
          queryString += `&${e}=${query[e]}`
        }
      })
    }
    const res = await apiManager.get(queryString);
    if (!res.error) {
      if (showFlag) {
        setImageUrl(res.data.imageUrl)
      }
      setOptions(res.data.data)
    }
  }

  const verify = useCallback(
    debounce(async (value) => {

      fetchData(value);
    }, 1000),
    []
  );

  useEffect(() => {
    if (url) {
      verify(formValue);
    }
  }, [formValue])

  useEffect(async () => {
    if (url) {
      fetchData(formValue);
    }
  }, [])

  const getOptionRow = (option) => {

    const temp = optionRow?.map(e => {
      if (typeof e === 'string') {
        return <span className='space-to-right'>{`${option[e]}`}</span>
      } else if (typeof e === 'object' && e.field === 'countryCode') {
        return <span className='space-to-right'>{`+${option[e.field]}`}</span>
      }
    })
    if (showFlag) {
      temp.unshift(<img className='space-to-right' height={16} width={16} src={imageUrl + option.flag} onError={addDefaultSrc} />)
    }

    return temp
  }

  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: (newValue) => {
      let error = null;

      if (required && (!newValue || (typeof newValue === 'object' && Object.keys(newValue).length === 0))) {

        error = `${errorName} is required`
      }
      return error
    }
  });

  const { name, onBlur, value = "" } = field;
  const { error, touched, } = meta;
  const { setValue, setTouched, setError } = helpers;
  const hasError = Boolean(error) && touched;

  return (
    <Autocomplete
      multiple={multiple}
      freeSolo={freeSolo}
      id="country-select-demo"
      options={!showCustomOptions ? options : customOptions}
      name={name}
      disabled={disabled}
      autoHighlight
      getOptionLabel={(option) => valueToShowInField ? option[valueToShowInField] : option}
      // isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => (
        optionRow && (<li {...props} style={{ fontSize: 15 }}>
          {getOptionRow(option)}
        </li>)
      )}
      value={value ? value : null}
      // onBlur={() => {
      //   setFormValue('')
      //   onBlur()
      // }}
      onBlur={onBlur}
      onInputChange={(e) => setFormValue(e?.target?.value)}
      onChange={(event, value) => {
        setValue(value)

        onChange && onChange(value)
      }}
      renderInput={(params) => {

        return <TextField
          autoComplete='off'
          disabled={disabled}
          error={hasError}
          onBlur={onBlur}
          helperText={hasError && error}
          {...params}
          label={placeholder}
          sx={{
            mt: 1,
            mb: 1,
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autocomplete and autofill
          }}
        />
      }}
    />
  )
}
export default AutoComplete