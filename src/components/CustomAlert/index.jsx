import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const CustomAlert = (props) => {
  const { message, color } = props;
  return dispatch(
    openSnackbar({
      open: true,
      message: message,
      variant: 'alert',
      alert: {
        color: color
      },
      close: false
    })
  );
};

CustomAlert.propTypes = {};

export default CustomAlert;
