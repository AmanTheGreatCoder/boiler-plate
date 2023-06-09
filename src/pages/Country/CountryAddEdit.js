import AddIcon from '@mui/icons-material/Add';
import { InputAdornment } from '@mui/material';
import { Layout } from 'components/Layout/Layout';
import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import SimpleModal from 'components/SimpleModal';
import { Formik } from 'formik';
import { forwardRef } from 'react';
import APIManager from 'utils/APImanager';
import { trimValues } from 'utils/Helper';

const apiManager = new APIManager();

const CountryAddEdit = forwardRef(
  ({ getList, rowsPerPage, editData, setSearch, clearSearchField }, ref) => {
    let initialValues = {
      countryName: editData.countryName || '',
      countryCode: editData.countryCode || '',
      isoCountry: editData.isoCountry || '',
      flag: editData.flag || '',
      isActive: editData.isActive || true,
      capabilities: {
        SMS: {
          isCapable: false
        },
        Voice: {
          isCapable: true
        }
      }
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const trimmedValues = trimValues(values);
          const res = editData
            ? await apiManager.patch(`country/update/${initialValues._id}`, trimmedValues)
            : await apiManager.post('country/create', trimmedValues);
          if (!res.error) {
            ref.current.handleClose();
            getList();
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
        }) => (
          <SimpleModal
            title={editData ? 'Edit' : 'Add'}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={ref}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <ReusableValidation
              fieldName="countryName"
              label={'Country Name'}
              required={true}
              inputProps={{
                style: { textTransform: 'capitalize' }
              }}
            />
            ,
            <ReusableValidation
              fieldName="countryCode"
              label={'Country Code'}
              required={true}
              control="countryCode"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <AttachmentRoundedIcon fontSize="small" /> */}
                    <AddIcon fontSize="1.2rem" />
                  </InputAdornment>
                )
              }}
              // isSubmitting={isSubmitting}
            />
            ,
            <ReusableValidation
              fieldName="isoCountry"
              label={'ISO Country'}
              required={true}
              control="isoCountry"
              // isSubmitting={isSubmitting}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default CountryAddEdit;
