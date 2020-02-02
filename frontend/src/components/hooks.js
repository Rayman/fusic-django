import useSWR, { mutate, trigger } from 'swr';
import Cookies from 'js-cookie';

const fetcher = url => fetch(url).then(r => r.json());

export function useAuthState() {
  // TODO: implement auth
  return [null, false, false];
}

export function useRadioList() {
  return useSWR('/api/radios/', fetcher);
}

export function createRadio(radio) {
  console.log('createRadio', radio);

  return mutate(
    '/api/radios',
    fetch(
      '/api/radios/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(radio),
      },
      radio
    ).then(radio => {
      trigger('/api/radios/');
      return radio;
    })
  );
}

export function useRadio(pk) {
  if (!pk) throw new TypeError('pk argument is required');
  return useSWR(`/api/radios/${pk}`, fetcher);
}
