import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik } from "formik";
import React, { forwardRef, useEffect, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import * as Yup from "yup";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import AutoComplete from "components/AutoComplete/AutoComplete";
import { Layout } from "components/Layout/Layout";

const apiManager = new APIManager();

const CityAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    let initialValues = {
      cityName: editData.cityName || "",
      SelectValue: editData.countryId || "",
      isActive: true,
    };
    if (editData) {
      initialValues._id = editData._id;
      console.log("edit data", editData);
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { _id: countryId } = values.SelectValue;
          const { cityName, isActive } = values;
          const trimmedValues = trimValues({ countryId, cityName, isActive });

          const res = editData
            ? await apiManager.patch(
                `city/update/${initialValues._id}`,
                trimmedValues
              )
            : await apiManager.post("city/create", trimmedValues);
          if (!res.error) {
            modalRef.current.handleClose();
            getList(rowsPerPage);
            setSearch("");
            clearSearchField();
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          resetForm,
          submitForm,
        }) => {
          console.log("values", values);
          return (
            <SimpleModal
              title={editData ? "Edit" : "Add"}
              submitForm={submitForm}
              resetForm={resetForm}
              ref={modalRef}
              errors={errors}
              handleSubmit={handleSubmit}
            >
              <Layout
                components={[
                  <ReusableValidation
                    varName="cityName"
                    fieldName={"City Name"}
                    required={true}
                    maxLength={100}
                  />,
                  <AutoComplete
                    placeholder="Choose a country"
                    url="country/list"
                    fieldName="SelectValue"
                    errorName={"Country"}
                    optionRow={[
                      "countryName",
                      "isoCountry",
                      { countryCode: true, field: "countryCode" },
                    ]}
                    showFlag={true}
                    valueToShowInField={["countryName", "isoCountry"]}
                    required={true}
                    inputProps={{
                      style: { textTransform: "capitalize" },
                    }}
                  />,
                ]}
              />
            </SimpleModal>
          );
        }}
      </Formik>
    );
  }
);

export default CityAddEdit;
