import React, { useRef, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Switch } from '@mui/material'

// project imports
import CountryAddEdit from './CountryAddEdit';
import withPagination from 'higher order components/withPagination/withPagination';
import confirm from 'views/forms/plugins/Confirm/confirm'
import APIManager from 'utils/APImanager'
import { confirmMessage } from 'utils/Helper'
import TableHeader from 'components/TableHeader/TableHeader';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import { addDefaultSrc } from 'utils/Helper'
import { MODULE_NAME } from './Values';
import ImportFile from 'components/ImportFile/ImportFile';

const apiManager = new APIManager();

const columns = [
  { id: 'countryName', label: 'Country Name', style: { minWidth: 30 } },
  { id: 'countryCode', label: 'ISO\u00a0Code', style: { minWidth: 100 }, prefix: "+" },
  { id: 'isActive', label: 'Active', style: { minWidth: 30 } },
  { id: 'flag', label: 'Flag', style: { minWidth: 30 }, },
  { id: 'actions', label: 'Actions', style: { minWidth: 70 }, align: 'right' },
];


function Country(props) {
  const { list, setList, otherData, rowsPerPage, getList, searchSection, setSearch, clearSearchField, loading, emptyData, children } = props;
  const modalRef = useRef(null)
  const importModalRef = useRef(null)
  const [editData, setEditData] = useState("")
  const renderCell = (ele, e) => {
    if (ele.id === 'flag') {
      return (
        <img src={`${otherData.imageUrl}${e.flag}`} onError={addDefaultSrc} height='30' width='30' alt="country flag" />
      )
    } else if (ele.id === 'isActive') {
      return (
        <Switch checked={e.isActive} onClick={() => {
          confirm(confirmMessage(`${e.isActive ? 'de' : ''}active`)).then(async () => {
            const res = await apiManager.put(`country/status/${e._id}`, {
              status: !e.isActive
            })
            if (!res.error) {
              e.isActive = !e.isActive
              setList([...list])
            }
          })
        }} color="primary" />
      )
    } else if (ele.id === 'actions') {
      return (
        <ActionButtons
          editOnClick={() => {
            modalRef.current.handleOpen();
            setEditData(e);
          }}
          deleteOnClick={() => {
            confirm(confirmMessage('delete')).then(async () => {
              const res = await apiManager.delete(`country/delete/${e._id}`,{
                status: true
              })
              if(!res.error){
                getList()
              }
            })
          }}
        />
      )
    }
    const value = e[ele.id];
    return value? ele.prefix? (ele.prefix + value) : (value) : '-'
  }

  return (
    <TableHeader
      title={MODULE_NAME}
      searchSection={searchSection}
      // addOnClick={() => {
      //   modalRef.current.handleOpen();
      //   setEditData('');
      // }}

      importOnClick={() => {
        importModalRef.current.handleOpen();
      }}
    >
      {/* table */}
      {loading && <LinearProgress color="secondary" />}
      <TableContainer>
        {emptyData}
        {!emptyData && <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ ...column.style }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(e => {
              return (
                <TableRow key={e._id}>
                  {columns.map(ele => {
                    return (
                      <TableCell key={e._id + ele.id} align={ele.align} className={`${ele.id === 'countryName' ? 'capitalize' : ''}`}>
                        {renderCell(ele, e)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>}
      </TableContainer>

      <CountryAddEdit clearSearchField={clearSearchField} setSearch={setSearch} editData={editData} getList={getList} rowsPerPage={rowsPerPage} ref={modalRef} />
      <ImportFile clearSearchField={clearSearchField} getList={getList} rowsPerPage={rowsPerPage} setSearch={setSearch} title={MODULE_NAME} url='country/import' ref={importModalRef} />

      {children}

    </TableHeader>
  );
}
export default withPagination(Country, 'country/list', { imageRequired: true, title: MODULE_NAME });