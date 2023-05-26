import { combineReducers } from 'redux';
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import authReducer from './slices/auth';

const reducer = combineReducers({
  snackbar: snackbarReducer,
  menu: menuReducer,
  auth: authReducer
});

export default reducer;
