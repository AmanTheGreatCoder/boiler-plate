import { Autocomplete, FormControl, TextField } from '@mui/material';
import { useField } from 'formik';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import APIManager from 'utils/APImanager';
import { addDefaultSrc, capitalize, isObjectEmpty } from 'utils/Helper';
import './style.css';
import { Logger } from 'logger';
import { apiLimit, pageLimit } from 'utils/constant';

const apiManager = new APIManager();

function CustomAutoComplete(props) {
  const {
    placeholder,
    url,
    ckey,
    customOptions,
    disableClear = false,
    optionRow,
    valueToShowInField,
    inputProps,
    fieldName,
    initialValues,
    setInitialValues,
    showInitialValues,
    setShowInitialValues,
    errorName,
    disabled = false,
    showFlag,
    query,
    onChange,
    multiple,
    freeSolo,
    required
  } = props;
  const logger = new Logger(`Custom Auto Complete ${ckey}`);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: (newValue) => {
      let error = null;

      if (
        required &&
        (!newValue || (typeof newValue === 'object' && Object.keys(newValue).length === 0))
      ) {
        error = `${errorName} is required`;
      }
      return error;
    }
  });

  const { name, onBlur, value = '' } = field;
  const { error, touched } = meta;
  const { setValue, setTouched, setError } = helpers;
  const hasError = Boolean(error) && touched;

  useEffect(() => {
    logger.log('current page', page);
    if (data.length !== 0) {
      loadMoreResults();
    }
  }, [page]);

  const loadMoreResults = () => {
    let newOp = [];
    for (let i = 0; i < page; i++) {
      let op = [];
      for (let j = 0; j < pageLimit; j++) {
        op.push(data[j]);
      }
      newOp.push(...op);
    }
    setOptions(newOp);
  };

  const fetchData = async () => {
    try {
      let queryString = `${url}?limit=${apiLimit}&pageNo=${page}&search=${inputValue}`;
      logger.log('query fetch data', query);
      if (query && typeof query === 'object') {
        Object.keys(query).map((e) => {
          if (query[e]) {
            queryString += `&${e}=${query[e]}`;
          }
          return e;
        });
      }
      const res = await apiManager.get(queryString);

      if (!res?.error && res?.data?.data.length !== 0) {
        let temp = res?.data?.data;
        if (res.data.count) {
          setCount(res.data.count);
        }
        if (showFlag) {
          setImageUrl(res.data.imageUrl);
        }

        if (url.includes('country')) {
          temp = res.data.data.map((e) => {
            return {
              ...e,
              countryName: capitalize(e.countryName)
            };
          });
        }
        setData(temp);
        let newOp = [];
        for (let i = 0; i < pageLimit; i++) {
          newOp.push(temp[i]);
        }
        setOptions(newOp);
        setPage(1);
      }
    } catch (err) {
      logger.log('Error', err);
    }
  };

  // const verify = useCallback(
  //   debounce(async () => {
  //     fetchData();
  //   }, 1000),
  //   []
  // );

  // useEffect(() => {
  //   logger.log('inputValue ', inputValue);
  //   if (url) {
  //     verify(inputValue);
  //   }
  // }, [inputValue]);

  useEffect(() => {
    fetchData();
  }, [query]);

  useLayoutEffect(() => {
    if (
      (data &&
        initialValues &&
        initialValues !== ' ' &&
        typeof setInitialValues === 'function' &&
        showInitialValues) === true
    ) {
      let bool = false;
      let op;
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === initialValues) {
          bool = true;
          op = data[i];
          break;
        }
      }

      if (bool) {
        setInitialValues((prev) => {
          return { ...prev, [fieldName]: op };
        });
        setShowInitialValues(bool);
      }
    }
  }, [data]);

  const getValue = () => {
    const temp =
      initialValues && typeof initialValues === 'object' && showInitialValues
        ? initialValues
        : value
        ? value
        : null;
    return temp;
  };

  const getOptionRow = (option) => {
    const temp = optionRow?.map((e) => {
      if (typeof e === 'string') {
        return <span className="space-to-right">{`${option[e]}`}</span>;
      } else if (typeof e === 'object' && e.field === 'countryCode') {
        return <span className="space-to-right">{`+${option[e.field]}`}</span>;
      }
    });
    if (showFlag) {
      temp.unshift(
        <img
          className="space-to-right"
          height={16}
          width={16}
          src={imageUrl + option.flag}
          onError={addDefaultSrc}
        />
      );
    }

    return temp;
  };

  const getOptionLabel = (option) => {
    if (typeof valueToShowInField === 'object' && typeof option === 'object') {
      let v1 = '';
      valueToShowInField.map((e) => {
        if (e === 'isoCountry') {
          v1 += `(${option[e]})`;
        } else if (e === 'countryName') {
          v1 += option[e];
        }
        v1 += ' ';
      });
      return v1;
    }

    return valueToShowInField ? option[valueToShowInField] : option;
  };

  return (
    <FormControl fullWidth>
      <Autocomplete
        loading={true}
        multiple={multiple}
        disableClearable={disableClear}
        fullWidth
        freeSolo={freeSolo}
        id="country-select-demo"
        options={customOptions ? customOptions : options}
        name={name}
        disabled={disabled}
        autoHighlight
        getOptionLabel={getOptionLabel}
        renderOption={(props, option) =>
          optionRow && (
            <li {...props} key={option._id || option.id} style={{ fontSize: 15 }}>
              {getOptionRow(option)}
            </li>
          )
        }
        value={getValue()}
        onBlur={onBlur}
        onInputChange={(e) => {
          if (e.target.value) {
            setInputValue(e?.target?.value);
          }
        }}
        onChange={(event, value) => {
          typeof setShowInitialValues === 'function' && setShowInitialValues(false);
          setValue(value);
          onChange && onChange(value);
        }}
        ListboxProps={{
          onScroll: (event) => {
            const listboxNode = event.currentTarget;
            if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
              if (page < Math.ceil(count / pageLimit)) {
                setPage((prev) => prev + 1);
              }
            }
          }
        }}
        renderInput={(params) => {
          return (
            <TextField
              fullWidth
              autoComplete="off"
              disabled={disabled}
              error={hasError}
              onBlur={onBlur}
              helperText={hasError && error}
              {...params}
              label={placeholder}
              sx={{
                mt: 1,
                mb: 1
              }}
              inputProps={{
                ...params.inputProps,
                ...inputProps,
                autoComplete: 'off'
              }}
            />
          );
        }}
      />
    </FormControl>
  );
}
export default CustomAutoComplete;
