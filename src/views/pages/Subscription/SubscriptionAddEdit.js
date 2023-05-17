import ReusableValidation from "components/ReusableValidation/ReusableValidation";
import { FieldArray, Formik } from "formik";
import {
  Fragment,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import APIManager from "utils/APImanager";
import SimpleModal from "views/forms/plugins/Modal/SimpleModal";
import { trimValues } from "utils/Helper";
import { MODULE_NAME } from "./Values";
import { useTheme } from "@mui/material/styles";
import { Button, Grid, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { dispatch } from "store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Layout } from "components/Layout/Layout";
import { debounce } from "lodash";
import CustomAlert from "components/CustomAlert";

const apiManager = new APIManager();

const SubscriptionAddEdit = forwardRef(
  ({ getList, rowsPerPage, editData, setSearch, clearSearchField }, ref) => {
    const formik = useRef();
    const disabled = editData ? true : false;

    const debouncedValidate = useMemo(
      () =>
        debounce(() => {
          return formik.current?.validateForm;
        }, 1000),
      [formik]
    );

    useEffect(() => {
      debouncedValidate(formik.current?.values);
    }, [formik.current?.values, debouncedValidate]);

    let initialValues = {
      name: editData.name || "",
      interval: editData.interval || "month",
      amount: editData?.amount || "",
      currency: editData?.currency || "gbp",
      isActive: editData?.isActive || false,
      isDeleted: editData?.isDeleted || false,
      isLimited: editData?.isLimited || false,
      benefits: editData.benefits || [""],
      defaultSelected: editData?.defaultSelected || false,
      isPopular: editData?.isPopular || false,
      recurring: editData?.recurring || false,
      totalMinutes: editData.total_minutes || "",
    };

    if (editData) {
      initialValues._id = editData._id;
    }

    return (
      <Formik
        innerRef={formik}
        validateOnMount={true}
        validateOnChange={false}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const trimmedValues = trimValues({ ...values });
          trimmedValues.amount = parseInt(trimmedValues.amount);
          trimmedValues.totalMinutes = parseInt(trimmedValues.totalMinutes);
          const res = editData
            ? await apiManager.patch(
                `subscription/update/${initialValues._id}`,
                trimmedValues
              )
            : await apiManager.post(`subscription/create`, trimmedValues);
          if (!res.error) {
            ref.current.handleClose();
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
            ref={ref}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            <Layout
              itemsInRow={2}
              components={[
                <ReusableValidation
                  varName="name"
                  fieldName={"Name"}
                  required={true}
                />,
                <ReusableValidation
                  varName="amount"
                  fieldName={"Amount"}
                  required={true}
                  disabled={disabled}
                  min={1}
                  max={1000}
                  control={"isNumber"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon className="icon-size" />
                      </InputAdornment>
                    ),
                  }}
                />,
                <ReusableValidation
                  varName="totalMinutes"
                  fieldName={"Total Minutes"}
                  min={1}
                  required={true}
                  disabled={disabled}
                  control={"isNumber"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon className="icon-size" />
                      </InputAdornment>
                    ),
                  }}
                />,
              ]}
            />
            <FieldArray name="benefits">
              {({ push, remove }) => (
                <Fragment>
                  <div className="mt-10 flex-center-bt">
                    <label>Benefits</label>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => push("")}
                    >
                      Add
                    </Button>
                  </div>
                  {values.benefits.map((ele, index) => {
                    return (
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        spacing={2}
                      >
                        <Grid item lg={10}>
                          <ReusableValidation
                            key={index + "ele"}
                            varName={`benefits.${index}`}
                            fieldName="Benefit"
                            required={true}
                          />
                        </Grid>
                        <Grid className="flex-end" item lg={2}>
                          <Button
                            onClick={() => {
                              if (values.benefits.length > 1) {
                                remove(index);
                              } else {
                                CustomAlert({
                                  message: "Atleast one benefit is required",
                                  color: "error",
                                });
                              }
                            }}
                            variant="contained"
                          >
                            <RemoveCircleOutlineIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Fragment>
              )}
            </FieldArray>
          </SimpleModal>
        )}
      </Formik>
    );
  }
);

export default SubscriptionAddEdit;