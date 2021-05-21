import {createSlice} from '@reduxjs/toolkit';
import {
  getApiPelajaranByuid,
  createPelajaran,
  removePelajaranApi,
  updatePelajaran,
} from '../../api/pelajaranApi';

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
      state.pelajaran = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {getPelajaranStart, getPelajaranFailure, getPelajaranSuccess} = pelajaranSlice.actions;

export default pelajaranSlice.reducer;

export const getPelajaranByid = (uid) => async (dispatch) => {
  try {
    dispatch(getPelajaranStart());
    const pelajaran = await getApiPelajaranByuid(uid);
    dispatch(getPelajaranSuccess(pelajaran));
  } catch (error) {
    dispatch(getPelajaranFailure(error));
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

export const putPelajaran = (res) => async (dispatch) => {
  try {
    dispatch(getPelajaranStart());
    const result = await updatePelajaran(res);
    if (result != null) {
      const Pelajaran = await getApiPelajaranByuid(result.guru.uid);
      dispatch(getPelajaranSuccess(Pelajaran));
    }
    dispatch(getPelajaranFailure({name: 'Error', error: 'Tidak ada Id yang sama dalam database!'}));
  } catch (error) {
    dispatch(getPelajaranFailure(error));
  }
};

export const removePelajaran = (kd, id) => async (dispatch) => {
  try {
    dispatch(getPelajaranStart());
    await removePelajaranApi(kd);
    const pelajaran = await getApiPelajaranByuid(id);
    dispatch(getPelajaranSuccess(pelajaran));
  } catch (error) {
    dispatch(getPelajaranFailure(error));
  }
};
