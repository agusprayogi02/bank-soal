import axios from 'axios'
import {BASE_URL} from '../utils'

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
