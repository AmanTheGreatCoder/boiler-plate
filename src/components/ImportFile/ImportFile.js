import { forwardRef } from "react";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import APIManager from "utils/APImanager";
import styled from "@emotion/styled";
import fileImg from "assets/images/file.png";
import { Formik } from "formik";
import { dispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";

const apiManager = new APIManager();

const SoundGroup = styled.div`
  // height: 211px;
  padding: 70px 0px 70px 0px;
  width: 100%;
  margin: 15px 0 auto;
  position: relative;
  text-align: center;
  // line-height: 195px;
  border: 1px dashed #dae0e6;
  display: inline-block;
  transition: transform 0.3s;
  background: #faf8ff;
  letter-spacing: 0.23px;
  color: #5b5b5b;
  border-radius: 14px;
  img {
    display: block;
    width: 40px !important;
    height: 40px !important;
    // margin: 50px auto -57px auto;
    border-radius: 0px;
    margin: auto;
  }
  input[type='file'] {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    cursor: pointer;
  }
`;


const FileInput = styled.input`
  display: block;
  border: none;
  width: 100%;
  height: 34px;
  padding: 10px;
  color: #444;

  ${props => {
    if (props.round) {
      return `
        font-size: 13px;
        padding: 5px 20px;
      `;
    }
  }};
`;


const ImportFile = forwardRef((props, ref) => {
  const { url, title, getList, rowsPerPage, setSearch, clearSearchField } = props;

  let initialValues = {
    files: null
  }

  return (
    <Formik enableReinitialize initialValues={initialValues}
      onSubmit={async (values) => {
        if (values.files) {
          const formData = new FormData();
          formData.append("file", values.files)
          const response = await apiManager.postForm(url, formData);
          if (!response.error) {
            ref.current.handleClose();
            getList(rowsPerPage)
            setSearch("")
            clearSearchField()
          }
        }
        else {
          dispatch(
            openSnackbar({
              open: true,
              message: "Please select a file",
              variant: 'alert',
              alert: {
                color: 'error'
              },
              close: false
            })
          );
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values, resetForm, submitForm }) => (
        <SimpleModal submitForm={submitForm} resetForm={resetForm} title={title} ref={ref}>
          <SoundGroup>
            <img src={fileImg} />
            <span>
              {!values?.files ? <p>Select or drop a file to upload.</p> : <p>{values?.files?.name}</p>}
            </span>

            <FileInput type="file" accept=".csv" value={values?.files && values.files[0]} onChange={e => {
              console.log("setting files")
              setFieldValue("files", e.target.files[0])
            }} />
          </SoundGroup>
        </SimpleModal>
      )}
    </Formik>
  );
});


ImportFile.propTypes = {};

export default ImportFile;
