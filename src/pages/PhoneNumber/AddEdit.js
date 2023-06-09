import { InputAdornment } from '@mui/material';
import ChooseCountry from 'components/ChooseCountry';
import CustomAutoComplete from 'components/CustomAutoComplete';
import { Layout } from 'components/Layout/Layout';
import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import SimpleModal from 'components/SimpleModal';
import { Formik } from 'formik';
import { forwardRef, useState } from 'react';
import APIManager from 'utils/APImanager';
import { trimValues } from 'utils/Helper';

const apiManager = new APIManager();

const PhoneNumberAddEdit = forwardRef(
  ({ getList, rowsPerPage, editData, setSearch, clearSearchField }, modalRef) => {
    const [prefix, setPrefix] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [propValue, setPropValue] = useState('');

    let initialValues = {
      phoneNumber: editData.phoneNumber || '',
      countryId: editData.countryId || '',
      cityId: editData.cityId || '',
      providerId: editData.providerId || '',
      isActive: true,
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
      initialValues.countryId.countryCode = editData.countryCode;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { _id: countryId, countryCode } = values.countryId;
          const { _id: cityId } = values.cityId;
          const { _id: providerId } = values.providerId;
          const { isActive, capabilities, phoneNumber } = values;
          const trimmedValues = trimValues({
            countryId,
            cityId,
            phoneNumber,
            providerId,
            countryCode,
            isActive,
            capabilities
          });
          const res = editData
            ? await apiManager.patch(`phone/update/${initialValues._id}`, trimmedValues)
            : await apiManager.post('phone/create', trimmedValues);

          if (!res.error) {
            modalRef.current.handleClose();
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
          submitForm,
          setFieldValue
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
              <ChooseCountry
                onChange={(e) => {
                  if (e?.countryCode) {
                    setPrefix(`+${e.countryCode}`);
                  } else {
                    setPrefix(null);
                    setDisabled(true);
                  }
                  setPropValue({
                    isoCountry: e?.isoCountry,
                    countryCode: e?.countryCode
                  });
                  setDisabled(false);
                  setFieldValue('cityId', '');
                  setFieldValue('phoneNumber', '');
                }}
              />
              ,
              <CustomAutoComplete
                key={values?.countryId?._id}
                placeholder="Choose a city"
                disabled={!values.countryId}
                url={values?.countryId ? 'city/list' : ''}
                required={true}
                fieldName="cityId"
                query={{ countryId: values?.countryId?._id }}
                errorName={'City'}
                optionRow={['cityName']}
                valueToShowInField="cityName"
                inputProps={{
                  style: { textTransform: 'capitalize' }
                }}
              />
              ,
              <CustomAutoComplete
                placeholder="Choose a provider"
                url="provider/list"
                fieldName="providerId"
                errorName={'Provider'}
                required={true}
                optionRow={['name']}
                valueToShowInField="name"
              />
              ,
              <ReusableValidation
                fieldName="phoneNumber"
                disabled={disabled}
                control="isValidPhoneNumber"
                label={'Phone Number'}
                required={true}
                min={4}
                max={15}
                propValue={propValue}
                InputProps={{
                  startAdornment: prefix ? (
                    <InputAdornment position="middle">{prefix}</InputAdornment>
                  ) : null
                }}
              />
            </SimpleModal>
          );
        }}
      </Formik>
    );
  }
);

export default PhoneNumberAddEdit;
