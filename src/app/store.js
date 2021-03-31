import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pelajaranReducer from '../features/pelajaran/pelajaranSlice';
import showBarReducer from '../features/showbar/showbarSlice';
import userdataReducer from '../features/userdata/userdataSlice';
import kuisReducer from '../features/kuis/kuisSlice';

// const middleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

export default configureStore({
  // middleware,
  reducer: {
    counter: counterReducer,
    sidebar: showBarReducer,
    userdata: userdataReducer,
    pelajaran: pelajaranReducer,
    kuis: kuisReducer,
  },
});
