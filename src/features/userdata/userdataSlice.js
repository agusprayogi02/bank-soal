import {createSlice} from '@reduxjs/toolkit'
import {getApiUser, getApiUsers, login} from '../../api/Api'

export const UserdataSlice = createSlice({
  name: 'userdata',
  initialState: {
    isLoading: false,
    value: [],
    user: {},
    error: null,
  },
  reducers: {
    getUsersStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    getUserSuccess: (state, action) => {
      var arr = action.payload
      var users = []
      arr.forEach((v) => {
        if (v.role === 'siswa') {
          var i = {
            id: v.uid,
            name: v.firstName + ' ' + v.lastName,
            email: v.email,
            age: v.age,
            kelas: v.kelas,
            role: v.role,
            sekolah: v.sekolah.nama,
            jurusan: v.sekolah.jurusan,
          }
          users.push(i)
        }
      })
      // console.log(users, arr)
      state.value = users
      state.isLoading = false
    },
    getUserFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    getUserdataSuccess: (state, action) => {
      state.user = action.payload
      state.isLoading = false
    },
    getLogout: (state) => {
      state.user = {}
    },
  },
})

export const {
  getUsersStart,
  getUserSuccess,
  getUserFailure,
  getUserdataSuccess,
  getLogout,
} = UserdataSlice.actions

export default UserdataSlice.reducer

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersStart())
    const users = await getApiUsers()
    dispatch(getUserSuccess(users))
  } catch (err) {
    dispatch(getUserFailure(err))
  }
}
export const fetchUserdata = (id) => async (dispatch) => {
  try {
    dispatch(getUsersStart())
    const user = await getApiUser(id)
    dispatch(getUserdataSuccess(user))
  } catch (err) {
    dispatch(getUserFailure(err))
  }
}

export const fetchLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(getUsersStart())
    const user = await login(email, password)
    dispatch(getUserdataSuccess(user))
  } catch (err) {
    dispatch(getUserFailure(err))
  }
}
