import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import { Formik } from 'formik';
import { forwardRef, useEffect } from 'react';
import APIManager from 'utils/APImanager';
import SimpleModal from 'components/SimpleModal';
import { trimValues } from 'utils/Helper';
import { Layout } from 'components/Layout/Layout';
import NumberWithCountryCode from 'components/NumberWithCountryCode';
import { ErrorBoundary } from 'pages/ErrorManagement/ErrorBoundary';

const apiManager = new APIManager();

const UserAddEdit = forwardRef((props, ref) => {
  const { getList, editData, setSearch, setProfile, clearSearchField } = props;
  const disabled = editData ? true : false;

  let initialValues = {
    fullName: editData?.fullName || '',
    email: editData?.email || '',
    phoneNumber: editData?.fullNumber || ''
  };

  if (editData) {
    initialValues._id = editData?._id;
  }

  return (
    <ErrorBoundary>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { fullName, email } = values;
          let newValues = { fullName, email };
          if (!editData) {
            const { dialCode, phoneNumber } = values.phoneDetail;
            newValues = {
              ...newValues,
              countryCode: dialCode,
              phoneNumber
            };
          }

          const trimmedValues = trimValues(newValues);
          const res = editData
            ? await apiManager.patch(`user/update/${values._id}`, trimmedValues)
            : await apiManager.post(`auth/admin-register`, trimmedValues);
          if (!res.error) {
            ref.current.handleClose();
            getList && getList();
            setSearch && setSearch('');
            clearSearchField && clearSearchField();
            setProfile && setProfile();
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
          submitForm
        }) => {
          return (
            <SimpleModal
              title={editData ? 'Edit' : 'Add Admin'}
              submitForm={submitForm}
              resetForm={resetForm}
              ref={ref}
              errors={errors}
              handleSubmit={handleSubmit}
            >
              <Layout
                components={[
                  <ReusableValidation fieldName="fullName" label={'Name'} required={true} />,
                  <ReusableValidation
                    fieldName="email"
                    label={'Email'}
                    required={true}
                    control={'isEmail'}
                  />,
                  <NumberWithCountryCode
                    disabled={disabled}
                    fieldName="phoneDetail"
                    propValue={editData ? values?.phoneNumber : null}
                    sx={{ mt: 1, mb: 0.5 }}
                  />
                ]}
              />
            </SimpleModal>
          );
        }}
      </Formik>
    </ErrorBoundary>
  );
});

export default UserAddEdit;
