import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik } from "formik";
import { Fragment, forwardRef, useEffect, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import { useTheme } from "@mui/material/styles";
import AutoComplete from "components/AutoComplete/AutoComplete";
import { Layout } from "components/Layout/Layout";
import { InputAdornment } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { NumberWithCountryCode } from "components";

const apiManager = new APIManager();

const UserAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    const disabled = editData ? true : false;

    let initialValues = {
      fullName: editData.fullName || "",
      email: editData.email || "",
      // phoneDetail: {
      //   dialCode: editData.countryCode,
      //   phoneNumber: editData.phoneNumber,
      //   countryCode: editData.isoCountry
      // },
    };

    if (editData) {
      initialValues._id = editData._id;
      console.log("edit Data", editData);
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { fullName, email } = values;
          const { dialCode, phoneNumber } = values.phoneDetail;
          const trimmedValues = trimValues({
            fullName,
            email,
            countryCode: dialCode,
            phoneNumber,
          });
          const res = editData
            ? await apiManager.patch(`user/update/${values._id}`, trimmedValues)
            : await apiManager.post(`auth/admin-register`, trimmedValues);
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
        }) => {
          console.log("values ", values);
          return (
            <SimpleModal
              title={editData ? "Edit" : "Add Admin"}
              submitForm={submitForm}
              resetForm={resetForm}
              ref={modalRef}
              errors={errors}
              handleSubmit={handleSubmit}
            >
              <Layout
                components={[
                  <ReusableValidation
                    fieldName="fullName"
                    label={"Name"}
                    required={true}
                  />,
                  <ReusableValidation
                    fieldName="email"
                    label={"Email"}
                    required={true}
                    control={"isEmail"}
                  />,
                  <NumberWithCountryCode
                    disabled={disabled}
                    fieldName="phoneDetail"
                    sx={{ mt: 1, mb: 0.5 }}
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

export default UserAddEdit;
