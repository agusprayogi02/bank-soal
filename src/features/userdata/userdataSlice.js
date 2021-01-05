import {createSlice} from '@reduxjs/toolkit'
import {getApiUsers} from '../../api/Api'

export const UserdataSlice = createSlice({
  name: 'userdata',
  initialState: {
    isLoading: false,
    value: [],
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
      })
      // console.log(users, arr)
      state.value = users
      state.isLoading = false
    },
    getUserFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const {getUsersStart, getUserSuccess, getUserFailure} = UserdataSlice.actions

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
