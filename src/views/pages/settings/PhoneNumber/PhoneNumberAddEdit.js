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

const PhoneNumberAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    let initialValues = {
      phoneNumber: editData.phoneNumber || "",
      countryId: editData.countryId || "",
      cityId: editData.cityId || "",
      providerId: editData.providerId || "",
      isActive: true,
      capabilities: {
        SMS: {
          isCapable: false,
        },
        Voice: {
          isCapable: true,
        },
      },
    };
    if (editData) {
      initialValues._id = editData._id;
      initialValues.countryId.countryCode = editData.countryCode;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { _id: countryId, countryCode } = values.countryId;
          const { _id: cityId } = values.cityId;
          const { _id: providerId } = values.providerId;
          const { phoneNumber, isActive, capabilities } = values;
          const trimmedValues = trimValues({
            countryId,
            cityId,
            phoneNumber,
            providerId,
            countryCode,
            isActive,
            capabilities,
          });
          const res = editData
            ? await apiManager.patch(
                `phone/update/${initialValues._id}`,
                trimmedValues
              )
            : await apiManager.post("phone/create", trimmedValues);

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
                  varName="phoneNumber"
                  control="isNumber"
                  fieldName={"Phone Number"}
                  required={true}
                />,
                <AutoComplete
                  placeholder="Choose a country"
                  url="country/list"
                  fieldName="countryId"
                  errorName={"Country"}
                  // onChange={}
                  required={true}
                  optionRow={[
                    "countryName",
                    "isoCountry",
                    { countryCode: true, field: "countryCode" },
                  ]}
                  showFlag={true}
                  valueToShowInField="countryName"
                  onChange={(value) => {
                    setFieldValue("cityId", "");
                  }}
                />,
                <AutoComplete
                  placeholder="Choose a provider"
                  url="provider/list"
                  fieldName="providerId"
                  errorName={"Provider"}
                  // onChange={}
                  required={true}
                  optionRow={["name"]}
                  valueToShowInField="name"
                />,
                values.countryId && (
                  <AutoComplete
                    key={values.countryId._id}
                    placeholder="Choose a city"
                    url="city/list"
                    required={true}
                    fieldName="cityId"
                    query={{ countryId: values?.countryId?._id }}
                    errorName={"City"}
                    optionRow={["cityName"]}
                    valueToShowInField="cityName"
                  />
                ),
              ]}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default PhoneNumberAddEdit;
