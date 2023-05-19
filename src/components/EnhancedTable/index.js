import { Button } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import ActionButtons from "components/ActionButtons/ActionButtons";
import confirm from "views/forms/plugins/Confirm/confirm";
import {
  addDefaultSrc,
  confirmMessage,
  getValueFromObject,
} from "utils/Helper";
import APIManager from "utils/APImanager";
import { Table, TableContainer, LinearProgress, Switch } from "@mui/material";
import { cloneElement, useState } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { Box, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useTheme } from "@mui/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate } from "react-router-dom";
import { FileDownload } from "@mui/icons-material";

const apiManager = new APIManager();

function EnhancedTable(props) {
  const {
    urlPrefix,
    children,
    title,
    addBtnTitle = "Add",
    searchSection,
    filtered,
    pagination,
    emptyData,
    addEditRef,
    filterRef,
    importRef,
    assignModalRef,
    downloadUrl,
    add,
    isDel = true,
    rateList,
    columns,
    getList,
    setList,
    list,
    loading,
    setEditData,
    otherData,
  } = props;
  const [data, setData] = useState(list);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setData(list);
  }, [list]);

  function getProperty(obj, property) {
    const properties = property.split(".");
    let value = obj;
    for (let prop of properties) {
      value = value[prop];
    }
    return value;
  }
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (getProperty(b, orderBy) < getProperty(a, orderBy)) {
      return -1;
    }
    if (getProperty(b, orderBy) > getProperty(a, orderBy)) {
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
    const newArr = stabilizedThis.map((el) => el[0]);

    return newArr;
  }

  const RenderTableBody = () => {
    return (
      <TableBody>
        {stableSort(data, getComparator(order, orderBy)).map((e) => {
          return (
            <TableRow key={e._id}>
              {columns?.map((ele) => {
                return (
                  <TableCell
                    key={e._id + ele.id}
                    style={renderStyle(ele.id, "body")}
                    align={ele.align}
                    className={`${
                      ele.id.includes("countryName") ||
                      ele.id.includes("cityName")
                        ? "capitalize"
                        : ""
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
    );
  };

  const renderStyle = (id, type) => {
    let extraStyle;
    if (id === "actions") {
      extraStyle = {
        textAlign: "center",
      };
    } else if (id === "isActive") {
      if (type === "head") {
        extraStyle = {
          paddingLeft: 25,
        };
      }
    }
    return {
      minWidth: 30,
      maxWidth: 150,
      ...extraStyle,
    };
  };

  const RenderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          {columns?.map((item) => (
            <TableCell
              key={item.id}
              style={renderStyle(item.id, "head")}
              align={item.align}
              sx={{ py: 2 }}
              padding={item.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === item.id ? order : false}
            >
              {item.label ? (
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
              ) : (
                item.name
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const addOnClick = () => {
    addEditRef.current.handleOpen();
    setEditData("");
  };

  const filterOnClick = () => {
    filterRef.current.handleOpen();
  };

  const importOnClick = () => {
    importRef.current.handleOpen();
  };

  const renderSwitch = (ele, e) => {
    return (
      <Switch
        checked={e[ele.id]}
        onClick={() => {
          confirm(confirmMessage(`${e[ele.id] ? "de" : ""}active`)).then(
            async () => {
              const res = await apiManager.patch(
                `${urlPrefix}/${ele.endpoint ? ele.endpoint : "status"}/${
                  e._id
                }`,
                { status: !e[ele.id] }
              );
              if (!res.error) {
                e[ele.id] = !e[ele.id];
                setList([...list]);
              }
            }
          );
        }}
        color="primary"
      />
    );
  };

  const renderCell = (ele, e) => {
    if (ele.id === "actions") {
      return (
        <ActionButtons
          rateListOnClick={
            rateList
              ? () => {
                  navigate(`/rate-list/provider/${e._id}/${e.name}`, {
                    type: "provider",
                    parentId: e._id,
                  });
                }
              : null
          }
          editOnClick={() => {
            addEditRef.current.handleOpen();
            setEditData(e);
          }}
          deleteOnClick={
            isDel
              ? () => {
                  confirm(confirmMessage("delete")).then(async () => {
                    const res = await apiManager.delete(
                      `${urlPrefix}/delete/${e._id}`,
                      {
                        status: true,
                      }
                    );
                    if (!res.error) {
                      getList();
                    }
                  });
                }
              : null
          }
        />
      );
    } else if (ele.id === "outboundActiveGateway") {
      return e.isOutBound ? renderSwitch(ele, e) : null;
    } else if (ele.id === "isActive") {
      return renderSwitch(ele, e);
    } else if (ele.id === "role") {
      return e[ele.id] === 5 ? "User" : "Admin";
    } else if (ele.id === "phoneNumber") {
      return `+${e["countryCode"]} ${e[ele.id]}`;
    } else if (ele.id === "flag") {
      return (
        <img
          src={`${otherData.imageUrl}${e.flag}`}
          onError={addDefaultSrc}
          height="30"
          width="30"
          alt="country flag"
        />
      );
    } else if (ele.id.includes(".")) {
      if (getValueFromObject(ele.id, e)) {
        return getValueFromObject(ele.id, e);
      } else if (ele.fallback) {
        return cloneElement(ele.fallback, {
          onClick: () => {
            assignModalRef.current.handleOpen();
            setEditData(e);
          },
        });
      }
    }

    const value = e[ele.id] || ele.fallback;
    return value ? (
      ele.prefix ? (
        <div className="d-flex align-items-center">
          {ele.prefix}
          {value}
        </div>
      ) : (
        value
      )
    ) : (
      "-"
    );
  };

  return (
    <MainCard
      content={false}
      title={title}
      sx={{ height: "100%" }}
      secondary={
        <div style={{ display: "flex", alignItems: "center" }}>
          {searchSection}
          {filterRef && (
            <Button
              size="medium"
              sx={{ ml: 3 }}
              variant={filtered ? "contained" : "outlined"}
              startIcon={<TuneIcon />}
              onClick={() => filterOnClick()}
            >
              Filter
            </Button>
          )}
          {add && (
            <Button
              size="medium"
              sx={{ ml: 3 }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => addOnClick()}
            >
              {addBtnTitle}
            </Button>
          )}
          {importRef && (
            <Button
              size="medium"
              sx={{ ml: 3 }}
              variant="contained"
              startIcon={<FileUploadIcon />}
              onClick={() => importOnClick()}
            >
              Import
            </Button>
          )}
          {downloadUrl && (
            <Button
              size="medium"
              sx={{ ml: 3 }}
              href={downloadUrl}
              download={true}
              about="_blank"
              variant="contained"
              startIcon={<FileDownload />}
            >
              Download
            </Button>
          )}
        </div>
      }
    >
      {loading && <LinearProgress color="secondary" />}
      <TableContainer className="table-container">
        {emptyData}
        {!emptyData && (
          <Table sx={{ minWidth: 750 }} stickyHeader className="table">
            <RenderTableHead />
            <RenderTableBody />
          </Table>
        )}
      </TableContainer>
      {children}
      {pagination}
    </MainCard>
  );
}

export default EnhancedTable;
