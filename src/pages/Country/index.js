import ImportFile from 'components/ImportFile/ImportFile';
import CommonTable from 'layout/CommonTable';
import CountryAddEdit from './CountryAddEdit';

const columns = [
  {
    id: 'countryName',
    label: 'Country Name'
  },
  {
    id: 'countryCode',
    label: 'Dial Code',
    prefix: '+'
  },
  {
    id: 'isoCountry',
    label: 'ISO'
  },
  { id: 'flag', label: 'Flag' },
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

function Country(props) {
  return (
    <CommonTable columns={columns} imageRequired={true} title={'Countries'} urlPrefix="country">
      <CountryAddEdit type="addEdit" />
      <ImportFile
        type="import"
        sampleUrl={`${process.env.REACT_APP_BASE_URL}sample/sample_import_country.csv`}
        url="country/import"
      />
    </CommonTable>
  );
}
export default Country;
