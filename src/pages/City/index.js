import ImportFile from 'components/ImportFile/ImportFile';
import CommonTable from 'layout/CommonTable';
import CityAddEdit from './CityAddEdit';
import CityFilter from './CityFilter';

const columns = [
  {
    id: 'cityName',
    label: 'City Name'
  },
  {
    id: 'countryId.countryName',
    label: 'Country Name'
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

function City() {
  return (
    <CommonTable
      imageRequired={true}
      columns={columns}
      title={'Cities'}
      listUrl="listAll"
      urlPrefix="city"
    >
      <CityAddEdit type="addEdit" />
      <ImportFile
        type="import"
        sampleUrl={`${process.env.REACT_APP_BASE_URL}sample/sample_import_city.csv`}
        url="city/import"
      />
      <CityFilter type="filter" />
    </CommonTable>
  );
}

export default City;
