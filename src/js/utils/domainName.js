/**
 * 配置测试环境和线上环境之间的切换
 * domainURL
 */
/* eslint-disable */
let domainURL = '';


if (process.env.SERVER_ENV === 'test') {
  domainURL = 'http://59.110.124.41';
} else if (process.env.SERVER_ENV === 'production') {
  domainURL = 'https://www.yunzongwx.com';
} else {
  domainURL = 'http://59.110.124.41';
}
export {
  domainURL,
};
/* eslint-enable */
