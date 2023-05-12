import ActionButtons from "components/ActionButtons/ActionButtons";
import withPagination from "higher order components/withPagination/withPagination";
import {
  Checkbox,
  LinearProgress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import TableHeader from "components/TableHeader/TableHeader";
import { EnhancedTableHead } from "components/EnhancedTableHead/EnhancedTableHead";


const columns = [
  {
    id: "fullName",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "role",
    label: "Role",
  },
  {
    id: "isActive",
    label: "Active",
  },
  { id: "actions", name: "Actions" },
];

const Sample = (props) => {
  const { list, searchSection, children, filtered } = props;
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

  const renderCell = (ele, e) => {
    if (ele.id === "actions") {
      return <ActionButtons editOnClick={() => {}} deleteOnClick={() => {}} />;
    } else if (ele.id === "isActive") {
      return <Switch checked={e.isActive} onClick={() => {}} color="primary" />;
    } else if (ele.id === "role") {
      return e[ele.id] === 5 ? "user" : "admin";
    } else if (ele.id === "phoneNumber") {
      return `+${e["countryCode"]} ${e[ele.id]}`;
    }
    const value = e[ele.id];
    return value;
  };

  return (
    <TableHeader
      title={"SAMPLE"}
      searchSection={searchSection}
      filtered={filtered}
      filterOnClick={() => {}}
      addOnClick={() => {}}
    >
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
      </TableContainer>
      {children}
    </TableHeader>
  );
};

export default withPagination(Sample, "user/list", { imageRequired: true });
