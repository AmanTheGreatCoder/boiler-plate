import { useEffect, useRef, useState } from "react";
import UserAddEdit from "./UserAddEdit";
import withPagination from "higher order components/withPagination/withPagination";
import { MODULE_NAME } from "./Values";
import UserFilter from "./UserFilter";
import EnhancedTable from "components/EnhancedTable";
import CustomAlert from "components/CustomAlert";

const columns = [
  { id: "fullName", label: "Name", style: { minWidth: 30, maxWidth: 150 } },
  { id: "email", label: "Email", style: { minWidth: 30, maxWidth: 150 } },
  {
    id: "phoneNumber",
    label: "Phone Number",
    style: { minWidth: 30, maxWidth: 150 },
  },
  { id: "role", label: "Role" },
  {
    id: "isActive",
    label: "Active",
    headStyle: { paddingLeft: "25px" },
  },
  { id: "actions", name: "Actions" },
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
  const [editData, setEditData] = useState("");

  return (
    <EnhancedTable
      title={MODULE_NAME}
      addBtnTitle="Add Admin"
      urlPrefix="user"
      downloadUrl="https://mobile-api2.alpha-dev.streamspace.ai/sample/sample_import_phone.csv"
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
           
          setQuery({ role: values?.filterObj?.role || "" });
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

export default withPagination(User, "user/list", {
  imageRequired: true,
  title: MODULE_NAME,
});
