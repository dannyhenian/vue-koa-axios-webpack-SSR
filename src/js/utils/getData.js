export default {
  setStore (name, content) {
    let cont = content;
    if (!name) return;
    if (typeof cont !== 'string') {
      cont = JSON.stringify(cont);
    }
    window.localStorage.setItem(name, cont);
  },
  getStore (name) {
    if (!name) return null;
    return window.localStorage.getItem(name);
  },
  removeStore (name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
  addCookie (name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 3600000 * 24));
    const Myexpires = (typeof days) === 'string' ? '' : `;expires=${expires.toUTCString()}`;
    document.cookie = `${name}=${value}${Myexpires};path=/`;
  },
  getCookie (data) {
    let name = data;
    const allcookies = document.cookie;
    name += '=';
    const pos = allcookies.indexOf(name);
    if (pos !== -1) {
      const start = pos + name.length;
      let end = allcookies.indexOf(';', start);
      if (end === -1) end = allcookies.length;
      const value = allcookies.substring(start, end);
      return value;
    }
    return null;
  },
  deleteCookie (name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 36000);
    const cval = this.getCookie(name);
    if (cval !== null) {
      document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=/`;
    }
  }
};
