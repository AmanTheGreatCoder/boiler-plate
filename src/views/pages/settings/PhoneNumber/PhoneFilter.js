import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import { Formik } from 'formik';
import React, { forwardRef, useEffect, useState } from 'react'
import APIManager from 'utils/APImanager';
import SimpleModal from 'views/forms/plugins/Modal/SimpleModal';
import { FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import * as Yup from 'yup'
import { trimValues } from 'utils/Helper'
import { MODULE_NAME } from './Values'
import AutoComplete from 'components/AutoComplete/AutoComplete';
import { Layout } from 'components/Layout/Layout';

const apiManager = new APIManager();

const PhoneFilter = forwardRef(({ getList, rowsPerPage, editData, setSearch, clearSearchField, onFilterChange, onClear }, modalRef) => {

  let initialValues = {
    countryId: '',
    cityId: ""
  }
  return (
    <Formik enableReinitialize initialValues={initialValues}
      onSubmit={async (values) => {
        onFilterChange(values)
      }}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, submitForm, setFieldValue }) => (
        <SimpleModal showClearButton={true} resetOnClear={true} title={MODULE_NAME} onClear={onClear} submitForm={submitForm} resetForm={resetForm} ref={modalRef} errors={errors} handleSubmit={handleSubmit} >
          <Layout
            itemsInRow={2}
            components={[
              <AutoComplete
                placeholder="Choose a country"
                url="country/list"
                fieldName="countryId"
                errorName={"Country"}
                // onChange={}
                optionRow={["countryName", "isoCountry", { countryCode: true, field: "countryCode" }]}
                showFlag={true}
                valueToShowInField="countryName"
                onChange={(value) => {
                  setFieldValue("cityId", "")
                }}
              />,
              <AutoComplete
                key={values?.countryId?._id}
                placeholder="Choose a city"
                url="city/listAll"
                fieldName="cityId"
                query={{ countryId: values?.countryId?._id }}
                errorName={"City"}
                optionRow={["cityName"]}
                valueToShowInField="cityName"
              />
            ]}
          />
        </SimpleModal>
      )}
    </Formik>
  )
})

export default PhoneFilter