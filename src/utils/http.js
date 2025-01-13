import { notification } from 'antd';
import axios from 'axios';
import { Base64 } from 'js-base64';
import { getToken } from './authority';

const clientId = 'sword';
const clientSecret = 'sword_secret';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = (response) => {
  if (
    (response.status >= 200 && response.status < 300) ||
    // 针对于要显示后端返回自定义详细信息的status, 配置跳过
    response.status === 400 ||
    response.status === 401 ||
    response.status === 500
  ) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

// 创建axios实例
const request = axios.create({
  baseURL: '/',
  timeout: 1000,
  responseType: 'json',
});

const checkServerCode = (response) => {
  if (response.code === 200) {
    return {
      success: true,
      ...response,
    };
  }
  if (response.error_code) {
    notification.error({
      message: response.error_description,
    });
    return {
      success: false,
      ...response,
    };
  }
  if (response.code === 400) {
    notification.error({
      message: response.msg || codeMessage[response.code],
    });
    return {
      success: false,
      ...response,
    };
  } else if (response.code === 401) {
    if (window.location.hash.endsWith('/login')) return false;
    notification.error({
      message: response.msg || codeMessage[response.code],
    });
    window.location.href = '/login';
  } else if (response.code === 500) {
    notification.error({
      message: response.msg || codeMessage[response.code],
    });
    return {
      success: false,
      ...response,
    };
  }
  return {
    success: true,
    ...response,
  };
};

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const enCode = `${clientId}:${clientSecret}`;
    config.headers = {
      ...config.headers,
      Authorization: `Basic ${Base64.encode(enCode)}`,
    };
    // 从缓存中读取token值
    const token = getToken();
    // 当我们缓存中有token则把token添加到请求头中，携带到后端
    if (token) {
      config.headers = {
        ...config.headers,
        'Keeper-Auth': token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应统一进行处理
    try {
      if (response.data instanceof Blob) {
        return response.data;
      }
      const result = checkServerCode(response.data);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    if (error.response) {
      const res = checkStatus(error.response);
      checkServerCode(res.data);
    }
    return Promise.reject(error);
  },
);

export default request;
