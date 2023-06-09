import ChooseCountry from 'components/ChooseCountry';
import { Layout } from 'components/Layout/Layout';
import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import SimpleModal from 'components/SimpleModal';
import { Formik } from 'formik';
import { forwardRef } from 'react';
import APIManager from 'utils/APImanager';
import { trimValues } from 'utils/Helper';

const apiManager = new APIManager();

const CityAddEdit = forwardRef(
  ({ getList, rowsPerPage, editData, setSearch, clearSearchField }, modalRef) => {
    let initialValues = {
      cityName: editData.cityName || '',
      countryId: editData.countryId || '',
      isActive: true
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { _id: countryId } = values.countryId;
          const { cityName, isActive } = values;
          const trimmedValues = trimValues({ countryId, cityName, isActive });

          const res = editData
            ? await apiManager.patch(`city/update/${initialValues._id}`, trimmedValues)
            : await apiManager.post('city/create', trimmedValues);
          if (!res.error) {
            modalRef.current.handleClose();
            getList(rowsPerPage);
            setSearch('');
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
          submitForm
        }) => {
          return (
            <SimpleModal
              title={editData ? 'Edit' : 'Add'}
              submitForm={submitForm}
              resetForm={resetForm}
              ref={modalRef}
              errors={errors}
              handleSubmit={handleSubmit}
            >
              <ReusableValidation
                fieldName="cityName"
                label={'City Name'}
                required={true}
                maxLength={100}
                inputProps={{
                  style: { textTransform: 'capitalize' }
                }}
              />
              <ChooseCountry />
            </SimpleModal>
          );
        }}
      </Formik>
    );
  }
);

export default CityAddEdit;
