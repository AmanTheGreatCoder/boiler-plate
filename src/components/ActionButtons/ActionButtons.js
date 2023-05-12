import React, { Fragment } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

function ActionButtons({ deleteOnClick, editOnClick, rateListOnClick }) {
  const theme = useTheme();
  const style = {
    "&:hover": {
      cursor: "pointer",
    },
    color: theme.palette.grey[700],
  };
  return (
    <Fragment>
      {editOnClick && (
        // <ModeEditOutlineOutlinedIcon
        //   onClick={editOnClick}
        //   sx={style} />
        <IconButton onClick={editOnClick} color="secondary" size="medium">
          <EditTwoToneIcon sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      )}
      {deleteOnClick && (
        // <DeleteOutlineOutlinedIcon onClick={deleteOnClick} sx={style} />
        <IconButton onClick={deleteOnClick} color="secondary" size="medium">
          <DeleteIcon
            sx={{ fontSize: "1.3rem", color: theme.palette.error.main }}
          />
        </IconButton>
      )}
      {rateListOnClick && (
        <AttachMoneyIcon onClick={rateListOnClick} sx={style} />
      )}
    </Fragment>
  );
}

export default ActionButtons;
