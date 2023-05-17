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

const apiManager = new APIManager();

const UserAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    const disabled = editData ? true : false;

    let initialValues = {
      fullName: editData.fullName || "",
      phoneNumber: editData.phoneNumber || "",
      countryCode: { countryCode: editData.countryCode || "" },
      email: editData.email || "",
    };

    useEffect(() => {
      console.log("initalvalues", initialValues, editData);
    }, [editData]);

    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log({ values });
          const trimmedValues = trimValues({ ...values });
          console.log("trimmed values", trimmedValues);
          trimmedValues.countryCode = trimmedValues.countryCode.countryCode;
          const res = editData
            ? await apiManager.patch(`user/update/${values._id}`, trimmedValues)
            : await apiManager.post(`auth/admin-register`, trimmedValues);
          console.log("res in user add edit", res);
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
                  varName="fullName"
                  fieldName={"Name"}
                  required={true}
                />,
                <ReusableValidation
                  varName="email"
                  fieldName={"Email"}
                  required={true}
                  control={"isEmail"}
                />,
                <AutoComplete
                  disabled={disabled}
                  placeholder="Choose a country code"
                  url="country/list"
                  fieldName="countryCode"
                  errorName={"Country"}
                  required={true}
                  optionRow={[
                    "countryName",
                    "isoCountry",
                    { countryCode: true, field: "countryCode" },
                  ]}
                  showFlag={true}
                  valueToShowInField="countryCode"
                />,
                <ReusableValidation
                  disabled={disabled}
                  varName="phoneNumber"
                  control="isNumber"
                  fieldName={"Phone Number"}
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

export default UserAddEdit;
