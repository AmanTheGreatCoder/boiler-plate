import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik, FieldArray } from "formik";
import { Fragment, forwardRef } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { Button, Grid } from "@mui/material";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import ReusableSwitch from "components/ReusableSwitch.js/ReusableSwitch";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { dispatch } from "store";
import { Layout } from "components/Layout/Layout";
import CustomAlert from "components/CustomAlert";

const apiManager = new APIManager();

const ProviderAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    console.log({ editDataCheck: editData });

    let initialValues = {
      name: editData.name || "",
      outboundDomain: editData.outboundDomain || "",
      outboundProxy: editData.outboundProxy || "",
      outboundPort: editData.outboundPort || "",
      outboundUserName: editData.outboundUserName || "",
      isActive: true,
      isInbound: editData.isInbound || false,
      isOutBound: editData.isOutBound || false,
      outboundPrefix: editData.outboundPrefix || "",
      outboundPassword: editData.outboundPassword || "",
      initialPulse: editData.initialPulse || "",
      subsequentPulse: editData.subsequentPulse || "",
      connectionCharge: editData.connectionCharge || "",
      defaultRate: editData.defaultRate || "",
      isBilled: editData.isBilled || false,
      outboundRegister: editData.outboundRegister || false,
      inboundIP: editData.inboundIp || [
        {
          ip: "",
          port: "",
        },
      ],
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log("values", values);
          console.log("values port", values.inboundIP.port);
          if (!values.inboundIP[0].port && !values.outboundPort) {
            CustomAlert({
              message: "Please enter either inbound or outbound",
              color: "error",
            });
            return;
          }
          const trimmedValues = trimValues(values);
          trimmedValues.initialPulse = parseInt(trimmedValues.initialPulse);
          trimmedValues.subsequentPulse = parseInt(
            trimmedValues.subsequentPulse
          );
          trimmedValues.connectionCharge = parseInt(
            trimmedValues.connectionCharge
          );
          trimmedValues.defaultRate = parseInt(trimmedValues.defaultRate);
          const res = editData
            ? await apiManager.patch(
                `provider/update/${initialValues._id}`,
                trimmedValues
              )
            : await apiManager.post("provider/create", trimmedValues);

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
          setFieldValue,
        }) => (
          <SimpleModal
            title={MODULE_NAME}
            submitForm={submitForm}
            resetForm={resetForm}
            ref={modalRef}
            errors={errors}
            handleSubmit={handleSubmit}
            size={{
              xs: "80%",
              sm: "50%",
              md: "40%",
              lg: "80%",
              xl: "30%",
            }}
          >
            <ReusableValidation
              varName="name"
              fieldName={"Provider"}
              required={true}
            />
            {
              <Fragment>
                <FieldArray name="inboundIP">
                  {({ push, remove }) => (
                    <Fragment>
                      {/* <div className='mt-10 flex-center-bt'> */}
                      <div className="flex-center-bt">
                        <ReusableSwitch
                          varName="isInbound"
                          fieldName={"Inbound"}
                        />
                        {values.isInbound && (
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                              push({
                                ip: "",
                                port: "",
                              })
                            }
                          >
                            Add
                          </Button>
                        )}
                      </div>
                      {values.isInbound &&
                        values.inboundIP.map((ele, index) => (
                          // <div style={{display: 'flex', alignItems: 'center'}}>
                          <Grid
                            container
                            alignItems={"flex-start"}
                            justifyContent={"space-between"}
                            spacing={2}
                          >
                            <Grid item lg={5}>
                              <ReusableValidation
                                key={index + "ele"}
                                varName={`inboundIP.${index}.ip`}
                                control="isIP"
                                fieldName="Inbound IP"
                                required={true}
                              />
                            </Grid>
                            <Grid item lg={5}>
                              <ReusableValidation
                                key={"ele" + index}
                                varName={`inboundIP.${index}.port`}
                                control="isPort"
                                fieldName="Inbound Port"
                                required={true}
                              />
                            </Grid>
                            <Grid className="flex-end" item lg={2}>
                              <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={() => {
                                  if (values.inboundIP.length > 1) {
                                    remove(index);
                                  } else {
                                    CustomAlert({
                                      message:
                                        "Atleast one inbound is required",
                                      color: "error",
                                    });
                                  }
                                }}
                              >
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
            }
            <ReusableSwitch varName="isOutBound" fieldName={"Outbound"} />
            {/* {values.isInbound && <Divider sx={{ mt: 1 }} />} */}
            {values.isOutBound && (
              <Fragment>
                <Layout
                  itemsInRow={2}
                  components={[
                    <ReusableValidation
                      varName="outboundDomain"
                      control="isDomain"
                      fieldName="Outbound Domain"
                      required={true}
                    />,
                    <ReusableValidation
                      varName="outboundProxy"
                      control="isIP"
                      fieldName="Outbound Proxy"
                      required={true}
                    />,
                    <ReusableValidation
                      varName="outboundPort"
                      control="isPort"
                      fieldName="Outbound Port"
                      required={true}
                    />,
                    <ReusableValidation
                      varName="outboundPrefix"
                      fieldName="Outbound Prefix"
                    />,
                    <ReusableValidation
                      varName="outboundUserName"
                      fieldName="Outbound Username"
                    />,
                    <ReusableValidation
                      varName="outboundPassword"
                      type="password"
                      fieldName="Outbound Password"
                    />,
                    <ReusableSwitch
                      varName="outboundRegister"
                      fieldName={"Outbound Register"}
                    />,
                  ]}
                />
              </Fragment>
            )}
            <div>
              <ReusableSwitch varName="isBilled" fieldName={"Billed"} />
              {values.isBilled && (
                <Fragment>
                  <Layout
                    itemsInRow={2}
                    components={[
                      <ReusableValidation
                        control="isNumber"
                        varName="initialPulse"
                        fieldName="Initial Pulse"
                        required={true}
                      />,
                      <ReusableValidation
                        control="isNumber"
                        varName="subsequentPulse"
                        fieldName="Subsequent Pulse"
                        required={true}
                      />,
                      <ReusableValidation
                        control="isNumber"
                        varName="connectionCharge"
                        fieldName="Connection Charge"
                        required={true}
                      />,
                      <ReusableValidation
                        control="isNumber"
                        varName="defaultRate"
                        fieldName="Default Rate"
                        required={true}
                      />,
                    ]}
                  />
                </Fragment>
              )}
            </div>
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default ProviderAddEdit;
