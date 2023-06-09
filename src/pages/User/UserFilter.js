import CustomAutoComplete from 'components/CustomAutoComplete';
import SimpleModal from 'components/SimpleModal';
import { Formik } from 'formik';
import { forwardRef } from 'react';
import APIManager from 'utils/APImanager';

const apiManager = new APIManager();

const UserFilter = forwardRef((props, filterRef) => {
  const { setQuery } = props;
  
  let initialValues = {
    filterObj: ''
  };

  const onClear = () => {
    filterRef.current.handleClose();
    setQuery(null);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values) => {
        filterRef.current.handleClose();
        setQuery({ role: values?.filterObj?.role || '' });
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
        setFieldValue
      }) => (
        <SimpleModal
          showClearButton={values.filterObj ? true : false}
          resetOnClear={true}
          title={'Filter'}
          onClear={onClear}
          submitForm={submitForm}
          resetForm={resetForm}
          ref={filterRef}
          errors={errors}
          handleSubmit={handleSubmit}
        >
          <CustomAutoComplete
            placeholder="Access Level"
            disableClear={true}
            customOptions={[
              { name: 'Admin', role: 2 },
              { name: 'User', role: 5 }
            ]}
            showCustomOptions={true}
            valueToShowInField={'name'}
            optionRow={['name']}
            fieldName="filterObj"
            errorName={'Access Level'}
          />
        </SimpleModal>
      )}
    </Formik>
  );
});

export default UserFilter;
