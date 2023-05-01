import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import { Formik } from 'formik';
import React, { forwardRef, useEffect, useState } from 'react'
import APIManager from 'utils/APImanager';
import SimpleModal from 'views/forms/plugins/Modal/SimpleModal';
import { FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';
import * as Yup from 'yup'
import { trimValues } from 'utils/Helper'
import { MODULE_NAME } from './Values';

const apiManager = new APIManager();

const CountryAddEdit = forwardRef(({ getList, rowsPerPage, editData, setSearch, clearSearchField }, modalRef) => {
  // const [initialValues, setInitialValues] = useState({
  //   countryName: "",
  //   countryCode: "",
  //   isoCountry: "",
  //   flag: "",
  //   isActive: true,
  //   capabilities: {
  //     SMS: {
  //       isCapable: false
  //     },
  //     Voice: {
  //       isCapable: true
  //     }
  //   }
  // })
  let initialValues = {
    countryName: editData.countryName || "",
    countryCode: editData.countryCode || "",
    isoCountry: editData.isoCountry || "",
    flag: editData.flag || "",
    isActive: editData.isActive || true,
    capabilities: {
      SMS: {
        isCapable: false
      },
      Voice: {
        isCapable: true
      }
    }
  }
  if(editData){
    initialValues._id = editData._id
  }
  // useEffect(() => {
  //   console.log('editdata outside if')
  //   if(editData){
  //     console.log('editData', editData)
  //     setInitialValues({...editData})
  //   }
  //   console.log('editdata initialvalues',initialValues)
  // }, [editData])

  return (
    <Formik enableReinitialize initialValues={initialValues}
      onSubmit={async (values) => {
        const trimmedValues = trimValues(values)
        const res = await apiManager.post(`${editData ? `country/update/${initialValues._id}` : 'country/create'}`, trimmedValues);
        if (!res.error) {
          modalRef.current.handleClose();
          // getList(rowsPerPage)
          setSearch("")
          clearSearchField();
        }
      }}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, submitForm }) => (
        <SimpleModal title={MODULE_NAME} submitForm={submitForm} resetForm={resetForm} ref={modalRef} errors={errors} handleSubmit={handleSubmit} >
          <ReusableValidation
            varName="countryName"
            fieldName={"Country Name"}
            fieldValue={values.countryName}
            required={true}
          // isSubmitting={isSubmitting}
          />
          <ReusableValidation
            varName="countryCode"
            fieldName={"Country Code"}
            required={true}
            control="countryCode"
          // isSubmitting={isSubmitting}
          />
          <ReusableValidation
            varName="isoCountry"
            fieldName={"ISO Country"}
            required={true}
            control="isoCountry"
          // isSubmitting={isSubmitting}
          />
          <ReusableValidation
            varName="flag"
            fieldName={"Flag"}
            required={true}
          // isSubmitting={isSubmitting}
          />
          {/* <FormControl>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="start"
                control={<Switch checked={values.isActive} onChange={handleChange} name="isActive" color="primary" />}
                label="Active"
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl> */}
        </SimpleModal>
      )}
    </Formik>
  )
})

export default CountryAddEdit