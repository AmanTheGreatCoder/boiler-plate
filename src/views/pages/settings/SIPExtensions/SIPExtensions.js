import { useRef, useState } from "react";
import SIPExtensionsAddEdit from "./SIPExtensionsAddEdit";
import withPagination from "higher order components/withPagination/withPagination";
import APIManager from "utils/APImanager";
import { MODULE_NAME } from "./Values";
import EnhancedTable from "components/EnhancedTable";

const columns = [
  { id: "sipDomain", label: "Domain", style: { minWidth: 30, maxWidth: 150 } },
  { id: "proxyServerIp", label: "IP", style: { minWidth: 30, maxWidth: 150 } },
  {
    id: "proxyServerPort",
    label: "Port",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "sipTransport",
    label: "Transport",
    style: { minWidth: 30, maxWidth: 150 },
  },
  {
    id: "actions",
    name: "Actions",
    style: { minWidth: 70, maxWidth: 150 },
    align: "right",
  },
];

function City({
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
      urlPrefix="sip"
      pagination={children}
      getList={getList}
      add={true}
      addEditRef={addEditRef}
      columns={columns}
      setEditData={setEditData}
      {...otherProps}
    >
      <SIPExtensionsAddEdit
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
export default withPagination(City, "sip/list", { title: MODULE_NAME });
