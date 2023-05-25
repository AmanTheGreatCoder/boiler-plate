import { useEffect, useRef, useState } from 'react';
import UserAddEdit from './UserAddEdit';
import withPagination from 'hoc/withPagination/withPagination';
import { MODULE_NAME } from './Values';
import UserFilter from './UserFilter';
import EnhancedTable from 'components/EnhancedTable';

const columns = [
  { id: 'fullName', label: 'Name' },
  { id: 'email', label: 'Email' },
  {
    id: 'phoneNumber',
    label: 'Phone Number'
  },
  { id: 'role', label: 'Role' },
  {
    id: 'isActive',
    label: 'Active'
  },
  { id: 'actions', name: 'Actions' }
];

function User(props) {
  const {
    rowsPerPage,
    setSearch,
    getList,
    clearSearchField,
    setQuery,
    children,
    ...otherProps
  } = props;
  const addEditRef = useRef(null);
  const filterRef = useRef(null);
  const [editData, setEditData] = useState('');

  return (
    <EnhancedTable
      title={MODULE_NAME}
      addBtnTitle="Add Admin"
      urlPrefix="user"
      downloadUrl={`${process.env.REACT_APP_BASE_URL}sample/sample_import_phone.csv`}
      pagination={children}
      add={true}
      addEditRef={addEditRef}
      filterRef={filterRef}
      columns={columns}
      setEditData={setEditData}
      getList={getList}
      {...otherProps}
    >
      <UserAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        ref={addEditRef}
      />
      <UserFilter
        onFilterChange={(values) => {
          filterRef.current.handleClose();
          setQuery({ role: values?.filterObj?.role || '' });
        }}
        onClear={() => {
          filterRef.current.handleClose();
          setQuery(null);
        }}
        ref={filterRef}
      />
    </EnhancedTable>
  );
}

export default withPagination(User, 'user/list', {
  imageRequired: true,
  title: MODULE_NAME
});
