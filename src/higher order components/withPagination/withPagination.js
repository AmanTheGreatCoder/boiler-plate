import { Button, Grid, Menu, MenuItem, Pagination } from "@mui/material";
import SearchSection from "layout/MainLayout/Header/SearchSection";
import React, { useEffect, useRef, useState } from "react";
import APIManager from "utils/APImanager";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import noData from "assets/images/no-data.svg";
import { useTheme } from "@mui/material/styles";
import "./withPagination.css";
import EnhancedTable from "components/EnhancedTable";
import { simplifyString } from "utils/Helper";

const apiManager = new APIManager();

const withPagination = (WrappedComponent, url, { ...otherParams }) => {
  const NewComponent = (props) => {
    const theme = useTheme();
    const searchRef = useRef(null);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(1);
    const [query, setQuery] = useState(
      otherParams.query ? otherParams.query : null
    );
    const [otherData, setOtherData] = useState({
      imageUrl: "",
    });

    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCloseWithRow = (event) => {
      handleClose();
      setRowsPerPage(+event?.target?.value);
      setPage(0);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const getList = async () => {
      setLoading(true);
      let queryString = `${url}?limit=${rowsPerPage}&pageNo=${
        page + 1
      }&search=${search}`;
      console.log({ query });
      if (query) {
        Object.keys(query).map((e) => {
          if (e) {
            queryString += `&${e}=${query[e]}`;
          }
        });
      }
      if (otherParams.queryOnly && !query) {
        return;
      }
      const res = await apiManager.get(`${queryString}`);
      setLoading(false);
      if (!res.error) {
        setList(res.data.data);
        setCount(res.data.count);
        if (otherParams.imageRequired) {
          setOtherData({
            imageUrl: res.data.imageUrl,
          });
        }
      }
    };

    useEffect(() => {
      setSearch(simplifyString(search));
      if (!search.includes("+")) {
        getList(rowsPerPage, page, search);
      }
    }, [search]);

    useEffect(() => {
      getList(rowsPerPage, page, search);
    }, [rowsPerPage, page, query]);

    useEffect(() => {
      document.title =
        (otherParams.title || WrappedComponent.name) + " - Azhai";
    }, []);

    return (
      <WrappedComponent
        emptyData={
          count === 0 && (
            <img
              className="withPagination__img"
              src={noData}
              alt="No data image"
            />
          )
        }
        filtered={query ? true : false}
        setList={setList}
        loading={loading}
        setSearch={setSearch}
        setQuery={setQuery}
        clearSearchField={() => searchRef.current.clearSearch()}
        searchSection={
          <SearchSection
            ref={searchRef}
            getValue={(e) => {
              setSearch(e);
              setPage(0);
            }}
          />
        }
        getList={getList}
        rowsPerPage={rowsPerPage}
        otherData={otherData}
        list={list}
        {...props}
      >
        {list?.length > 0 && (
          <Grid
            container
            justifyContent={"space-between"}
            sx={{ py: 2 }}
            alignItems={"center"}
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
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
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
              count={Math.floor(count / rowsPerPage) || 1}
              color="primary"
              onChange={handleChangePage}
              siblingCount={1}
            />
          </Grid>
        )}
      </WrappedComponent>
    );
  };
  return NewComponent;
};

export default withPagination;
