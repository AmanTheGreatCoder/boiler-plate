import { useRef, useState } from "react";
import ProviderAddEdit from "./ProviderAddEdit";
import withPagination from "higher order components/withPagination/withPagination";
import APIManager from "utils/APImanager";
import { MODULE_NAME } from "./Values";
import EnhancedTable from "components/EnhancedTable";

const columns = [
  { id: "name", label: "Provider", style: { minWidth: 30, maxWidth: 150 } },
  {
    id: "outboundDomain",
    label: "Domain",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "outboundProxy",
    label: "Proxy",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "outboundPort",
    label: "Port",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "outboundUserName",
    label: "Name",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "isActive",
    label: "Active",
  },
  {
    id: "outboundActiveGateway",
    label: "Active Gateway",
    component: "toggle",
    endpoint: "active-gateway",
    align: "center",
  },
  {
    id: "actions",
    name: "Actions",
    align: "center",
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
