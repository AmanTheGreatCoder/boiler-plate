import { Autocomplete } from '@mui/material'
import { Grid, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import APIManager from 'utils/APImanager';
import debounce from 'lodash.debounce'
import { useField } from 'formik';
import './AutoComplete.css'
import { addDefaultSrc } from 'utils/Helper'

const apiManager = new APIManager();
function AutoComplete({ placeholder, url, optionRow, valueToShowInField, fieldName, errorName, showFlag, query, onChange, multiple, freeSolo, required }) {
  const [options, setOptions] = useState([]);
  const [formValue, setFormValue] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const fetchData = async (value) => {
    let queryString = `${url}?limit=20&pageNo=1&search=${value ? value : ''}`
    if (query) {
      Object.keys(query).map(e => {
        queryString += `&${e}=${query[e]}`
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
      console.log('is this infinite')
      fetchData(value);
    }, 1000),
    []
  );

  useEffect(() => {
    verify(formValue);
  }, [formValue])

  useEffect(async () => {
    fetchData(formValue);
  }, [])

  const getOptionRow = (option) => {
    console.log('eamanmc', option)
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
    console.log({ temp })
    return temp
  }

  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: (newValue) => {
      let error = null;
      console.log('newValue', newValue)
      if (required && (!newValue || (typeof newValue === 'object' && Object.keys(newValue).length === 0))) {
        console.log("going in", required)
        error = `${errorName} is required`
      }
      return error
    }
  });

  const { name, onBlur, value = "" } = field;
  const { error, touched, } = meta;
  const { setValue, setTouched, setError } = helpers;
  const hasError = Boolean(error) && touched;

  useEffect(() => {
    console.log({ options })
  }, [options])



  return (
    <Autocomplete
      multiple={multiple}
      freeSolo={freeSolo}
      id="country-select-demo"
      options={options}
      name={name}
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
        console.log(value)
        onChange && onChange(value)
      }}
      renderInput={(params) => {
        console.log("Params ", params)
        return <TextField
          autoComplete='off'
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