// import ReusableValidation from "components/ReusableValidation/ReusableValidation";
// import { Formik } from "formik";
// import { forwardRef, useEffect } from "react";
// import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
// import { trimValues } from "utils/Helper";
// import AutoComplete from "components/AutoComplete/AutoComplete";
// import { Layout } from "components/Layout/Layout";
// import APIManager from "utils/APImanager";
// import ChooseCountry from "components/ChooseCountry";

// const apiManager = new APIManager();

// const ProfileEdit = forwardRef(
//   (
//     { getList, rowsPerPage, editData, setSearch, clearSearchField },
//     modalRef
//   ) => {
//     const disabled = editData ? true : false;

//     let initialValues = {
//       fullName: editData?.fullName || "",
//       phoneNumber: editData?.phoneNumber || "",
//       CountryValue: editData?.countryCode,
//       email: editData?.email || "",
//     };

//     if (editData) {
//       initialValues._id = editData?._id;
//     }

//     return (
//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         onSubmit={async (values) => {
//           const { countryCode } = values.CountryValue;
//           const trimmedValues = trimValues({ ...values, countryCode });
//           const res = editData
//             ? await apiManager.patch(`user/update/${values._id}`, trimmedValues)
//             : await apiManager.post(`auth/admin-register`, trimmedValues);
//           if (!res.error) {
//             modalRef.current.handleClose();
//             getList(rowsPerPage);
//             setSearch("");
//             clearSearchField();
//           }
//         }}
//       >
//         {({
//           errors,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           isSubmitting,
//           touched,
//           values,
//           resetForm,
//           submitForm,
//         }) => {
//           return (
//             <SimpleModal
//               title={"Edit Profile"}
//               submitForm={submitForm}
//               resetForm={resetForm}
//               ref={modalRef}
//               errors={errors}
//               handleSubmit={handleSubmit}
//             >
//               <Layout
//                 components={[
//                   <ReusableValidation
//                     fieldName="fullName"
//                     label={"Name"}
//                     required={true}
//                   />,
//                   <ReusableValidation
//                     fieldName="email"
//                     label={"Email"}
//                     required={true}
//                     control={"isEmail"}
//                   />,
//                   <AutoComplete
//                     disabled={disabled}
//                     placeholder="Choose a country code"
//                     url="country/list"
//                     fieldName="CountryValue"
//                     errorName={"Country"}
//                     required={true}
//                     optionRow={[
//                       "countryName",
//                       "isoCountry",
//                       { countryCode: true, field: "countryCode" },
//                     ]}
//                     showFlag={true}
//                     valueToShowInField={editData ? "" : "countryCode"}
//                   />,
//                   <ChooseCountry disabled={disabled} />,
//                   <ReusableValidation
//                     disabled={disabled}
//                     fieldName="phoneNumber"
//                     control="isNumber"
//                     label={"Phone Number"}
//                     required={true}
//                   />,
//                 ]}
//               />
//             </SimpleModal>
//           );
//         }}
//       </Formik>
//     );
//   }
// );

// ProfileEdit.propTypes = {};

// export default ProfileEdit;
