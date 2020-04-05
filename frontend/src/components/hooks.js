import useSWR from 'swr';

import { fetcher } from './api';

/**
 * Hook to check if the user is logged in
 *
 * Return type is [user, loading, error]
 */
export function useAuthState() {
  console.log('useAuthState');
  const { data, error } = useSWR('/api/auth/user/', fetcher);

  if (error) {
    // if the status is forbidden, the use is not logged in
    if (error.response.status === 403) {
      return [null, false, false];
    } else {
      return [null, false, error];
    }
  } else {
    return [data, false, false];
  }
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
