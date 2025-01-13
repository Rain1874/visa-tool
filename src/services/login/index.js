import request from '@/utils/http';

/**
 *
 * @param {*} params
 * @returns 登录接口
 */
export async function LoginApi(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: { ...params },
  });
}
