import React, { forwardRef, useImperativeHandle } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery
} from '@mui/material';

// ===============================|| UI DIALOG - RESPONSIVE ||=============================== //

const ResponsiveDialog = forwardRef(
  ({ confirmation = 'ARE YOU SURE?', content, onAgree, proceed, dismiss }, ref) => {
    const [open, setOpen] = React.useState(true);
    let onAgreeFunc;

    // useImperativeHandle(ref, () => ({
    //     handleOpen() {
    //         setOpen(true);
    //     },
    //     handleClose() {
    //         setOpen(false);
    //     },
    //     sendAgreeFunc(fn){
    //         onAgreeFunc = fn
    //     }
    // }));
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          {open && (
            <>
              <DialogTitle id="responsive-dialog-title">{confirmation}</DialogTitle>
              {/* <DialogContent>
                            <DialogContentText>
                                <Typography variant="body2" component="span">
                                    {content}
                                </Typography>
                            </DialogContentText>
                        </DialogContent> */}
              <DialogActions sx={{ pr: 2.5 }}>
                <Button
                  sx={{ color: theme.palette.error.dark }}
                  autoFocus
                  onClick={() => {
                    handleClose();
                    dismiss();
                  }}
                  color="secondary"
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    background: '#6275d1',
                    '&:hover': { background: '#4f5aa6' }
                  }}
                  size="small"
                  onClick={() => {
                    handleClose();
                    proceed();
                  }}
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    );
  }
);
export default ResponsiveDialog;
