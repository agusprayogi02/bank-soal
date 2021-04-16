const BASE_URL = 'http://localhost:4000';

export {BASE_URL};

import {io} from 'socket.io-client';

export const Wsocket = (token) =>
  io(BASE_URL, {
    query: {
      uid: token,
    },
  });
