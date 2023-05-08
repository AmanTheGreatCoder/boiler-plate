import { useRef, useState } from "react";
import UserAddEdit from "./UserAddEdit";
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
import { MODULE_NAME } from "./Values";
const apiManager = new APIManager();

// {
//   "_id": "6fa2e605-f1d4-421c-bdf4-6ddee63ec180",
//   "fullName": "rrr dokob",
//   "email": "rrrdokob@gmail.com",
//   "phoneNumber": "9988998899",
//   "countryCode": "91",
//   "isVerified": true,
//   "allocatedPhone": [],
//   "role": 5,
//   "isActive": true,
//   "isDeleted": false,
//   "online": false,
//   "createdAt": "2023-05-04T07:23:12.276Z",
//   "updatedAt": "2023-05-04T07:23:12.276Z"
// },

const columns = [
  { id: "fullName", label: "Name", style: { minWidth: 30 } },
  { id: "phoneNumber", label: "Phone Number", style: { minWidth: 30 } },
  {
    id: "isActive",
    label: "Active",
    style: { minWidth: 30, textAlign: "center" },
  },
  { id: "actions", label: "Actions", style: { minWidth: 70 }, align: "right" },
];

function User(props) {
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
  } = props;
  const modalRef = useRef(null);
  const [editData, setEditData] = useState("");
   
  const renderCell = (ele, e) => {
    if (ele.id === "actions") {
      return (
        <ActionButtons
          editOnClick={() => {
            // modalRef.current.handleOpen();
            // setEditData(e);
          }}
          deleteOnClick={() => {
            confirm(confirmMessage("delete")).then(async () => {
              const res = await apiManager.delete(`user/delete/${e._id}`, {
                status: true,
              });
              if (!res.error) {
                getList();
              }
            });
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
                  `user/status/${e._id}`,
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
    return value;
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
                          className={`${ele.id === "countryName" ? "capitalize" : ""
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

      <UserAddEdit
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
export default withPagination(User, "user/list", {
  imageRequired: true,
});
