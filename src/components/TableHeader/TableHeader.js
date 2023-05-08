import React from 'react'
import { Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';

function TableHeader({children, title, searchSection, addOnClick, filterOnClick, filtered, importOnClick}) {
  return (
    <MainCard
      content={false}
      title={title}
      secondary={
        <div style={{ display: "flex", alignItems: "center" }}>
          {searchSection}
          {filterOnClick && <Button size='large' sx={{ ml: 3 }} variant={filtered ? 'contained' : 'outlined'} startIcon={<TuneIcon />} onClick={() => filterOnClick()}>
            Filter
          </Button>}
          {addOnClick && (
            <Button
              size="large"
              sx={{ ml: 3 }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => addOnClick()}
            >
              Add
            </Button>
          )}
          {importOnClick && (
            <Button
              size="large"
              sx={{ ml: 3 }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => importOnClick()}
            >
              Import
            </Button>
          )}
        </div>
      }
    >
      {children}
    </MainCard>
  );
}

export default TableHeader;
