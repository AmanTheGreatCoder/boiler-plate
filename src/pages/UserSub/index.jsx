import { useRef, useState } from "react";
import withPagination from "hoc/withPagination/withPagination";
import EnhancedTable from "components/EnhancedTable";
import { CurrencyPound, AccessTime } from "@mui/icons-material";

const columns = [
  { id: "subId", label: "ID", style: { minWidth: 30, maxWidth: 150 } },
  { id: "name", label: "Name", style: { minWidth: 30, maxWidth: 150 } },
  {
    id: "phoneNumberId.countryCode.phoneNumber",
    label: "Phone Number",
    format: "add",
    style: { minWidth: 30, maxWidth: 150 },
    prefix: "+",
  },
  {
    id: "productId.total_minutes",
    label: "Total Minutes",
    style: { minWidth: 30, maxWidth: 150 },
    prefix: [<AccessTime sx={{ fontSize: "18px", mr: 0.5 }} />],
  },
  {
    id: "productId.amount",
    label: "Amount",
    style: { minWidth: 30, maxWidth: 150 },
    prefix: [<CurrencyPound sx={{ fontSize: "18px", mr: 0.5 }} />],
  },
  {
    id: "paymentDate",
    label: "Payment Date",
    format: "Date",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "status",
    label: "Status",
  },
];

function UserSub(props) {
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
      title={"User Subs"}
      urlPrefix="user-subs"
      //   downloadUrl="https://mobile-api2.alpha-dev.streamspace.ai/sample/sample_import_phone.csv"
      pagination={children}
      add={true}
      addEditRef={addEditRef}
      filterRef={filterRef}
      columns={columns}
      setEditData={setEditData}
      getList={getList}
      {...otherProps}
    >
      {/* <UserAddEdit
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
      /> */}
    </EnhancedTable>
  );
}

export default withPagination(UserSub, "user-subs", {
  imageRequired: true,
  title: "User Subs",
});
