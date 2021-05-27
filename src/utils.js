const BASE_URL = 'http://localhost:4000';
const BASE_IMG = BASE_URL + '/img/';
const URLIMG_PELAJARAN = BASE_IMG + 'pelajaran/';
const URLIMG_KUIS = BASE_IMG + 'kuis/';
const URLIMG_SOAL = BASE_IMG + 'soal/';

export {BASE_URL, BASE_IMG, URLIMG_PELAJARAN, URLIMG_KUIS, URLIMG_SOAL};

import {io} from 'socket.io-client';

export const Wsocket = (token) =>
  io(BASE_URL, {
    query: {
      uid: token,
    },
  });
