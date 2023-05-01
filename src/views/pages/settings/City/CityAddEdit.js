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

const CityAddEdit = forwardRef(({ getList, rowsPerPage, editData, setSearch, clearSearchField }, modalRef) => {
  let initialValues = {
    cityName: editData.cityName || "",
    SelectValue: editData || '',
    isActive: true
  }

  return (
    <Formik enableReinitialize initialValues={initialValues}
      onSubmit={async (values) => {
        const { _id: countryId } = values.SelectValue;
        const { cityName, isActive } = values;
        const trimmedValues = trimValues({countryId,cityName,isActive})
        console.log('SelectValue', values.SelectValue)
        const res = await apiManager.post(`${editData ? `country/update/${initialValues._id}` : 'city/create'}`, trimmedValues);
        if (!res.error) {
          modalRef.current.handleClose();
          getList(rowsPerPage)
          setSearch("")
          clearSearchField();
        }
      }}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, submitForm }) => (
        <SimpleModal title={MODULE_NAME} submitForm={submitForm} resetForm={resetForm} ref={modalRef} errors={errors} handleSubmit={handleSubmit} >
          <ReusableValidation
            varName="cityName"
            fieldName={"City Name"}
            fieldValue={values.countryName}
            required={true}
          />
          <AutoComplete
            placeholder="Choose a country"
            url="country/list"
            fieldName="SelectValue"
            errorName={"Country"}
            optionRow={["countryName","isoCountry",{countryCode:true,field:"countryCode"}]}
            showFlag={true}
            valueToShowInField="countryName"
          />
        </SimpleModal>
      )}
    </Formik>
  )
})

export default CityAddEdit