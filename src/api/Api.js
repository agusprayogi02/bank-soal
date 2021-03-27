import axios from 'axios';
import {BASE_URL} from '../utils';
import qs from 'qs';
import {apiResult} from './apiResult';

export async function getApiUsers() {
  const {data} = await axios.get(BASE_URL + '/users');
  return apiResult(data);
}

export async function postRegister(res = null, id = '') {
  if (res !== null && id !== '') {
    var dt = Object.assign(res, {role: 'guru'});
    const {data} = await axios.post(BASE_URL + '/users/' + id, qs.stringify(dt));
    return apiResult(data);
  } else {
    throw new Error('required Id');
  }
}

export async function postSekolah(res = null) {
  if (res !== null) {
    const {data} = await axios.post(BASE_URL + '/sekolah/save', qs.stringify(res));
    return apiResult(data);
  } else {
    throw new Error('required Id');
  }
}

export async function getSekolahAll() {
  const {data} = await axios.get(BASE_URL + '/sekolah/get');
  return apiResult(data);
}

export async function getApiUser(id = '') {
  if (id !== '') {
    const {data} = await axios.get(BASE_URL + '/users/' + id);
    return apiResult(data);
  } else {
    throw new Error('required Id');
  }
}

export async function getSekolah(id = '') {
  if (id !== '') {
    const {data} = await axios.get(BASE_URL + '/sekolah/' + id);
    return apiResult(data);
  } else {
    throw new Error('required Id');
  }
}

export async function login(email = '', password = '') {
  if (email !== '' && password !== '') {
    var val = {
      email: email,
      password: password,
    };
    const {data} = await axios.post(BASE_URL + '/users/login', qs.stringify(val));
    console.log(data);
    if (data.role == 'siswa') {
      throw new Error('Siswa bisa login menggunakan app mobile!');
    }
    return apiResult(data);
  } else {
    throw new Error('Is Required Email and Password!');
  }
}
