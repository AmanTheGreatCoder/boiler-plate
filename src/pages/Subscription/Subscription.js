import { useRef, useState } from "react";
import withPagination from "hoc/withPagination/withPagination";
import SubscriptionAddEdit from "./SubscriptionAddEdit";
import { MODULE_NAME } from "./Values";
import EnhancedTable from "components/EnhancedTable";
import { CurrencyPound, AccessTime } from "@mui/icons-material";

const columns = [
  { id: "name", label: "Name" },
  {
    id: "amount",
    label: "Amount",
    prefix: [<CurrencyPound sx={{ fontSize: "18px", mr: 0.5 }} />],
  },
  {
    id: "total_minutes",
    label: "Total Minutes",
    prefix: [<AccessTime sx={{ fontSize: "18px", mr: 0.5 }} />],
  },
  {
    id: "isActive",
    label: "Active",
  },
  {
    id: "actions",
    name: "Actions",
    align: "right",
  },
];

function Subscription(props) {
  const {
    rowsPerPage,
    getList,
    setSearch,
    clearSearchField,
    children,
    search,
    ...otherProps
  } = props;
  const addEditRef = useRef(null);
  const [editData, setEditData] = useState("");

  return (
    <EnhancedTable
      title={MODULE_NAME}
      urlPrefix="subscription"
      pagination={children}
      getList={getList}
      add={true}
      isDel={false}
      addEditRef={addEditRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <SubscriptionAddEdit
        clearSearchField={clearSearchField}
        search={search}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(Subscription, "subscription/list", {
  imageRequired: true,
  query: { isDeleted: false },
  title: MODULE_NAME,
});
