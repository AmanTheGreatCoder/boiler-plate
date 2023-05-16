import { Formik } from "formik";
import { forwardRef, useEffect } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { MODULE_NAME } from "./Values";
import AutoComplete from "components/AutoComplete/AutoComplete";

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
      console.log("initial Values", initialValues);
    }, [initialValues]);

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log("values", values);
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
            size={{ xs: "80%", sm: "50%", md: "40%", lg: "35%", xl: "30%" }}
            showClearButton={values.countryId ? true : false}
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
              placeholder="Choose a country"
              disableClear={true}
              url="country/list"
              fieldName="countryId"
              errorName={"Country"}
              optionRow={[
                "countryName",
                "isoCountry",
                { countryCode: true, field: "countryCode" },
              ]}
              showFlag={true}
              valueToShowInField="countryName"
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default CityFilter;
