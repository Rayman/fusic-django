import { trigger } from 'swr';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

// https://github.com/zeit/swr/blob/master/examples/axios/libs/useRequest.js
export function fetcher(url, config) {
  return axios(url, config).then(res => res.data);
}

export function createRadio(radio) {
  console.log('createRadio radio=', radio);

  return fetcher('/api/radios/', {
    method: 'POST',
    data: radio,
  }).then(r => {
    trigger('/api/radios/');
    return r;
  });
}

export function search(q) {
  console.log('search q=', q);

  return fetcher('/api/songs/search/', {
    method: 'POST',
    data: { q },
  });
}

export function upVote(radioId, songId) {
  console.log('upVote radio=', radioId, 'song=', songId);
  if (!radioId) throw new TypeError('radioId argument is required');
  if (!songId) throw new TypeError('songId argument is required');
  return fetcher(`/api/radios/${radioId}/upvote/`, {
    method: 'POST',
    data: { song_id: songId },
  });
}

export function login({ email, password }) {
  console.log('login');

  return fetcher('/api/auth/login/', {
    method: 'POST',
    data: { email, password },
  }).then(result => {
    trigger('/api/auth/user/');
    return result;
  });
}

export function logout() {
  console.log('logout');

  return fetcher('/api/auth/logout/', {
    method: 'POST',
  }).then(result => {
    trigger('/api/auth/user/');
    return result;
  });
}
