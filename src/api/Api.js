import axios from 'axios'
import {BASE_URL} from '../utils'
export async function getApiUsers() {
  const {data} = await axios.get(BASE_URL + '/users')
  return data
}
