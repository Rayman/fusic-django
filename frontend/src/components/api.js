import { trigger } from 'swr';
import Cookies from 'js-cookie';

export function fetcher(resource, init) {
  if (init && init.method === 'POST') {
    init = {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        ...init.headers,
      },
    };
  }
  console.log('fetcher', resource, init);
  return fetch(resource, init).then(r => r.json());
}

export function createRadio(radio) {
  console.log('createRadio radio=', radio);

  return fetcher('/api/radios/', {
    method: 'POST',
    body: JSON.stringify(radio),
  }).then(r => {
    trigger('/api/radios/');
    return r;
  });
}

export function search(q) {
  console.log('search q=', q);

  return fetcher('/api/songs/search/', {
    method: 'POST',
    body: JSON.stringify({ q }),
  });
}

export function upVote(radioId, songId) {
  console.log('upVote radio=', radioId, 'song=', songId);
  if (!radioId) throw new TypeError('radioId argument is required');
  if (!songId) throw new TypeError('songId argument is required');
  return fetcher(`/api/radios/${radioId}/upvote/`, {
    method: 'POST',
    body: JSON.stringify({ song_id: songId }),
  });
}
