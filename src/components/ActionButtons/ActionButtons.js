import React, { Fragment } from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

function ActionButtons({ deleteOnClick, editOnClick, rateListOnClick }) {
  const theme = useTheme();
  return (
    <Fragment>
      {editOnClick && (
        <IconButton onClick={editOnClick} color="secondary" size="medium">
          <EditTwoToneIcon sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      )}
      {deleteOnClick && (
        <IconButton onClick={deleteOnClick} color="secondary" size="medium">
          <DeleteIcon
            sx={{ fontSize: "1.3rem", color: theme.palette.error.main }}
          />
        </IconButton>
      )}
      {rateListOnClick && (
        <IconButton onClick={rateListOnClick} color="secondary" size="medium">
          <AttachMoneyIcon sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      )}
    </Fragment>
  );
}

export default ActionButtons;
