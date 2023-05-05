import React, { forwardRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import APIManager from "utils/APImanager";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import fileImg from "assets/images/file.png";

const apiManager = new APIManager();

const DropStyle = styled.div`
//   border: 1px dashed rgb(147, 147, 147);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
//   min-height: 150px;
//   border-radius: 10px;


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
`;

const ImportFile = forwardRef((props, ref) => {
  const { url, title } = props;
  const [name, setName] = useState();
  const submit = () => {
    console.log("submit called");
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log("accepted files", acceptedFiles[0]);
    if (acceptedFiles && acceptedFiles[0]) {
      setName(acceptedFiles[0].name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: ".csv",
    onDrop,
  });

  return (
    <SimpleModal resetOnClear={()=>{
        console.log("cleared")
    }} resetForm={()=>{
        console.log("ccccccccccccccccccccccccleared")
    }} title={title} submitForm={submit} ref={ref}>
      <DropStyle {...getRootProps({ className: "dropzone" })}>
        <img src={fileImg} />
        <input {...getInputProps()} />
        {!name &&
          (isDragActive ? (
            <p className="m-0">Drop the files here ...</p>
          ) : (
            <p className="m-0">
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          ))}
        {name && <p>{name}</p>}
      </DropStyle>
    </SimpleModal>
  );
});

ImportFile.propTypes = {};

export default ImportFile;
