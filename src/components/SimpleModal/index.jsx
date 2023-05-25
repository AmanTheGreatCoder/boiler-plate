import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

// material-ui
import {
  Button,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useFormikContext } from 'formik';
import MainCard from 'components/MainCard';

const Body = forwardRef(
  (
    {
      submitForm,
      modalStyle,
      handleClose,
      children,
      onClear,
      onSubmit,
      handleSubmit,
      errors,
      title,
      showClearButton,
      resetForm,
      size
    },
    ref
  ) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        ref={ref}
        tabIndex={-1}
      >
        <MainCard
          style={modalStyle}
          sx={{
            position: 'absolute',
            width: size || {
              xs: '80%',
              sm: '50%',
              md: '40%',
              lg: '35%',
              xl: '30%'
            },
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          title={title || 'Title'}
          content={false}
          secondary={
            <IconButton onClick={handleClose} size="large">
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <CardContent
            sx={{
              maxHeight: '50vh',
              overflow: 'auto'
            }}
          >
            <Typography variant="body1">{children}</Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container justifyContent={'flex-end'} spacing={1}>
              {showClearButton && (
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      resetForm();
                      onClear && onClear();
                    }}
                  >
                    Clear
                  </Button>
                </Grid>
              )}
              <Grid item justifySelf={'flex-end'}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </MainCard>
      </form>
    );
  }
);

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func
};

const SimpleModal = forwardRef(
  (
    {
      children,
      onSubmit,
      errors,
      handleSubmit,
      resetForm,
      submitForm,
      title,
      showClearButton,
      resetOnClear,
      onClear,
      size
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      handleOpen() {
        setOpen(true);
      },
      handleClose() {
        setOpen(false);
        !resetOnClear && resetForm();
      }
    }));

    const handleClose = () => {
      setOpen(false);
      !resetOnClear && resetForm && resetForm();
    };
    return (
      <Grid container justifyContent="flex-end">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Body
            title={title}
            size={size}
            resetForm={resetForm}
            showClearButton={showClearButton}
            submitForm={submitForm}
            onClear={onClear}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            handleClose={handleClose}
          >
            {children}
          </Body>
        </Modal>
      </Grid>
    );
  }
);

export default SimpleModal;
