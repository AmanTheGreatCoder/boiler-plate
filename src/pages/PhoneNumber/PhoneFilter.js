// import ChooseCountry from 'components/ChooseCountry';
// import CustomAutoComplete from 'components/CustomAutoComplete';
// import { Layout } from 'components/Layout/Layout';
// import SimpleModal from 'components/SimpleModal';
// import { Formik } from 'formik';
// import { uniqueId } from 'lodash';
// import { forwardRef, useEffect, useState } from 'react';

// const PhoneFilter = forwardRef((props, filterRef) => {
//   const { setQuery, query } = props;
//   const [fieldInitialValues, setFieldInitialValues] = useState({
//     countryId: '',
//     cityId: '',
//     providerId: ''
//   });
//   const [showInitialValues, setShowInitialValues] = useState(true);

//   let initialValues = {
//     countryId: '',
//     cityId: '',
//     providerId: ''
//   };

//   const onClear = () => {
//     filterRef.current.handleClose();
//     setQuery(null);
//   };

//   const onOpen = (isOpen) => {
//     if (query && isOpen) {
//       if (showInitialValues) {
//         setFieldInitialValues({
//           countryId: query?.countryId,
//           cityId: query?.cityId,
//           providerId: query?.providerId
//         });
//       }
//     } else {
//       setShowInitialValues(true);
//       setFieldInitialValues({
//         countryId: '',
//         cityId: '',
//         providerId: ''
//       });
//     }
//   };

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={initialValues}
//       onSubmit={async (values) => {
//         const { cityId, countryId, providerId } = values;
//         filterRef.current.handleClose();
//         // setShowInitialValues(false);
//         setQuery({
//           cityId: cityId?._id || '',
//           countryId: countryId?._id || '',
//           providerId: providerId?._id || ''
//         });
//       }}
//     >
//       {({
//         errors,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         isSubmitting,
//         touched,
//         values,
//         resetForm,
//         submitForm,
//         setFieldValue
//       }) => (
//         <SimpleModal
//           showClearButton={values.countryId || values.cityId || values.providerId ? true : false}
//           resetOnClear={true}
//           title={'Filter'}
//           onClear={onClear}
//           submitForm={submitForm}
//           onOpen={onOpen}
//           resetForm={resetForm}
//           ref={filterRef}
//           errors={errors}
//           handleSubmit={handleSubmit}
//         >
//           <ChooseCountry
//             initialValues={fieldInitialValues.countryId}
//             disableClear={true}
//             required={false}
//           />
//           <CustomAutoComplete
//             key={values?.countryId?._id}
//             initialValues={fieldInitialValues.cityId}
//             setInitialValues={setFieldInitialValues}
//             showInitialValues={showInitialValues}
//             setShowInitialValues={setShowInitialValues}
//             placeholder="Choose a city"
//             disableClear={true}
//             url="city/listAll"
//             fieldName="cityId"
//             query={{ countryId: values?.countryId?._id }}
//             errorName={'City'}
//             optionRow={['cityName']}
//             valueToShowInField="cityName"
//           />
//           <CustomAutoComplete
//             initialValues={fieldInitialValues.providerId}
//             placeholder="Choose a provider"
//             disableClear={true}
//             url="provider/list"
//             fieldName="providerId"
//             errorName={'Provider'}
//             optionRow={['name']}
//             valueToShowInField="name"
//           />
//         </SimpleModal>
//       )}
//     </Formik>
//   );
// });

// export default PhoneFilter;
