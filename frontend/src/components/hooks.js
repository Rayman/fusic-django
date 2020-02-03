import useSWR, { mutate, trigger } from 'swr';
import Cookies from 'js-cookie';

function fetcher(...args) {
  return fetch.apply(this, args).then(r => r.json());
}

// const fetcher = url => fetch(url).then(r => r.json());

export function useAuthState() {
  // TODO: implement auth
  return [null, false, false];
}

export function useRadioList(options) {
  const params = new URLSearchParams(options).toString();
  let url = '/api/radios/';
  if (params) url += `?${params}`;
  return useSWR(url, fetcher);
}

export function createRadio(radio) {
  console.log('createRadio', radio);

  return fetcher('/api/radios/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify(radio),
  }).then(r => {
    trigger('/api/radios/');
    return r;
  });
}

export function useRadio(pk) {
  if (!pk) throw new TypeError('pk argument is required');
  return useSWR(`/api/radios/${pk}`, fetcher);
}

export function search(q) {
  console.log('search', q);

  return fetcher('/api/songs/search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify({ q }),
  });
}
