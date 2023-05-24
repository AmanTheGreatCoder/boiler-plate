import { useRef, useState } from "react";
import SIPExtensionsAddEdit from "./SIPExtensionsAddEdit";
import withPagination from "hoc/withPagination/withPagination";
import APIManager from "utils/APImanager";
import { MODULE_NAME } from "./Values";
import EnhancedTable from "components/EnhancedTable";

const columns = [
  { id: "sipDomain", label: "Domain" },
  { id: "proxyServerIp", label: "IP" },
  {
    id: "proxyServerPort",
    label: "Port",
  },
  {
    id: "sipTransport",
    label: "Transport",
  },
  {
    id: "actions",
    name: "Actions",
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
