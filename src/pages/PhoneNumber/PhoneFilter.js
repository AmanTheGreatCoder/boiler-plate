import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import { Formik } from 'formik';
import React, { forwardRef, useEffect, useState } from 'react';
import APIManager from 'utils/APImanager';
import SimpleModal from 'components/SimpleModal';
import { FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import * as Yup from 'yup';
import { trimValues } from 'utils/Helper';
import { MODULE_NAME } from './Values';
import CustomAutoComplete from 'components/CustomAutoComplete';
import { Layout } from 'components/Layout/Layout';

const apiManager = new APIManager();

const PhoneFilter = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField, onFilterChange, onClear },
    modalRef
  ) => {
    let initialValues = {
      countryId: '',
      cityId: '',
      providerId: ''
    };
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
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
          setFieldValue
        }) => (
          <SimpleModal
            showClearButton={values.countryId || values.cityId || values.providerId ? true : false}
            resetOnClear={true}
            title={'Filter'}
            onClear={onClear}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={modalRef}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <Layout
              components={[
                <CustomAutoComplete
                  placeholder="Choose a country"
                  disableClear={true}
                  url="country/list"
                  fieldName="countryId"
                  errorName={'Country'}
                  // onChange={}
                  optionRow={[
                    'countryName',
                    'isoCountry',
                    { countryCode: true, field: 'countryCode' }
                  ]}
                  showFlag={true}
                  valueToShowInField="countryName"
                  onChange={(value) => {
                    setFieldValue('cityId', '');
                  }}
                />,
                <CustomAutoComplete
                  key={values?.countryId?._id}
                  placeholder="Choose a city"
                  disableClear={true}
                  url="city/listAll"
                  fieldName="cityId"
                  query={{ countryId: values?.countryId?._id }}
                  errorName={'City'}
                  optionRow={['cityName']}
                  valueToShowInField="cityName"
                />,
                <CustomAutoComplete
                  placeholder="Choose a provider"
                  disableClear={true}
                  url="provider/list"
                  fieldName="providerId"
                  errorName={'Provider'}
                  optionRow={['name']}
                  valueToShowInField="name"
                />
              ]}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default PhoneFilter;
