import { forwardRef } from 'react';
import SimpleModal from 'components/SimpleModal';
import APIManager from 'utils/APImanager';
import styled from '@emotion/styled';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Formik } from 'formik';
import { useTheme } from '@emotion/react';
import { Link } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CustomAlert from 'components/CustomAlert';

const apiManager = new APIManager();

const SoundGroup = styled.div`
  padding: 70px 0px 70px 0px;
  width: 100%;
  margin: 15px 0 auto;
  position: relative;
  text-align: center;
  border: 1px dashed #dae0e6;
  display: inline-block;
  transition: transform 0.3s;
  background: #faf8ff;
  letter-spacing: 0.23px;
  color: #5b5b5b;
  border-radius: 14px;

  .file-span {
    word-break: break-word;
  }

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

  ${(props) => {
    if (props.round) {
      return `
        font-size: 13px;
        padding: 5px 20px;
      `;
    }
  }};
`;

const ImportFile = forwardRef((props, ref) => {
  const { url, getList, rowsPerPage, setSearch, clearSearchField, sampleUrl } = props;
  const theme = useTheme();

  let initialValues = {
    files: null
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values) => {
        if (values.files) {
          const formData = new FormData();
          formData.append('file', values.files);
          const response = await apiManager.postForm(url, formData);
          if (!response.error) {
            ref.current.handleClose();
            getList(rowsPerPage);
            setSearch('');
            clearSearchField();
          }
        } else {
          CustomAlert({
            message: 'Please select a file',
            color: 'error'
          });
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
        resetForm,
        submitForm
      }) => (
        <SimpleModal submitForm={submitForm} resetForm={resetForm} title={'Import'} ref={ref}>
          <SoundGroup>
            <UploadFileIcon style={{ fontSize: '34px', color: theme.palette.primary.main }} />
            <span className="file-span">
              {!values?.files ? (
                <p>Select or drop a file to upload.</p>
              ) : (
                <p>{values?.files?.name}</p>
              )}
            </span>

            <FileInput
              type="file"
              accept=".csv"
              value={values?.files && values.files[0]}
              onChange={(e) => {
                setFieldValue('files', e.target.files[0]);
              }}
            />
          </SoundGroup>
          {sampleUrl && (
            <Link
              sx={{ marginTop: '10px' }}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
              about="_blank"
              href={sampleUrl}
            >
              <CloudDownloadIcon />
              <p style={{ margin: '0', marginLeft: '10px' }}>Download Sample File</p>
            </Link>
          )}
        </SimpleModal>
      )}
    </Formik>
  );
});

ImportFile.propTypes = {};

export default ImportFile;
