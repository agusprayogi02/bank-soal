import {createSlice} from '@reduxjs/toolkit';
import {getKuisApi, getKuisOneApi, postKuisApi, removeKuisApi} from '../../api/kuisApi';

const kuisSlice = createSlice({
  name: 'kuis',
  initialState: {
    kuis: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    getKuisStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getKuisFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getKuisSuccess: (state, action) => {
      state.kuis = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

const getKuis = (kd) => async (dispatch) => {
  try {
    dispatch(getKuisStart());
    const kuis = await getKuisApi(kd);
    dispatch(getKuisSuccess(kuis));
  } catch (error) {
    dispatch(getKuisFailure(error));
  }
};

const getKuisOne = (kd) => async (dispatch) => {
  try {
    dispatch(getKuisStart());
    const kuis = await getKuisOneApi(kd);
    dispatch(getKuisSuccess(kuis));
  } catch (error) {
    dispatch(getKuisFailure(error));
  }
};

const createKuis = (res) => async (dispatch) => {
  try {
    dispatch(getKuisStart());
    const kuis = await postKuisApi(res);
    dispatch(getKuisSuccess(kuis));
  } catch (error) {
    dispatch(getKuisFailure(error));
  }
};

const removeKuis = (kd, id) => async (dispatch) => {
  try {
    dispatch(getKuisStart());
    await removeKuisApi(kd);
    const kuis = await getKuisApi(id);
    dispatch(getKuisSuccess(kuis));
  } catch (error) {
    dispatch(getKuisFailure(error));
  }
};

export const {getKuisFailure, getKuisStart, getKuisSuccess} = kuisSlice.actions;
export {kuisSlice, getKuis, createKuis, getKuisOne, removeKuis};
export default kuisSlice.reducer;
