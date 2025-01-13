export function getToken() {
  return localStorage.getItem('sword-token') || '';
}

export function setToken(token) {
  localStorage.setItem('sword-token', token);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem('sword-refresh-token', refreshToken || '');
}

export function getRefreshToken() {
  return localStorage.getItem('sword-refresh-token') || '';
}

export function getCurrentUser() {
  const localUser = localStorage.getItem('userInfo');
  return {
    userId: localUser?.user_id,
    userName: localUser?.user_name,
  };
}
