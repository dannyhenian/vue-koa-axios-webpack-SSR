/**
 * 配置测试环境和线上环境之间的切换
 * domainURL
 */
/* eslint-disable */
let domainURL = 'http://59.110.124.41';


// if (process.env.NODE_ENV === 'development') {
//   domainURL = 'http://59.110.124.41';
// } else if (process.env.NODE_ENV === 'production') {
//   domainURL = 'https://www.yunzongwx.com';
// } else if (process.env.NODE_ENV === 'test') {
//   domainURL = 'http://59.110.124.41';
// }
export {
  domainURL,
};
/* eslint-enable */
