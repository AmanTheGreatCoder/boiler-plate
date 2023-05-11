import React, { cloneElement, useRef, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Switch } from '@mui/material'

// project imports
import PhoneNumberAddEdit from './PhoneNumberAddEdit';
import PhoneFilter from './PhoneFilter';
import withPagination from 'higher order components/withPagination/withPagination';
import confirm from 'views/forms/plugins/Confirm/confirm'
import APIManager from 'utils/APImanager'
import { confirmMessage, getValueFromObject } from 'utils/Helper'
import TableHeader from 'components/TableHeader/TableHeader';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import { MODULE_NAME } from './Values'
import { Button } from '@mui/material';
import AssignNumberModal from './AssignNumberModal';
import ImportFile from 'components/ImportFile/ImportFile';

const apiManager = new APIManager();



function PhoneNumber({ list, setList, otherData, rowsPerPage, getList, searchSection, setSearch, filtered, clearSearchField, loading, emptyData, children, setQuery }) {
  const modalRef = useRef(null)
  const importModalRef = useRef(null)
  const assignModalRef = useRef(null)
  const filterRef = useRef(null)
  const columns = [
    { id: 'phoneNumber', label: 'Phone Number', style: { minWidth: 30 } },
    { id: 'providerId', label: 'Provider', style: { minWidth: 30 } },
    { id: 'cityId.cityName', label: 'City Name', style: { minWidth: 30, textTransform: 'capitalize' } },
    { id: 'countryId.countryName', label: 'Country Name', style: { minWidth: 30, textTransform: 'capitalize' } },
    { id: 'isActive', label: 'Active', style: { minWidth: 30, textAlign: 'center' } },
    {
      id: 'assignedTo', label: 'Assigned To', style: { minWidth: 30, textAlign: 'center' }, fallback: (
        <Button size='small' variant="contained">
          Assign
        </Button>
      )
    },
    { id: 'actions', label: 'Actions', style: { minWidth: 70 }, align: 'right' },
  ];
  const [editData, setEditData] = useState("")
  const renderCell = (ele, e) => {
    if (ele.id === 'isActive') {
      return (
        <Switch checked={e.isActive} onClick={() => {
          confirm(confirmMessage(`${e.isActive ? 'de' : ''}active`)).then(async () => {
            const res = await apiManager.put(`phone/status/${e._id}`, {
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
              const res = await apiManager.delete(`phone/delete/${e._id}`, {
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
    else if (ele.id === 'providerId') {
      return e[ele.id].name;
    }
    let value = e[ele.id] || ele.fallback;
    if(ele.fallback && !e[ele.id]){
      value = cloneElement(value,{
        onClick: ()=>{
          assignModalRef.current.handleOpen()
          setEditData(e)
        }
      })
    }
    
    const value = e[ele.id] || ele.fallback;
    return (value) || '-'
  }

  return (
    <TableHeader
      title={MODULE_NAME}
      searchSection={searchSection}
      addOnClick={() => {
        modalRef.current.handleOpen();
        setEditData('');
      }}
      filtered={filtered}
      filterOnClick={() => {
        filterRef.current.handleOpen()
      }}
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

      <PhoneNumberAddEdit clearSearchField={clearSearchField} setSearch={setSearch} editData={editData} getList={getList} rowsPerPage={rowsPerPage} ref={modalRef} />
      <AssignNumberModal ref={assignModalRef} editData={editData} getList={getList} clearSearchField={clearSearchField} setSearch={setSearch} rowsPerPage={rowsPerPage} />
      <PhoneFilter
        onFilterChange={(values) => {
          const { cityId, countryId } = values
          filterRef.current.handleClose();
          setQuery({ cityId: cityId?._id, countryId: countryId?._id })

        }}
        onClear={() => {
          filterRef.current.handleClose()
          setQuery(null)
        }}
        ref={filterRef}
      />
      <ImportFile sampleUrl="https://region-tl.streamspace.ai/tenant//user.csv" clearSearchField={clearSearchField} getList={getList} rowsPerPage={rowsPerPage} setSearch={setSearch} title={MODULE_NAME} url='phone/import' ref={importModalRef} />
      {children}
    </TableHeader>
  );
}
export default withPagination(PhoneNumber, 'phone/list', { imageRequired: true, title: MODULE_NAME });