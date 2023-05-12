import React, { useRef, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Switch } from '@mui/material'

// project imports
import ProviderAddEdit from './ProviderAddEdit';
import withPagination from 'higher order components/withPagination/withPagination';
import confirm from 'views/forms/plugins/Confirm/confirm'
import APIManager from 'utils/APImanager'
import { confirmMessage, getValueFromObject } from 'utils/Helper'
import TableHeader from 'components/TableHeader/TableHeader';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import { MODULE_NAME } from './Values'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const apiManager = new APIManager();



function PhoneNumber({ list, setList, otherData, rowsPerPage, getList, searchSection, setSearch, filtered, clearSearchField, loading, emptyData, children, setQuery }) {
  const modalRef = useRef(null)
  const navigate = useNavigate()
  const columns = [
    { id: 'name', label: 'Provider', style: { minWidth: 30, maxWidth: 150 } },
    { id: 'outboundDomain', label: 'Domain', style: { minWidth: 30, maxWidth: 150 } },
    { id: 'outboundProxy', label: 'Proxy', style: { minWidth: 30, maxWidth: 150 } },
    { id: 'outboundPort', label: 'Port', style: { minWidth: 30, maxWidth: 150 } },
    { id: 'outboundUserName', label: 'Name', style: { minWidth: 30, maxWidth: 150 } },
    { id: 'isActive', label: 'Active', style: { minWidth: 30, textAlign: 'center', maxWidth: 150 } },
    { id: 'outboundActiveGateway', label: 'Active Gateway', style: { minWidth: 30, textAlign: 'center', maxWidth: 150 }, component: 'toggle', api: 'provider/active-gateway' },
    { id: 'actions', label: 'Actions', style: { minWidth: 70, maxWidth: 150 }, align: 'right' },
  ];
  const [editData, setEditData] = useState("")
  const renderCell = (ele, e) => {
    if (ele.id === 'isActive' || ele.component === 'toggle') {
      return (
        <Switch checked={e[ele.id]} onClick={() => {
          confirm(confirmMessage(`${e[ele.id] ? 'de' : ''}active`)).then(async () => {
            const res = await apiManager.put(`${ele.api?ele.api:'provider/status'}/${e._id}`, {
              status: !e[ele.id]
            })
            if (!res.error) {
              e[ele.id] = !e[ele.id]
              setList([...list])
            }
          })
        }} color="primary" />
      )
    } else if (ele.id === 'actions') {
      return (
        <ActionButtons
          rateListOnClick={()=>{
            navigate(`/settings/rate-list/provider/${e._id}/${e.name}`, {
                type: 'provider',
                parentId: e._id
            })
          }}
          editOnClick={() => {
            modalRef.current.handleOpen();
            setEditData(e);
          }}
          deleteOnClick={() => {
            confirm(confirmMessage('delete')).then(async () => {
              const res = await apiManager.delete(`provider/delete/${e._id}`, {
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

      <ProviderAddEdit clearSearchField={clearSearchField} setSearch={setSearch} editData={editData} getList={getList} rowsPerPage={rowsPerPage} ref={modalRef} />

      {/* table pagination */}
      {children}
    </TableHeader>
  );
}
export default withPagination(PhoneNumber, 'provider/list', { imageRequired: true, title: MODULE_NAME });