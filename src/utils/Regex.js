const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const countryCodeRegex = /^(\+?\d{1,3}|\d{1,4})$/;
const isoCountryRegex = /^[A-Z]{2}$/;
const onlyNumber = /^[0-9\b]+$/;
export {
  phoneRegExp,
  countryCodeRegex,
  onlyNumber,
  isoCountryRegex
}