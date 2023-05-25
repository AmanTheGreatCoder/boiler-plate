import { useEffect, useRef, useState } from 'react';
import PhoneNumberAddEdit from './PhoneNumberAddEdit';
import PhoneFilter from './PhoneFilter';
import withPagination from 'hoc/withPagination/withPagination';
import { MODULE_NAME } from './Values';
import { Button } from '@mui/material';
import AssignNumberModal from './AssignNumberModal';
import ImportFile from 'components/ImportFile/ImportFile';
import EnhancedTable from 'components/EnhancedTable';
import { PhoneNumberUtil } from 'google-libphonenumber';

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

function PhoneNumber({
  rowsPerPage,
  getList,
  setSearch,
  clearSearchField,
  children,
  setQuery,
  ...otherProps
}) {
  const addEditRef = useRef(null);
  const importRef = useRef(null);
  const assignModalRef = useRef(null);
  const filterRef = useRef(null);

  const [editData, setEditData] = useState('');

  useEffect(() => {
    var phoneUtil = PhoneNumberUtil.getInstance();
    let valid2 = phoneUtil.isValidNumberForRegion(
      phoneUtil.parse('2222222222', 'IN'),
      'IN'
    );
  }, []);

  return (
    <EnhancedTable
      title={MODULE_NAME}
      urlPrefix="phone"
      pagination={children}
      getList={getList}
      add={true}
      addEditRef={addEditRef}
      filterRef={filterRef}
      importRef={importRef}
      assignModalRef={assignModalRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <PhoneNumberAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
      {/* <AssignNumberModal
        ref={assignModalRef}
        editData={editData}
        getList={getList}
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        rowsPerPage={rowsPerPage}
      /> */}
      <PhoneFilter
        onFilterChange={(values) => {
          const { cityId, countryId, providerId } = values;
          filterRef.current.handleClose();
          setQuery({
            cityId: cityId?._id || '',
            countryId: countryId?._id || '',
            providerId: providerId?._id || ''
          });
        }}
        onClear={() => {
          filterRef.current.handleClose();
          setQuery(null);
        }}
        ref={filterRef}
      />
      <ImportFile
        sampleUrl={`${process.env.REACT_APP_BASE_URL}sample/sample_import_phone.csv`}
        clearSearchField={clearSearchField}
        getList={getList}
        rowsPerPage={rowsPerPage}
        setSearch={setSearch}
        url="phone/import"
        ref={importRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(PhoneNumber, 'phone/list', {
  imageRequired: true,
  title: MODULE_NAME
});
