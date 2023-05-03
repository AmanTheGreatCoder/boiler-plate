import React from 'react'
import { Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';

function TableHeader({children, title, searchSection, addOnClick}) {
  return (
    <MainCard
      content={false}
      title={title}
      secondary={(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {searchSection}
          {addOnClick && <Button size='large' sx={{ ml: 3 }} variant="contained" startIcon={<AddIcon />} onClick={() => addOnClick()}>
            Add
          </Button>}
        </div>
      )}
    >
      {children}
    </MainCard>
  )
}

export default TableHeader