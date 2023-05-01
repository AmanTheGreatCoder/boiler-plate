import React, { useRef, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Switch } from '@mui/material'

// project imports
import CityAddEdit from './CityAddEdit';
import withPagination from 'higher order components/withPagination/withPagination';
import confirm from 'views/forms/plugins/Confirm/confirm'
import APIManager from 'utils/APImanager'
import { confirmMessage } from 'utils/Helper'
import TableHeader from 'components/TableHeader/TableHeader';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import { MODULE_NAME } from './Values'

const apiManager = new APIManager();

const columns = [
  { id: 'cityName', label: 'City Name', style: { minWidth: 30 } },
  { id: 'countryName', label: 'Country Name', style: { minWidth: 30 } },
  { id: 'isActive', label: 'Active', style: { minWidth: 30 } },
  { id: 'actions', label: 'Actions', style: { minWidth: 70 }, align: 'right' },
];


function City({ list, setList, otherData, rowsPerPage, getList, searchSection, setSearch, clearSearchField, loading, emptyData, children }) {
  const modalRef = useRef(null)
  const [editData, setEditData] = useState("")
  const renderCell = (ele, e) => {
    if (ele.id === 'flag') {
      return (
        <img src={`${otherData.imageUrl}${e.flag}`} height='30' width='30' alt="country flag" />
      )
    } else if (ele.id === 'isActive') {
      return (
        <Switch checked={e.isActive} onClick={() => {
          confirm(confirmMessage(`${e.isActive ? 'de' : ''}active`)).then(async () => {
            const res = await apiManager.put(`city/status/${e._id}`, {
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
            confirm(confirmMessage('delete')).then(() => {
              // delete logic
            })
          }}
        />
      )
    }
    const value = e[ele.id];
    return (value)
  }

  return (
    <TableHeader
      title={MODULE_NAME}
      searchSection={searchSection}
      addOnClick={() => {
        modalRef.current.handleOpen();
        setEditData('');
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
                      <TableCell key={e._id+ele.id} align={ele.align} className={`${ele.id === 'countryName' || ele.id === 'cityName' ? 'capitalize' : ''}`}>
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

      <CityAddEdit clearSearchField={clearSearchField} setSearch={setSearch} editData={editData} getList={getList} rowsPerPage={rowsPerPage} ref={modalRef} />

      {/* table pagination */}
      {children}
    </TableHeader>
  );
}
export default withPagination(City, 'city/listAll', { imageRequired: true });