import { Layout } from 'components/Layout/Layout';
import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import SimpleModal from 'components/SimpleModal';
import { Formik } from 'formik';
import { forwardRef } from 'react';
import APIManager from 'utils/APImanager';
import { trimValues } from 'utils/Helper';

const apiManager = new APIManager();

const SIPExtensionsAddEdit = forwardRef(
  ({ getList, editData, setSearch, clearSearchField }, modalRef) => {
    let initialValues = {
      sipDomain: editData.sipDomain || '',
      proxyServerIp: editData.proxyServerIp || '',
      proxyServerPort: editData.proxyServerPort || '',
      dnsServer: editData.dnsServer || '',
      mediaType: editData.mediaType || '',
      registerServer: editData.registerServer || '',
      sipTimeout: editData.sipTimeout || '',
      sipTransport: editData.sipTransport || ''
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
          trimmedValues.proxyServerPort = parseInt(trimmedValues.proxyServerPort);
          trimmedValues.sipTimeout = parseInt(trimmedValues.sipTimeout);

          const res = editData
            ? await apiManager.patch(`sip/update/${initialValues._id}`, trimmedValues)
            : await apiManager.post('sip/create', trimmedValues);
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
          submitForm
        }) => (
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
            <Layout
              itemsInRow={2}
              components={[
                <ReusableValidation
                  fieldName="sipDomain"
                  control="isDomain"
                  label="SIP Domain"
                  required={true}
                />,
                <ReusableValidation
                  fieldName="proxyServerIp"
                  control="isIP"
                  label="Proxy Server IP"
                  required={true}
                />,
                <ReusableValidation
                  fieldName="proxyServerPort"
                  control="isPort"
                  label="Proxy Server Port"
                  required={true}
                />,
                <ReusableValidation
                  fieldName="dnsServer"
                  control="isIP"
                  label="DNS Server"
                  required={true}
                />,
                <ReusableValidation fieldName="mediaType" label="Media Type" required={true} />,
                <ReusableValidation fieldName="registerServer" label="Register Server" />,
                <ReusableValidation
                  fieldName="sipTimeout"
                  control="isNumber"
                  label="SIP Timeout"
                  required={true}
                />,
                <ReusableValidation
                  fieldName="sipTransport"
                  label="SIP Transport"
                  required={true}
                />
              ]}
            />
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default SIPExtensionsAddEdit;
