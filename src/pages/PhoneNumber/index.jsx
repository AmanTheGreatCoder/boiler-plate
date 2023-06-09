import ChooseCountry from 'components/ChooseCountry';
import CustomAutoComplete from 'components/CustomAutoComplete';
import Filter from 'components/Filter';
import ImportFile from 'components/ImportFile/ImportFile';
import CommonTable from 'layout/CommonTable';
import PhoneNumberAddEdit from './AddEdit';
import { uuid } from 'utils/Helper';

const columns = [
  {
    id: 'phoneNumber',
    label: 'Phone Number'
  },
  {
    id: 'providerId.name',
    label: 'Provider'
  },
  {
    id: 'cityId.cityName',
    label: 'City Name'
  },
  {
    id: 'countryId.countryName',
    label: 'Country Name'
  },
  {
    id: 'assignedTo.fullName',
    label: 'Assigned To'
  },
  {
    id: 'isActive',
    label: 'Active'
  },
  {
    id: 'actions',
    name: 'Actions',
    align: 'right'
  }
];

function PhoneNumber() {
  return (
    <CommonTable imageRequired={true} columns={columns} title={'Phone Numbers'} urlPrefix="phone">
      <PhoneNumberAddEdit type="addEdit" />
      <Filter type="filter">
        <ChooseCountry
          key={uuid()}
          ckey="choose country"
          fieldName="countryId"
          disableClear={true}
          required={false}
        />
        <CustomAutoComplete
          key={uuid()}
          placeholder="Choose a city"
          ckey="choose city"
          disableClear={true}
          url="city/listAll"
          fieldName="cityId"
          query="countryId"
          errorName={'City'}
          optionRow={['cityName']}
          valueToShowInField="cityName"
        />
        {/* <CustomAutoComplete
          key={uuid()}
          placeholder="Choose a provider"
          disableClear={true}
          url="provider/list"
          fieldName="providerId"
          errorName={'Provider'}
          optionRow={['name']}
          valueToShowInField="name"
        /> */}
      </Filter>
      <ImportFile
        type="import"
        sampleUrl={`${process.env.REACT_APP_BASE_URL}sample/sample_import_phone.csv`}
        url="phone/import"
      />
    </CommonTable>
  );
}

export default PhoneNumber;
