import axios from 'axios';
import {BASE_URL} from '../utils';
import {apiResult} from './apiResult';

const getKuisApi = async (kd = '') => {
  if (kd != '') {
    const {data} = await axios.get(BASE_URL + '/kuis/' + kd);
    return apiResult(data);
  } else {
    throw new Error('Tidak memasukkan kd!');
  }
};

const getKuisOneApi = async (kd = '') => {
  if (kd != '') {
    const {data} = await axios.get(BASE_URL + '/kuis/one/' + kd);
    return apiResult(data);
  } else {
    throw new Error('Tidak memasukkan kd!');
  }
};

const postKuisApi = async (res = null) => {
  if (res != null) {
    const {data} = await axios.post(BASE_URL + '/kuis/create', res);
    return apiResult(data);
  } else {
    throw new Error('Tidak ada data yang dimasukkan!');
  }
};

export {getKuisApi, postKuisApi, getKuisOneApi};
