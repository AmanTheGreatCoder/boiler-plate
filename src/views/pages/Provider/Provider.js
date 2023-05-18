import { useRef, useState } from "react";
import ProviderAddEdit from "./ProviderAddEdit";
import withPagination from "higher order components/withPagination/withPagination";
import APIManager from "utils/APImanager";
import { MODULE_NAME } from "./Values";
import EnhancedTable from "components/EnhancedTable";

const columns = [
  { id: "name", label: "Provider" },
  {
    id: "outboundDomain",
    label: "Domain",
  },
  {
    id: "outboundProxy",
    label: "Proxy",
  },
  {
    id: "outboundPort",
    label: "Port",
  },
  {
    id: "outboundUserName",
    label: "Name",
  },
  {
    id: "outboundActiveGateway",
    label: "Gateway",
    component: "toggle",
    endpoint: "active-gateway",
  },
  {
    id: "isActive",
    label: "Active",
  },
  {
    id: "actions",
    name: "Actions",
  },
];

function Provider({
  rowsPerPage,
  getList,
  setSearch,
  clearSearchField,
  children,
  ...otherProps
}) {
  const addEditRef = useRef(null);

  const [editData, setEditData] = useState("");

  return (
    <EnhancedTable
      title={MODULE_NAME}
      urlPrefix="provider"
      pagination={children}
      getList={getList}
      add={true}
      rateList={true}
      addEditRef={addEditRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <ProviderAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={addEditRef}
      />
    </EnhancedTable>
  );
}
export default withPagination(Provider, "provider/list", {
  imageRequired: true,
  title: MODULE_NAME,
});
