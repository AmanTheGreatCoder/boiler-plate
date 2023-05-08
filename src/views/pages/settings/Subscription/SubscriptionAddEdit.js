import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik } from "formik";
import { forwardRef, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import { useTheme } from "@mui/material/styles";

const apiManager = new APIManager();

const SubscriptionAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    const theme = useTheme();
    const [tagValue, setTagValue] = useState("");
    const disabled = editData ? true : false;

     
    let initialValues = {
      name: editData.name || "",
      interval: editData.interval || "month",
      amount: editData?.amount || "",
      currency: editData?.currency || "gbp",
      isActive: editData?.isActive || false,
      isDeleted: editData?.isDeleted || false,
      isLimited: editData?.isLimited || false,
      benefits: editData.benefits || [],
      defaultSelected: editData?.defaultSelected || false,
      isPopular: editData?.isPopular || false,
      recurring: editData?.recurring || false,
      totalMinutes: editData.total_minutes || "",
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
           
          trimmedValues.amount = parseInt(trimmedValues.amount);
          trimmedValues.totalMinutes = parseInt(trimmedValues.totalMinutes);
          const res = await editData ? apiManager.patch(`subscription/update/${initialValues._id}`, trimmedValues) : apiManager.post(`subscription/create`, trimmedValues)
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
              varName="name"
              fieldName={"Name"}
              required={true}
            />
            <ReusableValidation
              varName="amount"
              fieldName={"Amount"}
              required={true}
              disabled={disabled}
              control={"isNumber"}
            />
            <ReusableValidation
              varName="totalMinutes"
              fieldName={"Total Minutes"}
              required={true}
              disabled={disabled}
              control={"isNumber"}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default SubscriptionAddEdit;
