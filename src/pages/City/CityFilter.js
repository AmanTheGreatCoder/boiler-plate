import ChooseCountry from 'components/ChooseCountry';
import SimpleModal from 'components/SimpleModal';
import { Formik } from 'formik';
import { forwardRef, useEffect, useState } from 'react';

const CityFilter = forwardRef((props, ref) => {
  const { setQuery, query } = props;

  let initialValues = {
    countryId: ''
  };
  const onClear = () => {
    ref.current.handleClose();
    setQuery(null);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values) => {
        const { countryId } = values;
        ref.current.handleClose();
        setQuery({
          countryId: countryId?._id || ''
        });
      }}
    >
      {({ errors, handleSubmit, values, resetForm, submitForm, setFieldValue }) => (
        <SimpleModal
          showClearButton={values.countryId ? true : false}
          resetOnClear={true}
          title={'Filter'}
          // onOpen={onOpen}
          onClear={onClear}
          submitForm={submitForm}
          resetForm={resetForm}
          ref={ref}
          errors={errors}
          handleSubmit={handleSubmit}
        >
          <ChooseCountry
            required={false}
            initialValues={initialValues.countryId}
            disableClear={true}
          />
        </SimpleModal>
      )}
    </Formik>
  );
});

export default CityFilter;
