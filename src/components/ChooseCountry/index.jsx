import CustomAutoComplete from 'components/CustomAutoComplete';

const ChooseCountry = (props) => {
  const {
    ckey,
    disabled = false,
    required = true,
    disableClear = false,
    valueToShowInField,
    initialValues,
    setInitialValues,
    showInitialValues,
    setShowInitialValues,
    onChange
  } = props;

  return (
    <CustomAutoComplete
      ckey={ckey}
      disabled={disabled}
      disableClear={disableClear}
      placeholder="Choose a country"
      url="country/list"
      fieldName={'countryId'}
      errorName={'Country'}
      onChange={onChange}
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      showInitialValues={showInitialValues}
      setShowInitialValues={setShowInitialValues}
      optionRow={['countryName', 'isoCountry', { countryCode: true, field: 'countryCode' }]}
      showFlag={true}
      valueToShowInField={valueToShowInField || ['countryName', 'isoCountry']}
      required={required}
      inputProps={{
        style: { textTransform: 'capitalize' }
      }}
    />
  );
};

ChooseCountry.propTypes = {};

export default ChooseCountry;
