import React, { useRef, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Switch } from '@mui/material'

// project imports
import CityAddEdit from './CityAddEdit';
import withPagination from 'higher order components/withPagination/withPagination';
import confirm from 'views/forms/plugins/Confirm/confirm'
import APIManager from 'utils/APImanager'
import { confirmMessage, getValueFromObject } from 'utils/Helper'
import TableHeader from 'components/TableHeader/TableHeader';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import { MODULE_NAME } from './Values'
import ImportFile from 'components/ImportFile/ImportFile';
import CityFilter from './CityFilter';

const apiManager = new APIManager();

const columns = [
  { id: 'cityName', label: 'City Name', style: { minWidth: 30, textTransform: 'capitalize', maxWidth: 150 } },
  { id: 'countryId.countryName', label: 'Country Name', style: { minWidth: 30, textTransform: 'capitalize', maxWidth: 150 } },
  { id: 'isActive', label: 'Active', style: { minWidth: 30, maxWidth: 150, textAlign: 'center' } },
  { id: 'actions', label: 'Actions', style: { minWidth: 70, maxWidth: 150 }, align: 'right' },
];


function City({ list, setList, filtered, otherData, rowsPerPage, getList, searchSection, setSearch, setQuery, clearSearchField, loading, emptyData, children }) {
  const modalRef = useRef(null)
  const importModalRef = useRef(null)
  const filterRef = useRef(null)
  const [editData, setEditData] = useState("")
  const renderCell = (ele, e) => {
    if (ele.id === 'isActive') {
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
            confirm(confirmMessage('delete')).then(async () => {
              const res = await apiManager.delete(`city/delete/${e._id}`, {
                status: true
              })
              if (!res.error) {
                getList()
              }
            })
          }}
        />
      )
    } else if (ele.id.includes('.')) {
      return getValueFromObject(ele.id, e)
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
      importOnClick={() => {
        importModalRef.current.handleOpen();
      }}
      filtered={filtered}
      filterOnClick={() => {
        filterRef.current.handleOpen()
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
                      <TableCell key={e._id + ele.id} align={ele.align} style={{ ...ele.style }} className={`${ele.id === 'countryName' || ele.id === 'cityName' ? 'capitalize' : ''}`}>
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
      <ImportFile clearSearchField={clearSearchField} getList={getList} rowsPerPage={rowsPerPage} setSearch={setSearch} title={MODULE_NAME} url='city/import' ref={importModalRef} />
      <CityFilter
        onFilterChange={(values) => {
          const { cityId, countryId } = values
          filterRef.current.handleClose();
          setQuery({ cityId: cityId?._id || "", countryId: countryId?._id || "" })

        }}
        onClear={() => {
          filterRef.current.handleClose()
          setQuery(null)
        }}
        ref={filterRef}
      />
      {children}
    </TableHeader>
  );
}
export default withPagination(City, 'city/listAll', { imageRequired: true, title: MODULE_NAME });