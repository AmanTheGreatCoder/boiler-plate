import React, { useEffect, useRef, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import APIManager from 'utils/APImanager';

import AddIcon from '@mui/icons-material/Add';
import SimpleModal from 'views/forms/plugins/Modal/SimpleModal';

const apiManager = new APIManager();

const columns = [
  { id: 'name', label: 'Name', minWidth: 30 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  { id: 'flag', label: 'Flag', minWidth: 70, align: 'justify' },
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US')
  // },
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US')
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => typeof value === 'number' && value.toFixed(2)
  // }
];

// table data
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767)
];

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState(0)
  const [list, setList] = useState([]);
  const modalRef = useRef(null)
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

  const getList = async (limit = 10, page = 0, search = "") => {
    const res = await apiManager.get(`country/list?limit=${limit}&pageNo=${page+1}&isActive=true&search=${search}`);
    if (!res.error) {
      setList(res.data.data);
      setCount(res.data.count);
      setOtherData({
        imageUrl: res.data.imageUrl
      })
    }
  }

  useEffect(() => {
    console.log('information',{
      rowsPerPage,
      page,
      search
    })
    getList(rowsPerPage,page,search);
  }, [rowsPerPage,search,page])


  return (
    <MainCard
      content={false}
      title="Country"
      secondary={<Button variant="contained" startIcon={<AddIcon />} onClick={()=>{
        modalRef.current.handleOpen();
      }}>
        Add
      </Button>}
    >
      {/* table */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))} */}
            {console.log(list, 'list1')}
            {list.map(e => {
              return (
                <TableRow key={e._id}>
                  <TableCell>
                    {e.countryName}
                  </TableCell>
                  <TableCell>
                    {e.countryCode}
                  </TableCell>
                  <TableCell>
                    <img src={`${otherData.imageUrl}${e.flag}`} height='30' width='30' alt="country flag" />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleModal
      ref={modalRef}
      >
        <div>adslfkjs</div>
      </SimpleModal>

      {/* table pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
}
