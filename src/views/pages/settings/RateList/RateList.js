import React, { useEffect, useRef, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Switch } from '@mui/material'

// project imports
import ProviderAddEdit from './RateListAddEdit';
import withPagination from 'higher order components/withPagination/withPagination';
import confirm from 'views/forms/plugins/Confirm/confirm'
import APIManager from 'utils/APImanager'
import { confirmMessage, getValueFromObject } from 'utils/Helper'
import TableHeader from 'components/TableHeader/TableHeader';
import ActionButtons from 'components/ActionButtons/ActionButtons';
import { MODULE_NAME } from './Values'
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const apiManager = new APIManager();



function PhoneNumber({ list, setList, otherData, rowsPerPage, getList, searchSection, setSearch, filtered, clearSearchField, loading, emptyData, children, setQuery }) {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    console.log('params', params)
    if(params && params.type && params.parentId){
      setQuery({type: params.type, parentId: params.parentId})
    } else {
      navigate(-1);
    }
  }, [params])

  const modalRef = useRef(null)
  const columns = [
    { id: 'dialCode', label: 'Dialcode', style: { minWidth: 30 }, prefix: '+' },
    { id: 'destination', label: 'Destination', style: { minWidth: 30 } },
    { id: 'rate', label: 'Rate', style: { minWidth: 30 }, prefix: '$ ' },
    { id: 'initialPulse', label: 'Initial Pulse', style: { minWidth: 30 } },
    { id: 'subsequentPulse', label: 'Subsequent Pulse', style: { minWidth: 30 } },
    { id: 'connectionCharge', label: 'Connection Charge', style: { minWidth: 30 }, prefix: '$ ' },
    // { id: 'isActive', label: 'Active', style: { minWidth: 30, textAlign: 'center' } },
    { id: 'actions', label: 'Actions', style: { minWidth: 70 }, align: 'right' },
  ];

  const [editData, setEditData] = useState("")
  const renderCell = (ele, e) => {
    if (ele.id === 'isActive') {
      return (
        <Switch checked={e.isActive} onClick={() => {
          confirm(confirmMessage(`${e.isActive ? 'de' : ''}active`)).then(async () => {
            const res = await apiManager.put(`provider/status/${e._id}`, {
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
              const res = await apiManager.delete(`rate-list/delete/${e._id}`, {
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
    return value? ele.prefix? (ele.prefix + value) : (value) : '-'
  }

  return (
    <TableHeader
      title={MODULE_NAME + ` ( ${params.providerName} )`}
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
export default withPagination(PhoneNumber, 'rate-list/list', { title: MODULE_NAME, queryOnly: true });