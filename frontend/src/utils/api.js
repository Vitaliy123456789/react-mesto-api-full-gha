
 class Api {
  constructor(options) {
    this._options = options
    this._request = 'http://localhost:3000'
    this._authorization = `Bearer ${localStorage.getItem('jwt')}`
  }
_checkRes(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}
  getInitialCards(){
    return fetch(`${this._request}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkRes);
  }
  getCreateCards({name, link}){
    return fetch(`${this._request}/cards`,{
      method:'POST',
      body: JSON.stringify({name, link}),
      headers: {
        'Content-Type': 'application/json',
        authorization: this._authorization
      }
    })
      .then(this._checkRes);
  }
  editingUserProfile(name, discription){
   return fetch(`${this._request}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name ,
        about: discription
      })
    })
    .then(this._checkRes)
  }
  getUserAvatar(data){
    return fetch(`${this._request}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkRes)
  }
  getUserInfo(){
    return fetch(`${this._request}/users/me/`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkRes)
  }
deleteCard(cardId){
    return fetch(`${this._request}/cards/` +cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      },
    })
    .then(this._checkRes)
}
changeLikeCardStatus(cardId, isLiked) {
  return fetch(`${this._request}/cards/${cardId}/likes`, {
    headers: {
      authorization: this._authorization
    },
    method: isLiked ? 'DELETE' : 'PUT',
  }).then(this._checkRes);
}
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
}); 