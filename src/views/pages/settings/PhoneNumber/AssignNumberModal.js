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

const AssignNumberModal = forwardRef(({ getList, rowsPerPage, editData, setSearch, clearSearchField }, assignModalRef) => {

  let initialValues = {
    // phoneNumber: editData.phoneNumber || "",
    // countryId: editData.countryId || '',
    // cityId: editData.cityId || "",
    // providerId: editData.providerId || "",
    // isActive: true
  }
  if (editData) {
    initialValues._id = editData._id
    initialValues.countryId.countryCode = editData.countryCode
  }

  return (
    <Formik enableReinitialize initialValues={initialValues}
      onSubmit={async (values) => {
        const { _id: countryId, countryCode } = values.countryId;
        const { _id: cityId } = values.cityId;
        const { _id: providerId } = values.providerId;
        const { phoneNumber, isActive } = values;
        const trimmedValues = trimValues({ countryId, cityId, phoneNumber, providerId, countryCode, isActive })
        const res = editData ? await apiManager.patch(`phone/update/${initialValues._id}`, trimmedValues) : await apiManager.post('phone/create', trimmedValues);
        console.log({ res })
        if (!res.error) {
          assignModalRef.current.handleClose();
          getList(rowsPerPage)
          setSearch("")
          clearSearchField();
        }
      }}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, submitForm, setFieldValue }) => (
        <SimpleModal title={MODULE_NAME} submitForm={submitForm} resetForm={resetForm} ref={assignModalRef} errors={errors} handleSubmit={handleSubmit} >
          <AutoComplete
            placeholder="Choose a user"
            url="country/list"
            fieldName="countryId"
            errorName={"Country"}
            required={true}
            // onChange={}
            optionRow={["countryName", "isoCountry", { countryCode: true, field: "countryCode" }]}
            showFlag={true}
            valueToShowInField="countryName"
            onChange={(value) => {
              setFieldValue("cityId", "")
            }}
          />
        </SimpleModal>
      )}
    </Formik>
  )
})

export default AssignNumberModal