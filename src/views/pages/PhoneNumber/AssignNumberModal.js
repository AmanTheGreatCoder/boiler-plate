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
import CustomAutoComplete from "components/CustomAutoComplete";

const apiManager = new APIManager();

const AssignNumberModal = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    assignModalRef
  ) => {
    let initialValues = {
      user: "",
      isAssigned: true,
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const trimmedValues = trimValues(values);
           
          trimmedValues.assignedTo = values.user._id;
          const res = await apiManager.put(
            `phone/assign/${values._id}`,
            trimmedValues
          );

          if (!res.error) {
            assignModalRef.current.handleClose();
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
          setFieldValue,
        }) => (
          <SimpleModal
            title={'Assign To'}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={assignModalRef}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <CustomAutoComplete
              placeholder="Choose a user"
              url="user/list"
              fieldName="user"
              errorName={"User"}
              required={true}
              optionRow={["fullName"]}
              valueToShowInField="fullName"
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default AssignNumberModal;
