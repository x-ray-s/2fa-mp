const dataFilter = (obj: Record<string, any>) => {
  return JSON.parse(JSON.stringify(obj));
};

const form = (obj: Record<string, any>) => {
  let str = ''
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (str !== '' && !str.endsWith('&')) {
      str += '&'
    }
    str += key + '=' + value
  })
  return str
}

export const request = async (path: string, data = {}, config: Record<string, any> = {}) => {
  const token = uni.getStorageSync("token");
  let header:Record<string, any> = Object.assign({}, config.header || {});
  if (token) {
    header.Authorization = `bearer ${token}`;
  }
  const isForm = header['content-type'] === 'application/x-www-form-urlencoded'
  const resp: {data: any} = await uni.request({
    url: `${import.meta.env.VITE_BACKEND}${path}`,
    method: config.method || "GET",
    data: isForm ? form(data) : dataFilter(data),
    header: header,
  });

  return resp;
};
