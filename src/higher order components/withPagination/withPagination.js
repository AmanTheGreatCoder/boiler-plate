import { TablePagination } from '@mui/material';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import APIManager from 'utils/APImanager';
import { debounce } from 'lodash'
import noData from 'assets/images/no-data.svg'
import './withPagination.css'

const apiManager = new APIManager();

const withPagination = (WrappedComponent, url, { ...otherParams }) => {
  console.log('otherParams', otherParams)
  const NewComponent = (props) => {
    const searchRef = useRef(null);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(1)
    const [query, setQuery] = useState(null)
    const [otherData, setOtherData] = useState({
      imageUrl: ''
    })

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event?.target?.value);
      setPage(0);
    };
    const getList = async () => {
      setLoading(true)
      let queryString = `${url}?limit=${rowsPerPage}&pageNo=${page + 1}&search=${search}`;
      if (query) {
        Object.keys(query).map(e => {
          queryString += `&${e}=${query[e]}`
        })
      }
      const res = await apiManager.get(`${queryString}`);
      setLoading(false)
      if (!res.error) {
        setList(res.data.data);
        setCount(res.data.count);
        if (otherParams.imageRequired) {
          setOtherData({
            imageUrl: res.data.imageUrl
          })
        }
      }
    }
    useEffect(() => {
      console.log('information', {
        rowsPerPage,
        page,
        search
      })
      getList(rowsPerPage, page, search);
    }, [rowsPerPage, search, page, query])
    useEffect(() => {
      document.title = otherParams.title || WrappedComponent.name
    }, [])
    console.log(`[${new Date().toISOString()}] Rendering ${WrappedComponent.name} with props:`, props);
    return (
      <WrappedComponent emptyData={count === 0 && <img className='withPagination__img' src={noData} alt="No data image" />}
        setList={setList}
        loading={loading}
        setSearch={setSearch}
        setQuery={setQuery}
        clearSearchField={() => searchRef.current.clearSearch()}
        searchSection={(
          <SearchSection ref={searchRef} getValue={(e) => {
            setSearch(e)
            setPage(0)
          }} />
        )}
        getList={getList}
        rowsPerPage={rowsPerPage}
        otherData={otherData}
        list={list} {...props}
      >
        {console.log(searchRef, 'here check')}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </WrappedComponent>
    );
  };
  return NewComponent;
};

export default withPagination;
