import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default configureStore({
  reducer: {
    counter: counterReducer,
    changeState
  },
});
