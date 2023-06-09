import { Layout } from 'components/Layout/Layout';
import ReusableValidation from 'components/ReusableValidation/ReusableValidation';
import SimpleModal from 'components/SimpleModal';
import { Formik } from 'formik';
import { forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import APIManager from 'utils/APImanager';
import { trimValues } from 'utils/Helper';

const apiManager = new APIManager();

const RateListAddEdit = forwardRef(
  ({ getList, editData, setSearch, clearSearchField }, modalRef) => {
    const params = useParams();

    let initialValues = {
      dialCode: editData.dialCode || '',
      Destination: editData.destination || '',
      type: 'provider',
      parentId: editData.parentId || '',
      rate: editData.rate || '',
      initialPulse: editData.initialPulse || '',
      subsequentPulse: editData.subsequentPulse || '',
      connectionCharge: editData.connectionCharge || ''
    };
    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          values.parentId = params.parentId;
          const trimmedValues = trimValues(values);
          trimmedValues.initialPulse = parseInt(trimmedValues.initialPulse);
          trimmedValues.rate = parseInt(trimmedValues.rate);
          trimmedValues.dialCode = parseInt(trimmedValues.dialCode);
          trimmedValues.subsequentPulse = parseInt(trimmedValues.subsequentPulse);
          trimmedValues.connectionCharge = parseInt(trimmedValues.connectionCharge);
          trimmedValues.defaultRate = parseInt(trimmedValues.defaultRate);
          const res = editData
            ? await apiManager.patch(`rate-list/update/${initialValues._id}`, trimmedValues)
            : await apiManager.post('rate-list/create', trimmedValues);
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
                  fieldName="dialCode"
                  control="isNumber"
                  label="Dial Code"
                  required={true}
                />,
                <ReusableValidation fieldName="Destination" label="Destination" required={true} />,
                <ReusableValidation
                  fieldName="rate"
                  control="isNumber"
                  label="Rate"
                  min={0}
                  max={5000}
                  required={true}
                />,
                <ReusableValidation
                  fieldName="initialPulse"
                  control="isNumber"
                  min={0}
                  max={30}
                  label="Initial Pulse"
                  required={true}
                />,
                <ReusableValidation
                  fieldName="subsequentPulse"
                  control="isNumber"
                  min={0}
                  max={30}
                  label="Subsequent Pulse"
                  required={true}
                />,
                <ReusableValidation
                  fieldName="connectionCharge"
                  control="isNumber"
                  min={0}
                  max={5000}
                  label="Connection Charge"
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

export default RateListAddEdit;
