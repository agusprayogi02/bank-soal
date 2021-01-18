import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import pelajaranReducer from '../features/pelajaran/pelajaranSlice'
import showBarReducer from '../features/showbar/showbarSlice'
import userdataReducer from '../features/userdata/userdataSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    sidebar: showBarReducer,
    userdata: userdataReducer,
    pelajaran: pelajaranReducer,
  },
})
