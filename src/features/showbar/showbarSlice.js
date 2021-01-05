import { createSlice } from '@reduxjs/toolkit';

export const showBarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    value: 'responsive'
  },
  reducers: {
    showBar: (state, action) => {
      state.value = action.payload
      //   console.log(state.value);
      //   switch (action.type) {
      //     case 'set':
      //       return { ...state, ...action.payload }
      //     default:
      //       return state
      //   }
    },
  },
});

export const { showBar } = showBarSlice.actions;

export const selectBar = state => state.sidebar.value;

export default showBarSlice.reducer;