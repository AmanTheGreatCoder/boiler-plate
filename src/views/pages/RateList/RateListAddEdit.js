import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik, FieldArray } from "formik";
import React, { Fragment, forwardRef, useEffect, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import * as Yup from "yup";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import AutoComplete from "components/AutoComplete/AutoComplete";
import ReusableSwitch from "components/ReusableSwitch.js/ReusableSwitch";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { Layout } from "components/Layout/Layout";

const apiManager = new APIManager();

const RateListAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    const params = useParams();

    let initialValues = {
      dialCode: editData.dialCode || "",
      Destination: editData.destination || "",
      type: "provider",
      parentId: editData.parentId || "",
      rate: editData.rate || "",
      initialPulse: editData.initialPulse || "",
      subsequentPulse: editData.subsequentPulse || "",
      connectionCharge: editData.connectionCharge || "",
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          values.parentId = params.parentId;
          const trimmedValues = trimValues(values);
          trimmedValues.initialPulse = parseInt(trimmedValues.initialPulse);
          trimmedValues.rate = parseInt(trimmedValues.rate);
          trimmedValues.dialCode = parseInt(trimmedValues.dialCode);
          trimmedValues.subsequentPulse = parseInt(
            trimmedValues.subsequentPulse
          );
          trimmedValues.connectionCharge = parseInt(
            trimmedValues.connectionCharge
          );
          trimmedValues.defaultRate = parseInt(trimmedValues.defaultRate);
          const res = editData
            ? await apiManager.patch(
                `rate-list/update/${initialValues._id}`,
                trimmedValues
              )
            : await apiManager.post("rate-list/create", trimmedValues);
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
          setFieldValue,
        }) => (
          <SimpleModal
            title={MODULE_NAME}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={modalRef}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <Layout
              itemsInRow={2}
              components={[
                <ReusableValidation
                  varName="dialCode"
                  control="isNumber"
                  fieldName="Dial Code"
                  required={true}
                />,
                <ReusableValidation
                  varName="Destination"
                  fieldName="Destination"
                  required={true}
                />,
                <ReusableValidation
                  varName="rate"
                  control="isNumber"
                  fieldName="Rate"
                  min={0}
                  max={5000}
                  required={true}
                />,
                <ReusableValidation
                  varName="initialPulse"
                  control="isNumber"
                  min={0}
                  max={30}
                  fieldName="Initial Pulse"
                  required={true}
                />,
                <ReusableValidation
                  varName="subsequentPulse"
                  control="isNumber"
                  min={0}
                  max={30}
                  fieldName="Subsequent Pulse"
                  required={true}
                />,
                <ReusableValidation
                  varName="connectionCharge"
                  control="isNumber"
                  min={0}
                  max={5000}
                  fieldName="Connection Charge"
                  required={true}
                />,
              ]}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default RateListAddEdit;
