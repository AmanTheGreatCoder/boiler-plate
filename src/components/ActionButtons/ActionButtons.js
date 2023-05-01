import React, { Fragment } from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTheme } from '@mui/material/styles';


function ActionButtons({ deleteOnClick, editOnClick }) {
  const theme = useTheme();
  const style = {
    '&:hover': {
      cursor: 'pointer'
    },
    color: theme.palette.grey[700]
  }
  return (
    <Fragment>
      {editOnClick && (
        <ModeEditOutlineOutlinedIcon
          onClick={editOnClick}
          sx={style} />
      )}
      {deleteOnClick && (
        <DeleteOutlineOutlinedIcon
          onClick={deleteOnClick}
          sx={style}
        />
      )}
    </Fragment>
  )
}

export default ActionButtons