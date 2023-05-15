import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik } from "formik";
import React, { forwardRef, useEffect, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Switch,
} from "@mui/material";
import * as Yup from "yup";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import { Layout } from "components/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";

const apiManager = new APIManager();

const CountryAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    // const [initialValues, setInitialValues] = useState({
    //   countryName: "",
    //   countryCode: "",
    //   isoCountry: "",
    //   flag: "",
    //   isActive: true,
    //   capabilities: {
    //     SMS: {
    //       isCapable: false
    //     },
    //     Voice: {
    //       isCapable: true
    //     }
    //   }
    // })
    let initialValues = {
      countryName: editData.countryName || "",
      countryCode: editData.countryCode || "",
      isoCountry: editData.isoCountry || "",
      flag: editData.flag || "",
      isActive: editData.isActive || true,
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
    }
    // useEffect(() => {
    //
    //   if(editData){
    //
    //     setInitialValues({...editData})
    //   }
    //
    // }, [editData])

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const trimmedValues = trimValues(values);
          const res = editData
            ? await apiManager.patch(
                `country/update/${initialValues._id}`,
                trimmedValues
              )
            : await apiManager.post("country/create", trimmedValues);
          if (!res.error) {
            modalRef.current.handleClose();
            getList();
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
                  varName="countryName"
                  fieldName={"Country Name"}
                  required={true}
                  // isSubmitting={isSubmitting}
                />,
                <ReusableValidation
                  varName="countryCode"
                  fieldName={"Country Code"}
                  required={true}
                  control="countryCode"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <AttachmentRoundedIcon fontSize="small" /> */}
                        <AddIcon fontSize="1.2rem" />
                      </InputAdornment>
                    ),
                  }}
                  // isSubmitting={isSubmitting}
                />,
                <ReusableValidation
                  varName="isoCountry"
                  fieldName={"ISO Country"}
                  required={true}
                  control="isoCountry"
                  // isSubmitting={isSubmitting}
                />,
              ]}
            />
            {/* <ReusableValidation
            varName="flag"
            fieldName={"Flag"}
            required={true}
          /> */}
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default CountryAddEdit;
