import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import { Formik } from 'formik';
import React, { forwardRef, useEffect, useState } from 'react'
import APIManager from 'utils/APImanager';
import SimpleModal from 'views/forms/plugins/Modal/SimpleModal';
import { Autocomplete, Chip, FormControl, FormControlLabel, FormGroup, InputLabel, OutlinedInput, Switch, TextField } from '@mui/material';
import * as Yup from 'yup'
import { trimValues } from 'utils/Helper'
import { MODULE_NAME, CURRENCY_JSON } from './Values';
import { useTheme } from '@mui/material/styles';
import AutoComplete from 'components/AutoComplete/AutoComplete';
import { Autocomplete as AutoCompleteMUI } from '@mui/material'

const apiManager = new APIManager();

const SubscriptionAddEdit = forwardRef(({ getList, rowsPerPage, editData, setSearch, clearSearchField }, modalRef) => {
    const theme = useTheme()
    const [tagValue, setTagValue] = useState()
    const disabled = editData ? true : false;

    console.log("edit Data", editData)
    let initialValues = {
        //TODO remove uneccessary here
        name: editData.name || "",
        interval: editData.interval || "",
        amount: editData?.amount || "",
        currency: editData?.currency || "",
        isActive: editData?.isActive || false,
        isDeleted: editData?.isDeleted || false,
        isLimited: editData?.isLimited || false,
        benefits: editData.benefits || [],
        defaultSelected: editData?.defaultSelected || false,
        isPopular: editData?.isPopular || false,
        totalMinutes: editData.total_minutes || "",
    }

    console.log({ initialValues })

    if (editData) {
        initialValues._id = editData._id;
    }

    return (
        <Formik enableReinitialize initialValues={initialValues}
            onSubmit={async (values) => {
                console.log({ values })
                const trimmedValues = trimValues({ ...values })
                console.log("trimmed values", trimmedValues)
                trimmedValues.amount = parseInt(trimmedValues.amount)
                trimmedValues.totalMinutes = parseInt(trimmedValues.totalMinutes)
                let res;
                if (editData) {
                    res = await apiManager.patch(`subscription/update/${initialValues._id}`, trimmedValues);
                }
                else {
                    res = await apiManager.post(`subscription/create`, trimmedValues);
                }
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
                        varName="name"
                        fieldName={"Name"}
                        required={true}
                    />
                    <ReusableValidation
                        varName="interval"
                        fieldName={"Interval"}
                        required={true}
                        disabled={disabled}
                    />
                    <ReusableValidation
                        varName="amount"
                        fieldName={"Amount"}
                        required={true}
                        disabled={disabled}
                        control={'isNumber'}
                    />
                    <ReusableValidation
                        varName="totalMinutes"
                        fieldName={"Total Minutes"}
                        required={true}
                        disabled={disabled}
                        control={'isNumber'}
                    />
                    <AutoComplete
                        placeholder='Benefits'
                        multiple={true}
                        freeSolo={true}
                        errorName={'Benefits'}
                        fieldName={"benefits"}
                    />
                    <AutoComplete
                        placeholder='Currency'
                        errorName={'Currency'}
                        fieldName={"currency"}
                    />

                </SimpleModal>
            )}
        </Formik>
    )
})

export default SubscriptionAddEdit