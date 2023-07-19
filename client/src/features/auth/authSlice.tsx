import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: {
    id: null,
    name: null,
    email: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser, unsetUser } = authSlice.actions;

export default authSlice.reducer;
