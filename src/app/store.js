import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import showBarReducer from '../features/showbar/showbarSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    sidebar: showBarReducer
  },
});
