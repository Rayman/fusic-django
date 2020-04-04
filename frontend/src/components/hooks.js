import useSWR from 'swr';

import { fetcher } from './api';

export function useAuthState() {
  // TODO: implement auth
  console.log('useAuthState');
  return [null, false, false];
}

export function useRadioList(options) {
  const params = new URLSearchParams(options).toString();
  let url = '/api/radios/';
  if (params) url += `?${params}`;
  return useSWR(url, fetcher);
}

export function useRadio(pk) {
  if (!pk) throw new TypeError('pk argument is required');
  return useSWR(`/api/radios/${pk}`, fetcher);
}
