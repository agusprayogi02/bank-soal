import axios from 'axios'
import {BASE_URL} from '../utils'
import qs from 'qs'

export async function getApiUsers() {
  const {data} = await axios.get(BASE_URL + '/users')
  if (data.error !== null && data.error !== undefined) {
    throw data
  }
  return data
}
export async function getApiUser(id = '') {
  if (id !== '') {
    const {data} = await axios.get(BASE_URL + '/users/' + id)
    if (data.error !== null && data.error !== undefined) {
      throw data
    }
    return data
  } else {
    throw new Error('required Id')
  }
}

export async function getSekolah(id = '') {
  if (id !== '') {
    const {data} = await axios.get(BASE_URL + '/sekolah/' + id)
    if (data.error !== null && data.error !== undefined) {
      throw data
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
    const {data} = await axios.post(BASE_URL + '/users/login', qs.stringify(val), {
      headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
    })
    if (data.error !== null && data.error !== undefined) {
      throw data
    }
    return data
  }
  throw new Error('Is Required Email and Password!')
}
