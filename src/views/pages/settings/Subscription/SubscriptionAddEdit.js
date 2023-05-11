import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { FieldArray, Formik } from "formik";
import { Fragment, forwardRef, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import { useTheme } from "@mui/material/styles";
import { Button, Grid, InputAdornment } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { dispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const apiManager = new APIManager();

const SubscriptionAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    const theme = useTheme();
    const [tagValue, setTagValue] = useState("");
    const disabled = editData ? true : false;


    let initialValues = {
      name: editData.name || "",
      interval: editData.interval || "month",
      amount: editData?.amount || "",
      currency: editData?.currency || "gbp",
      isActive: editData?.isActive || false,
      isDeleted: editData?.isDeleted || false,
      isLimited: editData?.isLimited || false,
      benefits: editData.benefits || [""],
      defaultSelected: editData?.defaultSelected || false,
      isPopular: editData?.isPopular || false,
      recurring: editData?.recurring || false,
      totalMinutes: editData.total_minutes || "",
    };



    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {

          const trimmedValues = trimValues({ ...values });

          trimmedValues.amount = parseInt(trimmedValues.amount);
          trimmedValues.totalMinutes = parseInt(trimmedValues.totalMinutes);
          const res = await editData ? apiManager.patch(`subscription/update/${initialValues._id}`, trimmedValues) : apiManager.post(`subscription/create`, trimmedValues)
          if (!res.error) {
            modalRef.current.handleClose();
            getList(rowsPerPage);
            setSearch("");
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
        }) => (
          <SimpleModal
            title={MODULE_NAME}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={modalRef}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <ReusableValidation
              varName="name"
              fieldName={"Name"}
              required={true}
            />
            <ReusableValidation
              varName="amount"
              fieldName={"Amount"}
              required={true}
              disabled={disabled}
              control={"isNumber"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon className='icon-size' />
                  </InputAdornment>
                ),
              }}
            />
            <ReusableValidation
              varName="totalMinutes"
              fieldName={"Total Minutes"}
              required={true}
              disabled={disabled}
              control={"isNumber"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon className='icon-size' />
                  </InputAdornment>
                ),
              }}
            />
            <FieldArray name='benefits'>
              {({ push, remove }) => (
                <Fragment>
                  <div className='mt-10 flex-center-bt'>
                    <label>Benefits</label>
                    <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => push("")}>
                      Add
                    </Button>
                  </div>
                  {values.benefits.map((ele, index) => {
                    return <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                      <Grid item lg={10}>
                        <ReusableValidation key={index + 'ele'} varName={`benefits.${index}`} fieldName="Benefit" required={true} />
                      </Grid>
                      <Grid className='flex-end' item lg={2}>
                        <Button onClick={() => {
                          if (values.benefits.length > 1) {
                            remove(index)
                          }
                          else {
                            dispatch(
                              openSnackbar({
                                open: true,
                                message: "Atleast one benefit is required",
                                variant: 'alert',
                                alert: {
                                  color: 'error'
                                },
                                close: false
                              })
                            );
                          }
                        }} variant="contained">
                          <RemoveCircleOutlineIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  }
                  )}
                </Fragment>
              )}
            </FieldArray>
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default SubscriptionAddEdit;
