import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import { FieldArray, Formik } from 'formik';
import { Fragment, forwardRef, useEffect, useMemo, useRef } from 'react';
import APIManager from 'utils/APImanager';
import SimpleModal from 'components/SimpleModal';
import { trimValues } from 'utils/Helper';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Layout } from 'components/Layout/Layout';
import { debounce } from 'lodash';
import CustomAlert from 'components/CustomAlert';
import ReusableSwitch from 'components/ReusableSwitch.js/ReusableSwitch';
import { AddCircleOutline, CurrencyPound, RemoveCircleOutline } from '@mui/icons-material';
import { useTheme } from '@mui/styles';

const apiManager = new APIManager();

const SubscriptionAddEdit = forwardRef((props, ref) => {
  const { getList, editData, search, setSearch, clearSearchField } = props;
  const formik = useRef();
  const disabled = editData ? true : false;
  const theme = useTheme();

  const debouncedValidate = useMemo(
    () =>
      debounce(() => {
        return formik.current?.validateForm;
      }, 1000),
    [formik]
  );

  useEffect(() => {
    debouncedValidate(formik.current?.values);
  }, [formik.current?.values, debouncedValidate]);

  let initialValues = {
    name: editData.name || '',
    interval: editData.interval || 'month',
    amount: editData?.amount || '',
    currency: editData?.currency || 'gbp',
    isActive: editData?.isActive || false,
    isDeleted: editData?.isDeleted || false,
    isLimited: editData?.isLimited || false,
    benefits: editData.benefits || [''],
    defaultSelected: editData?.defaultSelected || false,
    isPopular: editData?.isPopular || false,
    recurring: editData?.recurring || false,
    totalMinutes: editData.total_minutes || ''
  };

  if (editData) {
    initialValues._id = editData._id;
  }

  return (
    <Formik
      innerRef={formik}
      validateOnMount={true}
      validateOnChange={false}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values) => {
        const trimmedValues = trimValues({ ...values });
        trimmedValues.amount = parseInt(trimmedValues.amount);
        trimmedValues.totalMinutes = parseInt(trimmedValues.totalMinutes);
        const res = editData
          ? await apiManager.patch(`subscription/update/${initialValues._id}`, trimmedValues)
          : await apiManager.post(`subscription/create`, trimmedValues);
        if (!res.error) {
          ref.current.handleClose();

          if (search !== '') {
            setSearch('');
            clearSearchField();
          } else {
            getList();
          }
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
        submitForm
      }) => {
        return (
          <SimpleModal
            title={editData ? 'Edit' : 'Add'}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={ref}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <Layout
              components={[
                <ReusableValidation fieldName="name" label={'Name'} required={true} />,
                <ReusableValidation
                  fieldName="amount"
                  label={'Amount'}
                  required={true}
                  disabled={disabled}
                  min={1}
                  max={1000}
                  control={'isNumber'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyPound className="icon-size" />
                      </InputAdornment>
                    )
                  }}
                />,
                <ReusableValidation
                  fieldName="totalMinutes"
                  label={'Total Minutes'}
                  min={1}
                  required={true}
                  disabled={disabled}
                  control={'isNumber'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon className="icon-size" />
                      </InputAdornment>
                    )
                  }}
                />,
                <Grid item>
                  <ReusableSwitch fieldName="defaultSelected" label={'Default Selected'} />
                  <ReusableSwitch fieldName="isPopular" label={'Popular'} />
                </Grid>
              ]}
            />
            <FieldArray name="benefits">
              {({ push, remove }) => (
                <Fragment>
                  <div className="mt-10 flex-center-bt">
                    <label>Benefits</label>
                    <IconButton onClick={() => push('')} color="secondary" size="medium">
                      <AddCircleOutline />
                    </IconButton>
                  </div>
                  {values.benefits.map((ele, index) => {
                    return (
                      <Grid
                        container
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        spacing={2}
                      >
                        <Grid item lg={10}>
                          <ReusableValidation
                            key={index + 'ele'}
                            fieldName={`benefits.${index}`}
                            label="Benefit"
                            required={true}
                          />
                        </Grid>
                        <Grid
                          sx={{
                            paddingTop: errors?.benefits ? '0 !important' : '16px'
                          }}
                          className="flex-end"
                          item
                          lg={1}
                        >
                          <IconButton
                            onClick={() => {
                              if (values.benefits.length > 1) {
                                remove(index);
                              } else {
                                CustomAlert({
                                  message: 'Atleast one benefit is required',
                                  color: 'error'
                                });
                              }
                            }}
                            color="secondary"
                            size="medium"
                          >
                            <RemoveCircleOutline sx={{ color: theme.palette.error.main }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Fragment>
              )}
            </FieldArray>
          </SimpleModal>
        );
      }}
    </Formik>
  );
});

export default SubscriptionAddEdit;
