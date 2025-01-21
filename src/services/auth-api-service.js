import config from '../config';
import TokenService from './token-service';
import IdleService from './idle-service';

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        IdleService.regiserIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      });
  },
  updateUser(user) {
    const userId = (TokenService.readJwtToken().user_id)
    return fetch(`${config.API_ENDPOINT}/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(user),
    });
  },
  postRefreshToken() {
    return fetch(`${config.API_ENDPOINT}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken()
        })
        return res
      })
      .catch(err => {
        console.error(err)
      });
  },
};

export default AuthApiService;