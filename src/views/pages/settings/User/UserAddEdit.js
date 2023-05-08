import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik } from "formik";
import { forwardRef, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import { useTheme } from "@mui/material/styles";
import AutoComplete from "components/AutoComplete/AutoComplete";

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
            countryCode: editData.countryCode || "",
            email: editData.email || ""
        };

        if (editData) {
            initialValues._id = editData._id;
        }

        return (
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={async (values) => {
                     
                    const trimmedValues = trimValues({ ...values });
                     
                    trimmedValues.countryCode = trimmedValues.countryCode.countryCode;
                    const res = await apiManager.post(`auth/register`, trimmedValues);
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
                        <ReusableValidation
                            varName="fullName"
                            fieldName={"Name"}
                            required={true}
                        />
                        <ReusableValidation
                            varName="phoneNumber"
                            control="isNumber"
                            fieldName={"Phone Number"}
                            required={true}
                        />
                        <AutoComplete
                            placeholder="Choose a country"
                            url="country/list"
                            fieldName="countryCode"
                            errorName={"Country"}
                            required={true}
                            optionRow={["countryName", "isoCountry", { countryCode: true, field: "countryCode" }]}
                            showFlag={true}
                            valueToShowInField="countryName"
                        />
                        <ReusableValidation
                            varName="email"
                            fieldName={"Email"}
                            required={true}
                            control={"isEmail"}
                        />
                    </SimpleModal>
                )}
            </Formik>
        );
    }
);

export default UserAddEdit;