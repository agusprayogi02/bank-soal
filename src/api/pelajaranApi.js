import axios from 'axios';
import {BASE_URL} from '../utils';
import {apiResult} from './apiResult';
// import qs from 'qs';

export async function getApiPelajaranByuid(uid = '') {
  if (uid !== '') {
    const {data} = await axios.get(BASE_URL + '/users/pelajaran/' + uid);
    return apiResult(data);
  } else {
    throw new Error('required id');
  }
}

export async function getApiPelajaranId(id = '') {
  if (id != '') {
    const {data} = await axios.get(BASE_URL + '/pelajaran/' + id);
    return apiResult(data);
  } else {
    throw new Error('required Id');
  }
}

export async function createPelajaran(res = null) {
  if (res !== null) {
    const {data} = await axios.post(BASE_URL + '/pelajaran/create', res);
    return apiResult(data);
  } else {
    throw new Error('required Uid');
  }
}
