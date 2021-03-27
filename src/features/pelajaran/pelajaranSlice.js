import {createSlice} from '@reduxjs/toolkit';
import {getUserFailure} from '../userdata/userdataSlice';
import {getApiPelajaranByuid, createPelajaran} from '../../api/pelajaranApi';

export const pelajaranSlice = createSlice({
  name: 'pelajaran',
  initialState: {
    pelajaran: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getPelajaranStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getPelajaranFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getPelajaranSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.pelajaran = action.payload.pelajarans;
    },
  },
});

export const {getPelajaranStart, getPelajaranFailure, getPelajaranSuccess} = pelajaranSlice.actions;

export default pelajaranSlice.reducer;

export const getPelajaranByid = (uid) => async (dispatch) => {
  try {
    dispatch(getPelajaranStart);
    const pelajaran = await getApiPelajaranByuid(uid);
    dispatch(getPelajaranSuccess(pelajaran));
  } catch (error) {
    dispatch(getUserFailure(error));
  }
};

export const postPelajaran = (res) => async (dispatch) => {
  try {
    dispatch(getPelajaranStart());
    const pelajaran = await createPelajaran(res);
    dispatch(getPelajaranSuccess(pelajaran));
  } catch (error) {
    dispatch(getPelajaranFailure(error));
  }
};
