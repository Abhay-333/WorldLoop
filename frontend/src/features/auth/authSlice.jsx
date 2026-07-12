import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    register: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { register, login, logout } = authSlice.actions
export default authSlice.reducer
