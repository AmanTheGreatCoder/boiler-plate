const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  _id: '',
  name: '',
  email: ''
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    }
  }
});

export default auth.reducer;

export const { setAuth } = auth.actions;
