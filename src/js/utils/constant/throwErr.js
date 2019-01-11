// axios捕错
export const throwErr = (code, response) => {
  let message = '请求错误';
  switch (code) {
    case 400:
      message = '400 请求错误';
      break;
    case 401:
      message = '401 未授权，请登录';
      break;
    case 403:
      message = '403 拒绝访问';
      break;
    case 404:
      message = `404 请求地址出错: ${response.config.url}`;
      break;
    case 408:
      message = '408 请求超时';
      break;
    case 500:
      message = '500 服务器内部错误';
      break;
    case 501:
      message = '501 服务未实现';
      break;
    case 502:
      message = '502 网关错误';
      break;
    case 503:
      message = '503 服务不可用';
      break;
    case 504:
      message = '504 网关超时';
      break;
    case 505:
      message = '505 HTTP版本不受支持';
      break;
    default:
  }
  return message;
};
