import { onlyNumber } from './Regex';
import Flag from 'assets/images/flag.svg';
import { v4 } from 'uuid';

export const uuid = () => v4();

export const isObjectEmpty = (objectName) => {
  return objectName && Object.keys(objectName).length === 0 && objectName.constructor === Object;
};

export const simplifyString = (value) => {
  const cleanedStr = value.replace(/[\s()-]+/g, '');
  return cleanedStr;
};

export const removePlusStr = (value) => {
  return value.replace(/\+/g, '');
};

export const capitalize = (value) => {
  return value[0].toUpperCase() + value.substring(1);
};

export const removeFirstSubstring = (str, substring) => {
  // removeFirstSubstring("+91 91523-23234","91") ==> 91523-23234
  const index = str.indexOf(substring);
  if (index !== -1) {
    return str.slice(index + substring.length).trim();
  }
  return str;
};

export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return '';
  }
  const visibleDigits = 4; // number of digits to show (2 at the beginning and 2 at the end)
  const maskedDigits = phoneNumber.length - visibleDigits;
  const maskedPhoneNumber =
    phoneNumber.substr(0, 2) + '*'.repeat(maskedDigits) + phoneNumber.substr(-2);
  return maskedPhoneNumber;
};

export const isNumber = (value) => {
  return onlyNumber.test(value);
};

export const trimValues = (values) =>
  Object.keys(values).reduce((acc, key) => {
    acc[key] = typeof values[key] === 'string' ? values[key].trim() : values[key];
    return acc;
  }, {});

export const confirmMessage = (value) => {
  return `Are you sure you want to ${value}?`;
};

export const addDefaultSrc = (ev) => {
  ev.target.src = Flag;
};

export const getValueFromObject = (str, obj) => {
  const keys = str.split('.');
  let value = obj;
  for (const key of keys) {
    value = value[key];
    if (!value) {
      break;
    }
  }
  return value;
};
