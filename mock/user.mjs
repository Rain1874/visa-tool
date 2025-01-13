export default [
  {
    url: '/api/user_api/v1/user/profile_id', // 匹配的请求 URL 和真实请求的URL完全一致
    method: 'get', // 请求方法
    response: () => {
      // 返回的模拟数据
      return {
        code: 200,
        msg: '成功',
        success: true,
        data: {
          profile_id: '12345678',
        },
      };
    },
  },
  // 模拟登录接口
  {
    url: '/api/user/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '成功',
        success: true,
        data: {
          access_token: '123',
          user_id: '12345678',
          user_name: 'admin',
        },
      };
    },
  },
];
