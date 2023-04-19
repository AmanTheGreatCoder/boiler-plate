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