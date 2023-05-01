import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle } from 'react';

// material-ui
import { Button, CardContent, CardActions, Divider, Grid, IconButton, Modal, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import CloseIcon from '@mui/icons-material/Close';
import { useFormikContext } from 'formik';

const Body = forwardRef(({ submitForm, modalStyle, handleClose, children, onSubmit, handleSubmit, errors, title }, ref) => {
    // const {errors}=useFormikContext();
    console.log('actual errors',errors)
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            // handleSubmit();
            console.log('errors', errors)
            // if (Object.keys(errors).length === 0) {
            //     onSubmit();
            // }
            submitForm();
        }} ref={ref} tabIndex={-1}>
            <MainCard
                style={modalStyle}
                sx={{
                    position: 'absolute',
                    width: { xs: 280, lg: 450 },
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title={title || "Title"}
                content={false}
                secondary={
                    <IconButton onClick={handleClose} size="large">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent sx={{
                    maxHeight: '50vh',
                    overflow: 'auto'
                }}>
                    <Typography variant="body1">
                        {children}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Grid item>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Grid>
                    {/* <Grid item>
                    <Button variant="contained" color="secondary">
                        Secondary
                    </Button>
                </Grid> */}
                </CardActions>
            </MainCard>
        </form>
    )
});

Body.propTypes = {
    modalStyle: PropTypes.object,
    handleClose: PropTypes.func
};

// ==============================|| SIMPLE MODAL ||============================== //

const SimpleModal = forwardRef(({ children, onSubmit, errors, handleSubmit, resetForm, submitForm, title }, ref) => {
    const [open, setOpen] = React.useState(false);
    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
        handleClose() {
            setOpen(false);
            resetForm();
        }
    }));

    const handleClose = () => {
        setOpen(false);
        resetForm();
    }
    return (
        <Grid container justifyContent="flex-end">
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body title={title} submitForm={submitForm} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} handleClose={handleClose} >
                    {children}
                </Body>
            </Modal>
        </Grid>
    );

})

export default SimpleModal;