import UserAddEdit from './UserAddEdit';
import CommonTable from 'layout/CommonTable';
import UserFilter from './UserFilter';

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

function User() {
  return (
    <CommonTable
      title={'Users'}
      imageRequired={true}
      addBtnTitle="Add Admin"
      urlPrefix="user"
      downloadUrl={`${process.env.REACT_APP_BASE_URL}sample/sample_import_phone.csv`}
      columns={columns}
    >
      <UserFilter type="filter" />
      <UserAddEdit type="addEdit" />
    </CommonTable>
  );
}

export default User;
