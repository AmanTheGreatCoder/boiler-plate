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

const apiManager = new APIManager();

const UserFilter = forwardRef(
  (
    {
      getList,
      rowsPerPage,
      editData,
      setSearch,
      clearSearchField,
      onFilterChange,
      onClear,
    },
    modalRef
  ) => {
    let initialValues = {
      filterObj: "",
    };
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          onFilterChange(values);
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
          setFieldValue,
        }) => (
          <SimpleModal
            size={{ xs: "80%", sm: "50%", md: "40%", lg: "35%", xl: "30%" }}
            showClearButton={values.filterObj ? true : false}
            resetOnClear={true}
            title={MODULE_NAME}
            onClear={onClear}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={modalRef}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <AutoComplete
              placeholder="Access Level"
              disableClear={true}
              customOptions={[
                { name: "Admin", role: 2 },
                { name: "User", role: 5 },
              ]}
              showCustomOptions={true}
              valueToShowInField={"name"}
              optionRow={["name"]}
              fieldName="filterObj"
              errorName={"Access Level"}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default UserFilter;