import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle } from 'react';

// material-ui
import { Button, CardContent, CardActions, Divider, Grid, IconButton, Modal, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import CloseIcon from '@mui/icons-material/Close';

const Body = React.forwardRef(({ modalStyle, handleClose, children }, ref) => (
    <div ref={ref} tabIndex={-1}>
        <MainCard
            style={modalStyle}
            sx={{
                position: 'absolute',
                width: { xs: 280, lg: 450 },
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
            title="Title"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <CardContent>
                <Typography variant="body1">
                    {children}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid item>
                    <Button variant="contained">Primary</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary">
                        Secondary
                    </Button>
                </Grid>
            </CardActions>
        </MainCard>
    </div>
));

Body.propTypes = {
    modalStyle: PropTypes.object,
    handleClose: PropTypes.func
};

// ==============================|| SIMPLE MODAL ||============================== //

const SimpleModal = forwardRef(({ children }, ref) => {
    const [open, setOpen] = React.useState(false);
    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        }
      }));

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid container justifyContent="flex-end">
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body handleClose={handleClose} >
                    {children}
                </Body>
            </Modal>
        </Grid>
    );

})

export default SimpleModal;