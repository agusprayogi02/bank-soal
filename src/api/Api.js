import axios from 'axios'
import {BASE_URL} from '../utils'
import qs from 'qs'

export async function getApiUsers() {
  const {data} = await axios.get(BASE_URL + '/users')
  return data
}
export async function getApiUser(id = '') {
  if (id !== '') {
    const {data, status} = await axios.get(BASE_URL + '/users/' + id)
    if (status !== 200) {
      throw new Error(data)
    }
    return data
  } else {
    throw new Error('required Id')
  }
}

export async function login(email = '', password = '') {
  if (email !== '' && password !== '') {
    var val = {
      email: email,
      password: password,
    }
    const {status, data} = await axios.post(BASE_URL + '/users/login', qs.stringify(val), {
      headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
    })
    if (status !== 200) {
      throw new Error(data)
    }
    return data
  }
  throw new Error('Is Required Email and Password!')
}
