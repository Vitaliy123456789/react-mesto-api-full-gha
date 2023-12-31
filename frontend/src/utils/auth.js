export const BASE_URL = 'https://api.nomoredomainsrocks.ru/';

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(email, password) {
	return fetch(`${BASE_URL}signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, password}),
	})
		.then(checkRes)
};

export function authorization(email, password) {
	return fetch(`${BASE_URL}signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then(checkRes)
};

export function checkToken(token) {
	return fetch(`${BASE_URL}users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	})
	.then(checkRes)
};