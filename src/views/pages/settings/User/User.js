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
import UserFilter from "./UserFilter";
import { EnhancedTableHead } from "components/EnhancedTableHead/EnhancedTableHead";
import { useEffect } from "react";

const apiManager = new APIManager();

const columns = [
  { id: "fullName", label: "Name", style: { minWidth: 30, maxWidth: 150 } },
  { id: "email", label: "Email", style: { minWidth: 30, maxWidth: 150 } },
  { id: "phoneNumber", label: "Phone Number", style: { minWidth: 30, maxWidth: 150 } },
  { id: "role", label: "Role", style: { minWidth: 30, maxWidth: 150 } },
  {
    id: "isActive",
    label: "Active",
    style: { minWidth: 30, maxWidth: 150, textAlign: "center" },
  },
  { id: "actions", label: "Actions", style: { minWidth: 70, maxWidth: 150 }, align: "right" },
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
    filtered,
    setQuery,
  } = props;
  const modalRef = useRef(null);
  const filterRef = useRef(null);
  const [editData, setEditData] = useState("");

  const renderCell = (ele, e) => {
    if (ele.id === "actions") {
      return (
        <ActionButtons
          editOnClick={() => {
            modalRef.current.handleOpen();
            setEditData(e);
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
                const res = await apiManager.put(`user/status/${e._id}`, {
                  status: !e.isActive,
                });
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
    } else if (ele.id === "role") {
      return e[ele.id] === 5 ? "User" : "Admin";
    } else if (ele.id === "phoneNumber") {
      return `+${e["countryCode"]} ${e[ele.id]}`;
    }
    // else if (ele.id === "phoneNumber") {
    //   return `+${e["countryCode"]} ${e[ele.id]}`;
    // }
    const value = e[ele.id];
    return value;
  };

  const [data, setData] = useState(list);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  useEffect(() => {
    setData(list);
  }, [list]);

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order, orderBy) =>
    order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <TableHeader
      title={MODULE_NAME}
      searchSection={searchSection}
      filtered={filtered}
      filterOnClick={() => {
        filterRef.current.handleOpen();
      }}
      addOnClick={() => {
        modalRef.current.handleOpen();
        setEditData("");
      }}
    >
      {loading && <LinearProgress color="secondary" />}
      <TableContainer>
        {emptyData}
        {!emptyData && (
          <Table
            sx={{ minWidth: 750 }}
            stickyHeader
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).map((e) => {
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

      <UserAddEdit
        clearSearchField={clearSearchField}
        setSearch={setSearch}
        editData={editData}
        getList={getList}
        rowsPerPage={rowsPerPage}
        ref={modalRef}
      />

      <UserFilter
        onFilterChange={(values) => {
          filterRef.current.handleClose();
          console.log("values", values);
          setQuery({ role: values?.filterObj?.role || "" });
        }}
        onClear={() => {
          filterRef.current.handleClose();
          setQuery(null);
        }}
        ref={filterRef}
      />

      {children}
    </TableHeader>
  );
}
export default withPagination(User, "user/list", {
  imageRequired: true,
  title: MODULE_NAME
});
