import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import { Formik, FieldArray } from 'formik';
import React, { Fragment, forwardRef, useEffect, useState } from 'react'
import APIManager from 'utils/APImanager';
import SimpleModal from 'views/forms/plugins/Modal/SimpleModal';
import { FormControl, FormControlLabel, FormGroup, Switch, Button, Grid, Divider } from '@mui/material';
import * as Yup from 'yup'
import { trimValues } from 'utils/Helper'
import { MODULE_NAME } from './Values'
import AutoComplete from 'components/AutoComplete/AutoComplete';
import ReusableSwitch from 'components/ReusableSwitch.js/ReusableSwitch';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

const apiManager = new APIManager();

const ProviderAddEdit = forwardRef(({ getList, rowsPerPage, editData, setSearch, clearSearchField }, modalRef) => {

  let initialValues = {
    name: editData.name || "",
    outboundDomain: editData.outboundDomain || "",
    outboundProxy: editData.outboundProxy || "",
    outboundPort: editData.outboundPort || "",
    outboundUserName: editData.outboundUserName || "",
    isActive: true,
    isInbound: editData.isInbound || false,
    isOutBound: editData.isOutBound || false,
    initialPulse: editData.initialPulse || 0,
    subsequentPulse: editData.subsequentPulse || 0,
    connectionCharge: editData.connectionCharge || 0,
    defaultRate: editData.defaultRate || 0,
    isBilled: editData.isBilled || false,
    inboundIP: editData.inboundIP || [
      {
        ip: "",
        port: ""
      },
    ],
  }
  if (editData) {
    initialValues._id = editData._id
  }

  return (
    <Formik enableReinitialize initialValues={initialValues}
      onSubmit={async (values) => {
        const trimmedValues = trimValues(values)
        const res = editData ? await apiManager.patch(`provider/update/${initialValues._id}`, trimmedValues) : await apiManager.post('provider/create', trimmedValues);
         
        if (!res.error) {
          modalRef.current.handleClose();
          getList(rowsPerPage)
          setSearch("")
          clearSearchField();
        }
      }}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm, submitForm, setFieldValue }) => (
        <SimpleModal title={MODULE_NAME} submitForm={submitForm} resetForm={resetForm} ref={modalRef} errors={errors} handleSubmit={handleSubmit} >
          <ReusableValidation varName="name" fieldName={"Provider"} required={true} />
          { (
            <Fragment>
              <FieldArray name="inboundIP">
                {({ push, remove })=>(
                  <Fragment>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <ReusableSwitch varName="isInbound" fieldName={"Inbound"}/>
                      {values.isInbound && <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => push({
                        ip: "",
                        port: ""
                      })}>
                        Add
                      </Button>}
                    </div>
                    {values.isInbound && values.inboundIP.map((ele, index)=>(
                      // <div style={{display: 'flex', alignItems: 'center'}}>
                      <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                        <Grid item lg={5}>
                          <ReusableValidation key={index+'ele'} varName={`inboundIP.${index}.ip`} control="isIP" fieldName="Inbound IP" required={true} />
                        </Grid>
                        <Grid item lg={5}>
                          <ReusableValidation key={'ele'+index} varName={`inboundIP.${index}.port`} control="isPort" fieldName="Inbound Port" required={true} />
                        </Grid>
                        <Grid item lg={2}>
                          <Button onClick={()=>remove(index)} variant="contained">
                            <RemoveCircleOutlineIcon />
                          </Button>
                        </Grid>
                      </Grid>
                      // </div>
                    ))}
                  </Fragment>
                )}
              </FieldArray>
            </Fragment>
          )}
          {values.isInbound && <Divider sx={{ mt: 1}} />}
          <ReusableSwitch varName="isOutBound" fieldName={"Outbound"}/>
          {values.isOutBound && (
            <Fragment>
              <ReusableValidation varName="outboundDomain" control="isDomain" fieldName="Outbound Domain" required={true} />
              <ReusableValidation varName="outboundProxy" control="isIP" fieldName="Outbound Proxy" required={true} />
              <ReusableValidation varName="outboundPort" control="isPort" fieldName="Outbound Port" required={true} />
              <ReusableValidation varName="outboundUserName" fieldName="Outbound Username" required={true} />
            </Fragment>
          )}
        </SimpleModal>
      )}
    </Formik>
  )
})

export default ProviderAddEdit