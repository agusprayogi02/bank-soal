import {createSlice} from '@reduxjs/toolkit'

export const pelajaranSlice = createSlice({
  name: 'pelajaran',
  initialState: {
    pelajaran: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getPelajaranStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    getPelajaranFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    getPelajaranSuccess: (state, action) => {
      state.isLoading = false
      state.pelajaran = action.payload
    },
  },
})

export const {getPelajaranStart, getPelajaranFailure, getPelajaranSuccess} = pelajaranSlice.actions

export default pelajaranSlice.reducer
