import SimpleModal from 'components/SimpleModal';
import { Formik, useFormikContext } from 'formik';
import { Logger } from 'logger';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { isObjectEmpty } from 'utils/Helper';

const logger = new Logger('Filter');

const Filter = forwardRef((props, filterRef) => {
  const { setQuery, query, children } = props;
  const [fieldInitialValues, setFieldInitialValues] = useState({});
  const [showInitialValues, setShowInitialValues] = useState(true);
  const [stateChildren, setStateChildren] = useState(React.Children.toArray(children));
  const [fieldList, setFieldList] = useState([]);
  let formikValues = {};
  const [currentFormikValues, setcurrentFormikValues] = useState(formikValues);

  const onClear = () => {
    filterRef.current.handleClose();
    setQuery(null);
  };

  const onOpen = (isOpen) => {
    if (query && isOpen) {
      if (showInitialValues && fieldList.length !== 0) {
        let newFieldValues = {};
        for (let i = 0; i < fieldList.length; i++) {
          newFieldValues[fieldList[i]] = query[fieldList[i]];
        }
        setFieldInitialValues(newFieldValues);
      }
    } else {
      setShowInitialValues(true);
      setFieldInitialValues({});
    }
  };

  const getChildren = (values) => {
    logger.log('values in get children', values);
    logger.log('query', query);
    let tempList = [];
    const arr = React.Children.map(React.Children.toArray(children), (child, index) => {
      let extraProps = {};
      if (child?.props) {
        if (child.props.query) {
          if (typeof values === 'object' && !isObjectEmpty(values)) {
            let keys = Object.keys(values);
            let newQuery = {};

            if (typeof keys === 'object' && keys.length !== 0) {
              for (let i = 0; i < keys.length; i++) {
                newQuery[keys[i]] = values[keys[i]]._id;
              }
            } else {
              newQuery[keys] = values[keys]._id;
            }
            logger.log('new Query ', newQuery);
            extraProps['query'] = newQuery;
          } else {
            extraProps['query'] = query;
          }
        }
        logger.log({ extraProps });

        if (fieldInitialValues && child.props.fieldName) {
          extraProps['initialValues'] = fieldInitialValues[child.props.fieldName];
        }
        tempList.push(child.props.fieldName);
      }
      return React.cloneElement(child, {
        setInitialValues: setFieldInitialValues,
        showInitialValues,
        setShowInitialValues,
        ...extraProps
      });
    });
    if (tempList.length !== 0) {
      setFieldList(tempList);
    }
    logger.log('children array', arr);
    setStateChildren(arr);
  };

  useEffect(() => {
    getChildren();
  }, [showInitialValues, query, fieldInitialValues]);

  useEffect(() => {
    logger.log({ fieldInitialValues, query, formikValues, showInitialValues });
  }, [fieldInitialValues, query, formikValues, showInitialValues]);

  useEffect(() => {
    logger.log({ currentFormikValues });
    getChildren(currentFormikValues);
  }, [currentFormikValues]);

  useEffect(() => {
    logger.log('my console statement');
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={formikValues}
      onSubmit={async (values) => {
        logger.log({ values });
        let newQuery = {};
        for (let i = 0; i < fieldList.length; i++) {
          let val = values[fieldList[i]];
          if (typeof val === 'object') {
            newQuery[fieldList[i]] = val._id;
          } else {
            newQuery[fieldList[i]] = '';
          }
          logger.log('new Query values ', values[fieldList[i]]);
        }
        setQuery(newQuery);
        filterRef.current.handleClose();
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
      }) => {
        setcurrentFormikValues(values);
        return (
          <SimpleModal
            showClearButton={values.countryId || values.cityId || values.providerId ? true : false}
            resetOnClear={true}
            title={'Filter'}
            onClear={onClear}
            submitForm={submitForm}
            onOpen={onOpen}
            resetForm={resetForm}
            ref={filterRef}
            errors={errors}
            handleSubmit={handleSubmit}
          >
            {stateChildren}
          </SimpleModal>
        );
      }}
    </Formik>
  );
});

export default Filter;
