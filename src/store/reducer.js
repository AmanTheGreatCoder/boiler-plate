// third-party
import { combineReducers } from "redux";
import snackbarReducer from "./slices/snackbar";
import menuReducer from "./slices/menu";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  menu: menuReducer,
});

export default reducer;
