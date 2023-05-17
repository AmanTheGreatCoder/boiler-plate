import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NumberWithCountryCode from "components/NumberWithCountryCode/NumberWithCountryCode";
import APIManager from "utils/APImanager";

const apiManager = new APIManager();

const CustomNumberWithCountry = (props) => {
  const fetchList = async () => {
    const res = await apiManager.get(`country/list?limit=400&pageNo=0`);
    console.log("res in fetch list", res);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return <NumberWithCountryCode  />;
};

CustomNumberWithCountry.propTypes = {};

export default CustomNumberWithCountry;
