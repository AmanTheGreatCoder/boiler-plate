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

const apiManager = new APIManager();

const CityFilter = forwardRef(({ getList, rowsPerPage, editData, setSearch, clearSearchField, onFilterChange, onClear }, modalRef) => {

  let initialValues = {
    countryId: '',
  }
  return (
    <Formik enableReinitialize initialValues={initialValues}
      onSubmit={async (values) => {
        onFilterChange(values)
      }}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, submitForm, setFieldValue }) => (
        <SimpleModal showClearButton={true} resetOnClear={true} title={MODULE_NAME} onClear={onClear} submitForm={submitForm} resetForm={resetForm} ref={modalRef} errors={errors} handleSubmit={handleSubmit} >
          <AutoComplete
            placeholder="Choose a country"
            url="country/list"
            fieldName="countryId"
            errorName={"Country"}
            optionRow={["countryName", "isoCountry", { countryCode: true, field: "countryCode" }]}
            showFlag={true}
            valueToShowInField="countryName"
          />
        </SimpleModal>
      )}
    </Formik>
  )
})

export default CityFilter