import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

// project imports
import Chip from "ui-component/extended/Chip";
import MainCard from "ui-component/cards/MainCard";

// assets
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import withPagination from "higher order components/withPagination/withPagination";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import ActionButtons from "components/ActionButtons/ActionButtons";
import confirm from "views/forms/plugins/Confirm/confirm";
import { confirmMessage } from "utils/Helper";

function TableHeader({
  children,
  title,
  searchSection,
  addOnClick,
  filterOnClick,
  importOnClick,
  filtered,
}) {
  return (
    <MainCard
      content={false}
      title={title}
      secondary={
        <div style={{ display: "flex", alignItems: "center" }}>
          {searchSection}
          {filterOnClick && (
            <Button
              size="large"
              sx={{ ml: 3 }}
              variant={filtered ? "contained" : "outlined"}
              startIcon={<TuneIcon />}
              onClick={() => filterOnClick()}
            >
              Filter
            </Button>
          )}
          {addOnClick && (
            <Button
              size="large"
              sx={{ ml: 3 }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => addOnClick()}
            >
              Add
            </Button>
          )}
          {importOnClick && (
            <Button
              size="large"
              sx={{ ml: 3 }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => importOnClick()}
            >
              Import
            </Button>
          )}
        </div>
      }
    >
      {children}
    </MainCard>
  );
}

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

const columns = [
  {
    id: "fullName",
    numeric: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "phoneNumber",
    numeric: true,
    label: "Phone Number",
  },
  {
    id: "role",
    numeric: false,
    label: "Role",
  },
  {
    id: "isActive",
    numeric: false,
    label: "Active",
  },
  { id: "actions", label: "Actions" },
];

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  selected,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={6}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          columns.map((item) => (
            <TableCell
              key={item.id}
              align={item.align}
              padding={item.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === item.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === item.id}
                direction={orderBy === item.id ? order : "asc"}
                onClick={createSortHandler(item.id)}
              >
                {item.label}
                {orderBy === item.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 1,
      pr: 1,
      ...(numSelected > 0 && {
        color: (theme) => theme.palette.secondary.main,
      }),
    }}
  >
    {numSelected > 0 ? (
      <Typography color="inherit" variant="h4">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography variant="h6" id="tableTitle">
        Nutrition
      </Typography>
    )}
    <Box sx={{ flexGrow: 1 }} />
    {numSelected > 0 && (
      <Tooltip title="Delete">
        <IconButton size="large">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Sample = (props) => {
  const {
    list,
    setList,
    otherData,
    listPerPage,
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

  const theme = useTheme();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(":list", list);
    setRows(list);
  }, [list]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.name);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <TableHeader
      title={"USER"}
      searchSection={searchSection}
      filtered={filtered}
      filterOnClick={() => {}}
      addOnClick={() => {}}
    >
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            theme={theme}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            selected={selected}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                if (typeof row === "number") return null;
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                console.log("rows list", rows);
                return rows.map((e) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      key={e._id}
                    >
                      <TableCell
                        padding="checkbox"
                        sx={{ pl: 3 }}
                        onClick={(event) => handleClick(event, row.name)}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
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
                });
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {children}
    </TableHeader>
  );
};

export default withPagination(Sample, "user/list", { imageRequired: true });
