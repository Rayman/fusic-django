import React, { useState } from 'react';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export function useAuthState() {
  // TODO: implement auth
  return [null, false, false];
}

export function useRadioList() {
  return useSWR('/api/radios', fetcher);
}
