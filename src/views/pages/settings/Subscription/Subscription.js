import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import { Switch } from "@mui/material";
import withPagination from "higher order components/withPagination/withPagination";
import confirm from "views/forms/plugins/Confirm/confirm";
import APIManager from "utils/APImanager";
import { confirmMessage } from "utils/Helper";
import TableHeader from "components/TableHeader/TableHeader";
import ActionButtons from "components/ActionButtons/ActionButtons";
import SubscriptionAddEdit from "./SubscriptionAddEdit";
import { MODULE_NAME } from "./Values";
const apiManager = new APIManager();

const columns = [
  { id: "name", label: "Name", style: { minWidth: 30 } },
  // { id: 'interval', label: 'Interval', style: { minWidth: 100 } },
  { id: "amount", label: "Amount", style: { minWidth: 30 }, prefix: '$ ' },
  { id: "total_minutes", label: "Total Minutes", style: { minWidth: 30 }, prefix: '🕒 ' },
  {
    id: "isActive",
    label: "Active",
    style: { minWidth: 30, textAlign: "center" },
  },
  { id: "actions", label: "Actions", style: { minWidth: 70 }, align: "right" },
];

function Subscription(props) {
  const {
    list,
    setList,
    otherData,
    rowsPerPage,
    getList,
    searchSection,
    setSearch,
    clearSearchField,
    loading,
    emptyData,
    children,
    setQuery
  } = props;
  const modalRef = useRef(null);
  const [editData, setEditData] = useState("");

  console.log("List ", list);
  const renderCell = (ele, e) => {
    if (ele.id === "actions") {
      return (
        <ActionButtons
          editOnClick={() => {
            modalRef.current.handleOpen();
            setEditData(e);
          }}
        />
      );
    } else if (ele.id === "isActive") {
      return (
        <Switch
          checked={e.isActive}
          onClick={() => {
            confirm(confirmMessage(`${e.isActive ? "de" : ""}active`)).then(
              async () => {
                const res = await apiManager.put(
                  `subscription/status/${e._id}`,
                  {
                    status: !e.isActive,
                  }
                );
                if (!res.error) {
                  e.isActive = !e.isActive;
                  setList([...list]);
                }
              }
            );
          }}
          color="primary"
        />
      );
    }
    const value = e[ele.id];
    return value? ele.prefix? (ele.prefix + value) : (value) : '-'
    // return value;
  };

  return (
    <TableHeader
      title={MODULE_NAME}
      searchSection={searchSection}
      addOnClick={() => {
        modalRef.current.handleOpen();
        setEditData("");
      }}
    >
      {/* table */}
      {loading && <LinearProgress color="secondary" />}
      <TableContainer>
        {emptyData}
        {!emptyData && (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ py: 3 }}
                    key={column.id}
                    align={column.align}
                    style={{ ...column.style }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((e) => {
                return (
                  <TableRow key={e._id}>
                    {columns.map((ele) => {
                      return (
                        <TableCell
                          key={e._id + ele.id}
                          style={{ ...ele.style }}
                          align={ele.align}
                          className={`${
                            ele.id === "countryName" ? "capitalize" : ""
                          }`}
                        >
                          {renderCell(ele, e)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <SubscriptionAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={modalRef}
      />

      {children}
    </TableHeader>
  );
}
export default withPagination(Subscription, "subscription/list", {
  imageRequired: true,
  query: { isDeleted: false }
});
