import React, { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

function ActionButtons({ deleteOnClick, editOnClick, rateListOnClick }) {
  const theme = useTheme();
  return (
    <Fragment>
      {editOnClick && (
        <IconButton onClick={editOnClick} color="secondary" size="medium">
          <Tooltip arrow={true} title="Edit" placement={'top'}>
            <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
          </Tooltip>
        </IconButton>
      )}
      {deleteOnClick && (
        <IconButton onClick={deleteOnClick} color="secondary" size="medium">
          <Tooltip arrow={true} title="Delete" placement={'top'}>
            <DeleteIcon sx={{ fontSize: '1.3rem', color: theme.palette.error.main }} />
          </Tooltip>
        </IconButton>
      )}
      {rateListOnClick && (
        <Tooltip arrow={true} title="Rate List" placement={'top'}>
          <IconButton onClick={rateListOnClick} color="secondary" size="medium">
            <AttachMoneyIcon sx={{ fontSize: '1.3rem' }} />
          </IconButton>
        </Tooltip>
      )}
    </Fragment>
  );
}

export default ActionButtons;
