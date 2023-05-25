import { useRef, useState } from 'react';
import CountryAddEdit from './CountryAddEdit';
import withPagination from 'hoc/withPagination/withPagination';
import { MODULE_NAME } from './Values';
import ImportFile from 'components/ImportFile/ImportFile';
import EnhancedTable from 'components/EnhancedTable';

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
  const { rowsPerPage, getList, setSearch, clearSearchField, children, ...otherProps } = props;
  const addEditRef = useRef(null);
  const importRef = useRef(null);
  const [editData, setEditData] = useState('');

  return (
    <EnhancedTable
      title={MODULE_NAME}
      urlPrefix="country"
      pagination={children}
      getList={getList}
      add={true}
      addEditRef={addEditRef}
      importRef={importRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <CountryAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
      <ImportFile
        sampleUrl={`${process.env.REACT_APP_BASE_URL}sample/sample_import_country.csv`}
        clearSearchField={clearSearchField}
        getList={getList}
        rowsPerPage={rowsPerPage}
        setSearch={setSearch}
        title={'Import'}
        url="country/import"
        ref={importRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(Country, 'country/list', {
  imageRequired: true,
  title: MODULE_NAME
});
