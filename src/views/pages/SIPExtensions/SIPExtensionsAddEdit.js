import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { Formik } from "formik";
import React, { forwardRef, useEffect, useState } from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
} from "@mui/material";
import * as Yup from "yup";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import AutoComplete from "components/AutoComplete/AutoComplete";
import { Layout } from "components/Layout/Layout";

const apiManager = new APIManager();

const SIPExtensionsAddEdit = forwardRef(
  (
    { getList, rowsPerPage, editData, setSearch, clearSearchField },
    modalRef
  ) => {
    let initialValues = {
      sipDomain: editData.sipDomain || "",
      proxyServerIp: editData.proxyServerIp || "",
      proxyServerPort: editData.proxyServerPort || "",
      dnsServer: editData.dnsServer || "",
      mediaType: editData.mediaType || "",
      registerServer: editData.registerServer || "",
      sipTimeout: editData.sipTimeout || "",
      sipTransport: editData.sipTransport || "",
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const trimmedValues = trimValues(values);
          trimmedValues.proxyServerPort = parseInt(
            trimmedValues.proxyServerPort
          );
          trimmedValues.sipTimeout = parseInt(trimmedValues.sipTimeout);

          const res = editData
            ? await apiManager.patch(
                `sip/update/${initialValues._id}`,
                trimmedValues
              )
            : await apiManager.post("sip/create", trimmedValues);
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
            {/* <Grid container alignItems={'flex-start'} spacing={1}>
                        <Grid item lg={6}>
                            <ReusableValidation varName="sipDomain" control="isDomain" fieldName="SIP Domain" required={true} />
                        </Grid>
                        <Grid item lg={6}>
                            <ReusableValidation varName="proxyServerIp" control="isIP" fieldName="Proxy Server IP" required={true} />
                        </Grid>
                        <Grid item lg={6}>
                            <ReusableValidation varName="proxyServerPort" control="isPort" fieldName="Proxy Server Port" required={true} />
                        </Grid>
                        <Grid item lg={6}>
                            <ReusableValidation varName="dnsServer" control="isIP" fieldName="DNS Server" required={true} />
                        </Grid>
                        <Grid item lg={6}>
                            <ReusableValidation varName="mediaType" fieldName="Media Type" required={true} />
                        </Grid>
                        <Grid item lg={6}>
                            <ReusableValidation varName="registerServer" fieldName="Register Server" />
                        </Grid>
                        <Grid item lg={6}>
                    <ReusableValidation varName="sipTimeout" control="isNumber" fieldName="SIP Timeout" required={true} />
                        </Grid>
                        <Grid item lg={6}>
                    <ReusableValidation varName="sipTransport" fieldName="SIP Transport" required={true} />
                        </Grid>
                    </Grid> */}
            <Layout
              itemsInRow={2}
              components={[
                <ReusableValidation
                  varName="sipDomain"
                  control="isDomain"
                  fieldName="SIP Domain"
                  required={true}
                />,
                <ReusableValidation
                  varName="proxyServerIp"
                  control="isIP"
                  fieldName="Proxy Server IP"
                  required={true}
                />,
                <ReusableValidation
                  varName="proxyServerPort"
                  control="isPort"
                  fieldName="Proxy Server Port"
                  required={true}
                />,
                <ReusableValidation
                  varName="dnsServer"
                  control="isIP"
                  fieldName="DNS Server"
                  required={true}
                />,
                <ReusableValidation
                  varName="mediaType"
                  fieldName="Media Type"
                  required={true}
                />,
                <ReusableValidation
                  varName="registerServer"
                  fieldName="Register Server"
                />,
                <ReusableValidation
                  varName="sipTimeout"
                  control="isNumber"
                  fieldName="SIP Timeout"
                  required={true}
                />,
                <ReusableValidation
                  varName="sipTransport"
                  fieldName="SIP Transport"
                  required={true}
                />,
              ]}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default SIPExtensionsAddEdit;