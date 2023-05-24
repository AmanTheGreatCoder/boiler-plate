import { Autocomplete, FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import APIManager from "utils/APImanager";
import debounce from "lodash.debounce";
import { useField } from "formik";
import "./style.css";
import { addDefaultSrc, capitalize } from "utils/Helper";

const apiManager = new APIManager();

function CustomAutoComplete({
  placeholder,
  url,
  customOptions,
  showCustomOptions = false,
  disableClear = false,
  optionRow,
  valueToShowInField,
  inputProps,
  InputProps,
  fieldName,
  errorName,
  disabled = false,
  showFlag,
  query,
  onChange,
  multiple,
  freeSolo,
  required,
}) {
  const [options, setOptions] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(-1);

  const loadMoreResults = () => {
    fetchData(formValue, page + 1);
    setPage((prev) => prev + 1);
  };

  const fetchData = async (value, page = 1) => {
    let queryString = `${url}?limit=20&pageNo=${page}&search=${
      value ? value : ""
    }`;
    if (query) {
      Object.keys(query).map((e) => {
        if (query[e]) {
          queryString += `&${e}=${query[e]}`;
        }
        return e;
      });
    }
    const res = await apiManager.get(queryString);

    if (!res.error) {
      if (count === -1) {
        setCount(res.data.count);
      }
      if (showFlag) {
        setImageUrl(res.data.imageUrl);
      }

      if (url.includes("country")) {
        const temp = res.data.data.map((e) => {
          return {
            ...e,
            countryName: capitalize(e.countryName),
          };
        });
        setOptions([...options, ...temp]);
        return;
      }
      setOptions([...options, ...res.data.data]);
    }
  };

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
  }, [formValue]);

  const fetching = async () => {
    if (url) {
      fetchData(formValue);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const getOptionRow = (option) => {
    const temp = optionRow?.map((e) => {
      if (typeof e === "string") {
        return <span className="space-to-right">{`${option[e]}`}</span>;
      } else if (typeof e === "object" && e.field === "countryCode") {
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

  const [field, meta, helpers] = useField({
    name: fieldName,
    validate: (newValue) => {
      let error = null;

      if (
        required &&
        (!newValue ||
          (typeof newValue === "object" && Object.keys(newValue).length === 0))
      ) {
        error = `${errorName} is required`;
      }
      return error;
    },
  });

  const { name, onBlur, value = "" } = field;
  const { error, touched } = meta;
  const { setValue, setTouched, setError } = helpers;
  const hasError = Boolean(error) && touched;

  const getOptionLabel = (option) => {
    if (typeof valueToShowInField === "object") {
      let v1 = "";
      valueToShowInField.map((e) => {
        if (e === "isoCountry") {
          v1 += `(${option[e]})`;
        } else if (e === "countryName") {
          v1 += option[e];
        }
        v1 += " ";
      });
      return v1;
    }
    return valueToShowInField ? option[valueToShowInField] : option;
  };

  useEffect(() => {
    // console.log("value in auto complete", value);
  }, [value]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        multiple={multiple}
        disableClearable={disableClear}
        fullWidth
        freeSolo={freeSolo}
        id="country-select-demo"
        options={!showCustomOptions ? options : customOptions}
        name={name}
        disabled={disabled}
        autoHighlight
        getOptionLabel={getOptionLabel}
        // isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) =>
          optionRow && (
            <li
              {...props}
              key={option._id || option.id}
              style={{ fontSize: 15 }}
            >
              {getOptionRow(option)}
            </li>
          )
        }
        value={value ? value : null}
        // onBlur={() => {
        //   setFormValue('')
        //   onBlur()
        // }}
        onBlur={onBlur}
        onInputChange={(e) => setFormValue(e?.target?.value)}
        onChange={(event, value) => {
          console.log("change called in auto complete");
          setValue(value);
          onChange && onChange(value);
        }}
        ListboxProps={{
          onScroll: (event) => {
            const listboxNode = event.currentTarget;
            if (
              listboxNode.scrollTop + listboxNode.clientHeight ===
              listboxNode.scrollHeight
            ) {
              if (page < Math.ceil(count / 20)) {
                loadMoreResults();
              }
            }
          },
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
                mb: 1,
              }}
              inputProps={{
                ...params.inputProps,
                ...inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
            />
          );
        }}
      />
    </FormControl>
  );
}
export default CustomAutoComplete;
