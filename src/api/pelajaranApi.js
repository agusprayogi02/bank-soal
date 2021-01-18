import axios from 'axios'
import {BASE_URL} from '../utils'
import {apiResult} from './apiResult'

export async function getApiPelajaranByuid(uid = '') {
  if (uid !== '') {
    const {data} = await axios.get(BASE_URL + '/users/pelajaran/' + uid)
    return apiResult(data)
  } else {
    throw new Error('required id')
  }
}
