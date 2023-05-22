import { Formik } from "formik";
import { forwardRef, useEffect } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { MODULE_NAME } from "./Values";
import CustomAutoComplete from "components/CustomAutoComplete";
import ChooseCountry from "components/ChooseCountry";

const apiManager = new APIManager();

const CityFilter = forwardRef(
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
      countryId: "",
    };

    useEffect(() => {
       
    }, [initialValues]);

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
           
          initialValues.countryId = values.countryId;
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
            showClearButton={values.countryId ? true : false}
            resetOnClear={true}
            title={"Filter"}
            onClear={onClear}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={modalRef}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <ChooseCountry disableClear={true} />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default CityFilter;
