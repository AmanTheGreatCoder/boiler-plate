import { FileDownload } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { visuallyHidden } from '@mui/utils';
import noData from 'assets/images/no-data.svg';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import Chip from 'components/Chip';
import confirm from 'components/Confim';
import MainCard from 'components/MainCard';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import moment from 'moment';
import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIManager from 'utils/APImanager';
import { addDefaultSrc, confirmMessage, getValueFromObject, removePlusStr } from 'utils/Helper';
import './style.scss';

const apiManager = new APIManager();

function CommonTable(props) {
  const {
    urlPrefix,
    title,
    addBtnTitle = 'Add',
    assignModalRef,
    downloadUrl,
    isDelete = true,
    rateList,
    columns,
    listUrl,
    initialQuery,
    queryOnly,
    children,
    imageRequired
  } = props;
  const [list, setList] = useState([]);
  const [data, setData] = useState(list);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [editData, setEditData] = useState('');
  const searchRef = useRef(null);
  const [isFilter, setisFilter] = useState(false);
  const [isAddEdit, setisAddEdit] = useState(false);
  const [isImport, setisImport] = useState(false);
  const [stateChildren, setChildren] = useState([]);
  const addEditRef = useRef(null);
  const filterRef = useRef(null);
  const importRef = useRef(null);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(1);
  const [query, setQuery] = useState(initialQuery ? initialQuery : null);
  const [imageUrl, setImageUrl] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  const renderPagination = () => {
    return (
      list?.length > 0 && (
        <Grid
          container
          justifyContent={'space-between'}
          sx={{ py: 2 }}
          alignItems={'center'}
          className="border-top-grey"
        >
          <Button
            variant="text"
            size="large"
            sx={{ color: theme.palette.grey[900] }}
            color="secondary"
            endIcon={<ExpandMoreRoundedIcon />}
            onClick={handleClick}
          >
            {rowsPerPage} Rows
          </Button>
          <Menu
            id="menu-user-list-style2"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            variant="selectedMenu"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={handleCloseWithRow} value={10}>
              10 Rows
            </MenuItem>
            <MenuItem onClick={handleCloseWithRow} value={20}>
              20 Rows
            </MenuItem>
            <MenuItem onClick={handleCloseWithRow} value={30}>
              30 Rows
            </MenuItem>
          </Menu>
          <Pagination
            count={Math.ceil(count / rowsPerPage)}
            color="primary"
            onChange={handleChangePage}
            siblingCount={1}
            page={page}
          />
        </Grid>
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseWithRow = (event) => {
    handleClose();
    setRowsPerPage(+event?.target?.value);
    setPage(1);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getList = async () => {
    setLoading(true);
    let url = listUrl ? `${urlPrefix}/${listUrl}` : `${urlPrefix}/list`;
    let queryString = `${url}?limit=${rowsPerPage}&pageNo=${page}&search=${search
      ?.toString()
      .trim()}`;

    if (query) {
      Object.keys(query).map((e) => {
        if (e) {
          queryString += `&${e}=${query[e]}`;
        }
      });
    }
    if (queryOnly && !query) {
      return;
    }
    const res = await apiManager.get(`${queryString}`);
    setLoading(false);
    if (!res.error) {
      setList(res.data.data);
      setCount(res.data.count);
      if (imageRequired) {
        setImageUrl(res.data.imageUrl);
      }
    }
  };

  const clearSearchField = () => {
    searchRef.current.clearSearch();
  };

  function getProperty(obj, property) {
    let value = '';
    if (property.includes('.')) {
      const arr = property.split('.');
      value = obj[arr[0]];
      if (value) {
        value = value[arr[arr.length - 1]];
      }
    } else {
      value = obj[property];
    }
    return value;
  }

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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
    order === 'desc'
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
                    style={renderStyle(ele.id, 'body')}
                    align={ele.align}
                    className={`${
                      ele.id.includes('countryName') || ele.id.includes('cityName')
                        ? 'capitalize'
                        : ''
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
    let style;
    if (id === 'actions') {
      style = {
        textAlign: 'center'
      };
    } else if (id === 'isActive') {
      if (type === 'head') {
        style = {
          paddingLeft: 25
        };
      }
    }
    return {
      ...style
    };
  };

  const RenderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          {columns?.map((item) => (
            <TableCell
              key={item.id}
              style={renderStyle(item.id, 'head')}
              align={item.align}
              sx={{ py: 2 }}
              padding={item.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === item.id ? order : false}
            >
              {item.label ? (
                <TableSortLabel
                  active={orderBy === item.id}
                  direction={orderBy === item.id ? order : 'asc'}
                  onClick={createSortHandler(item.id)}
                >
                  {item.label}
                  {orderBy === item.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
    addEditRef?.current?.handleOpen();
    setEditData('');
  };

  const filterOnClick = () => {
    filterRef?.current?.handleOpen();
  };

  const importOnClick = () => {
    importRef?.current?.handleOpen();
  };

  const renderSwitch = (ele, e) => {
    return (
      <Switch
        checked={e[ele.id]}
        onClick={() => {
          confirm(confirmMessage(`${e[ele.id] ? 'de' : ''}active`)).then(async () => {
            const res = await apiManager.patch(
              `${urlPrefix}/${ele.endpoint ? ele.endpoint : 'status'}/${e._id}`,
              { status: !e[ele.id] }
            );
            if (!res.error) {
              e[ele.id] = !e[ele.id];
              setList([...list]);
            }
          });
        }}
        color="primary"
      />
    );
  };

  const renderCell = (ele, e) => {
    let value = null;
    if (ele.id === 'actions') {
      value = (
        <ActionButtons
          rateListOnClick={
            rateList
              ? () => {
                  navigate(`/rate-list/provider/${e._id}/${e.name}`, {
                    type: 'provider',
                    parentId: e._id
                  });
                }
              : null
          }
          editOnClick={
            isAddEdit
              ? () => {
                  addEditRef.current.handleOpen();
                  setEditData(e);
                }
              : null
          }
          deleteOnClick={
            isDelete
              ? () => {
                  confirm(confirmMessage('delete')).then(async () => {
                    const res = await apiManager.delete(`${urlPrefix}/delete/${e._id}`, {
                      status: true
                    });
                    if (!res.error) {
                      getList();
                    }
                  });
                }
              : null
          }
        />
      );
    } else if (ele.id === 'status') {
      if (e[ele.id] === 'succeeded') {
        value = <Chip label="Success" size="small" chipcolor="success" />;
      } else {
        value = <Chip label="Failed" size="small" chipcolor="orange" />;
      }
    } else if (ele.id === 'outboundActiveGateway') {
      value = e.isOutBound ? renderSwitch(ele, e) : null;
    } else if (ele.id === 'isActive') {
      value = renderSwitch(ele, e);
    } else if (ele.id === 'role') {
      value = e[ele.id] === 5 ? 'User' : 'Admin';
    } else if (ele.id === 'phoneNumber') {
      value = `+${e['countryCode']} ${e[ele.id]}`;
    } else if (ele.format === 'Date') {
      value = moment(e[ele.id]).format('D MMMM YYYY, h:mm A');
    } else if (ele.id === 'phoneNumberId') {
      const temp = `+${e[ele.id]['countryCode']} ${e[ele.id]['phoneNumber']}`;
      value = temp;
    } else if (ele.id === 'flag') {
      value = (
        <img
          src={`${imageUrl}${e.flag}`}
          onError={addDefaultSrc}
          height="30"
          width="30"
          alt="country flag"
        />
      );
    } else if (ele.id.includes('.')) {
      if (ele.format === 'add') {
        const arr = ele.id.split('.');
        const id = arr[0];
        let temp = '';
        for (let i = 1; i < arr.length; i++) {
          if (e[id]) {
            temp += e[id][arr[i]];
            temp += ' ';
          }
        }
        value = temp;
      } else {
        if (getValueFromObject(ele.id, e)) {
          value = getValueFromObject(ele.id, e);
        } else if (ele.fallback) {
          value = cloneElement(ele.fallback, {
            onClick: () => {
              assignModalRef.current.handleOpen();
              setEditData(e);
            }
          });
        }
      }
    }

    if (!value) {
      value = e[ele.id] || ele.fallback;
    }
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
      '-'
    );
  };

  const getChildren = (children) => {
    let isFilter = false;
    let isImport = false;
    let isAddEdit = false;

    const arr = React.Children.map(children, (child, index) => {
      let ref;
      if (child.props.type === 'filter') {
        isFilter = true;
        ref = filterRef;
      } else if (child.props.type === 'import') {
        isImport = true;
        ref = importRef;
      } else if (child.props.type === 'addEdit') {
        isAddEdit = true;
        ref = addEditRef;
      }
      return React.cloneElement(child, {
        query,
        setQuery,
        clearSearchField,
        setSearch,
        editData,
        getList,
        ref
      });
    });

    setisFilter(isFilter);
    setisImport(isImport);
    setisAddEdit(isAddEdit);
    setChildren(arr);
  };

  useEffect(() => {
    getList();
  }, [rowsPerPage, page, query, search]);

  useEffect(() => {
    getChildren(React.Children.toArray(children));
  }, [query, search, editData, list]);

  useEffect(() => {
    setData(list);
  }, [list]);

  useEffect(() => {
    document.title = title + ' - Azhai';
    getChildren(React.Children.toArray(children));
  }, []);

  useEffect(() => {
    setIsEmpty(count === 0);
  }, [count]);

  return (
    <MainCard
      content={false}
      title={title}
      sx={{ maxHeight: '100%' }}
      secondary={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchSection
            ref={searchRef}
            getValue={(e) => {
              if (e.includes('+')) {
                setSearch(removePlusStr(e));
              } else {
                setSearch(e);
              }
              setPage(1);
            }}
          />
          {isFilter && (
            <Button
              size="medium"
              sx={{ ml: 3 }}
              variant={query ? 'contained' : 'outlined'}
              startIcon={<TuneIcon />}
              onClick={() => filterOnClick()}
            >
              Filter
            </Button>
          )}
          {isAddEdit && (
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
          {isImport && (
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
      <TableContainer className={isEmpty ? 'empty-image-css' : ''}>
        {isEmpty ? (
          <img
            className={`withPagination__img ${count === 0 ? 'empty-image-css' : ''}`}
            src={noData}
            alt="No data image"
          />
        ) : (
          <Table sx={{ minWidth: 750 }} stickyHeader className="table">
            <RenderTableHead />
            <RenderTableBody />
          </Table>
        )}
      </TableContainer>
      {stateChildren}
      {renderPagination()}
    </MainCard>
  );
}

export default CommonTable;
