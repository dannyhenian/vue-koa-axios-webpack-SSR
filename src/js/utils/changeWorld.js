function changWorld (content = '', params, type = '...') {
  if (content.length <= params) { // eslint-disable-line
    return `${content}`; // eslint-disable-line
  }
  return `${content.substr(0, params)}${type}`;// eslint-disable-line
}
export default changWorld;// eslint-disable-line
