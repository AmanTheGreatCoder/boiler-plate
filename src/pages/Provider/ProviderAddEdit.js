import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { useTheme } from '@mui/styles';
import CustomAlert from 'components/CustomAlert';
import { Layout } from 'components/Layout/Layout';
import ReusableSwitch from 'components/ReusableSwitch.js/ReusableSwitch';
import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import SimpleModal from 'components/SimpleModal';
import { FieldArray, Formik } from 'formik';
import { Fragment, forwardRef } from 'react';
import APIManager from 'utils/APImanager';
import { trimValues } from 'utils/Helper';

const apiManager = new APIManager();

const ProviderAddEdit = forwardRef(
  ({ getList, editData, setSearch, clearSearchField }, modalRef) => {
    const theme = useTheme();

    let initialValues = {
      name: editData.name || '',
      outboundDomain: editData.outboundDomain || '',
      outboundProxy: editData.outboundProxy || '',
      outboundPort: editData.outboundPort || '',
      outboundUserName: editData.outboundUserName || '',
      isActive: true,
      isInbound: editData.isInbound || false,
      isOutBound: editData.isOutBound || false,
      outboundPrefix: editData.outboundPrefix || '',
      outboundPassword: editData.outboundPassword || '',
      initialPulse: editData.initialPulse || '',
      subsequentPulse: editData.subsequentPulse || '',
      connectionCharge: editData.connectionCharge || '',
      defaultRate: editData.defaultRate || '',
      isBilled: editData.isBilled || false,
      outboundRegister: editData.outboundRegister || false,
      inboundIP: editData.inboundIp || [
        {
          ip: '',
          port: ''
        }
      ]
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (!values.inboundIP[0].port && !values.outboundPort) {
            CustomAlert({
              message: 'Please enter either inbound or outbound',
              color: 'error'
            });
            return;
          }
          const trimmedValues = trimValues(values);
          trimmedValues.initialPulse = parseInt(trimmedValues.initialPulse);
          trimmedValues.subsequentPulse = parseInt(trimmedValues.subsequentPulse);
          trimmedValues.connectionCharge = parseInt(trimmedValues.connectionCharge);
          trimmedValues.defaultRate = parseInt(trimmedValues.defaultRate);
          const res = editData
            ? await apiManager.patch(`provider/update/${initialValues._id}`, trimmedValues)
            : await apiManager.post('provider/create', trimmedValues);

          if (!res.error) {
            modalRef.current.handleClose();
            getList();
            setSearch('');
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
          setFieldValue
        }) => {
          return (
            <SimpleModal
              title={editData ? 'Edit' : 'Add'}
              submitForm={submitForm}
              resetForm={resetForm}
              ref={modalRef}
              errors={errors}
              handleSubmit={handleSubmit}
              size={{
                xs: '80%',
                sm: '50%',
                md: '60%',
                lg: '45%',
                xl: '30%'
              }}
            >
              <ReusableValidation fieldName="name" label={'Provider'} required={true} />
              {
                <Fragment>
                  <FieldArray name="inboundIP">
                    {({ push, remove }) => (
                      <Fragment>
                        {/* <div className='mt-10 flex-center-bt'> */}
                        <div className="flex-center-bt">
                          <ReusableSwitch fieldName="isInbound" label={'Inbound'} />
                          {values.isInbound && (
                            <IconButton
                              onClick={() =>
                                push({
                                  ip: '',
                                  port: ''
                                })
                              }
                              color="secondary"
                              size="medium"
                            >
                              <AddCircleOutline />
                            </IconButton>
                          )}
                        </div>
                        {values.isInbound &&
                          values.inboundIP.map((ele, index) => (
                            // <div style={{display: 'flex', alignItems: 'center'}}>
                            <Grid
                              container
                              alignItems={'center'}
                              justifyContent={'space-between'}
                              spacing={2}
                            >
                              <Grid item lg={5}>
                                <ReusableValidation
                                  key={index + 'ele'}
                                  fieldName={`inboundIP.${index}.ip`}
                                  control="isIP"
                                  label="Inbound IP"
                                  required={true}
                                />
                              </Grid>
                              <Grid item lg={5}>
                                <ReusableValidation
                                  key={'ele' + index}
                                  fieldName={`inboundIP.${index}.port`}
                                  control="isPort"
                                  label="Inbound Port"
                                  required={true}
                                />
                              </Grid>
                              <Grid className="flex-end" item lg={2}>
                                <IconButton
                                  onClick={() => {
                                    if (values.inboundIP.length > 1) {
                                      remove(index);
                                    } else {
                                      CustomAlert({
                                        message: 'Atleast one inbound is required',
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
                            // </div>
                          ))}
                      </Fragment>
                    )}
                  </FieldArray>
                </Fragment>
              }
              <ReusableSwitch fieldName="isOutBound" label={'Outbound'} />
              {/* {values.isInbound && <Divider sx={{ mt: 1 }} />} */}
              {values.isOutBound && (
                <Fragment>
                  <Layout
                    itemsInRow={2}
                    components={[
                      <ReusableValidation
                        fieldName="outboundDomain"
                        control="isDomain"
                        label="Outbound Domain"
                        required={true}
                      />,
                      <ReusableValidation
                        fieldName="outboundProxy"
                        control="isIP"
                        label="Outbound Proxy"
                        required={true}
                      />,
                      <ReusableValidation
                        fieldName="outboundPort"
                        control="isPort"
                        label="Outbound Port"
                        required={true}
                      />,
                      <ReusableValidation fieldName="outboundPrefix" label="Outbound Prefix" />,
                      <ReusableValidation fieldName="outboundUserName" label="Outbound Username" />,
                      <ReusableValidation
                        fieldName="outboundPassword"
                        type="password"
                        label="Outbound Password"
                      />,
                      <ReusableSwitch fieldName="outboundRegister" label={'Outbound Register'} />
                    ]}
                  />
                </Fragment>
              )}
              <div>
                <ReusableSwitch fieldName="isBilled" label={'Billed'} />
                {values.isBilled && (
                  <Fragment>
                    <Layout
                      itemsInRow={2}
                      components={[
                        <ReusableValidation
                          control="isNumber"
                          fieldName="initialPulse"
                          label="Initial Pulse"
                          required={true}
                        />,
                        <ReusableValidation
                          control="isNumber"
                          fieldName="subsequentPulse"
                          label="Subsequent Pulse"
                          required={true}
                        />,
                        <ReusableValidation
                          control="isNumber"
                          fieldName="connectionCharge"
                          label="Connection Charge"
                          required={true}
                        />,
                        <ReusableValidation
                          control="isNumber"
                          fieldName="defaultRate"
                          label="Default Rate"
                          required={true}
                        />
                      ]}
                    />
                  </Fragment>
                )}
              </div>
            </SimpleModal>
          );
        }}
      </Formik>
    );
  }
);

export default ProviderAddEdit;
