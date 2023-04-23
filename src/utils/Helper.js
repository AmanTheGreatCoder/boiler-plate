import { onlyNumber } from "./Regex";
export const simplifyString = (value) => {
  // remove parentheses, commas, hyphens, and spaces from a string
  const cleanedStr = value.replace(/[\s()-]+/g, '');
  return cleanedStr;
}

export const removeFirstSubstring = (str, substring) => {
  // removeFirstSubstring("+91 91523-23234","91") ==> 91523-23234
  const index = str.indexOf(substring);
  if (index !== -1) {
    return str.slice(index + substring.length).trim();
  }
  return str;
}

export const maskPhoneNumber = (phoneNumber) => {
  if(!phoneNumber){
    return ''
  }
  const visibleDigits = 4; // number of digits to show (2 at the beginning and 2 at the end)
  const maskedDigits = phoneNumber.length - visibleDigits;
  const maskedPhoneNumber = phoneNumber.substr(0, 2) + '*'.repeat(maskedDigits) + phoneNumber.substr(-2);
  return maskedPhoneNumber;
}

export const isNumber = (value) => {
  return onlyNumber.test(value)
}