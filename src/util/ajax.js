import axios from 'axios';
import { service_ip } from './tool';
import { Base64 } from 'js-base64';

const _instance = { _axios: null };

(async (_data) => {
  const { default: instance } = await import('../main');

  console.log(instance);

  let { _axios } = _data;

  _axios = axios.create({
    baseURL: service_ip, //请求的公共地址
    timeout: 5000, // 请求超时时间
    headers: {
      Authorization: getEncode(),
    },
  });

  _axios.interceptors.request.use(
    (params) => {
      // 在发送请求之前做些什么
      params.data = { data: params.data };
      return params;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  _axios.interceptors.response.use(
    (response) => {
      const res = response.data;
      if (res.error_no > 0) {
        //请求失败
        instance.$Message.error(res.message);
      } else {
        return res.data;
      }
    },
    (error) => {
      console.log(error.message);
      instance.$Message.error('服务器连接失败!');
      return Promise.reject(error);
    }
  );

  /**
   * 获取到加密数据
   */
  function getEncode() {
    const token = getToken();
    const baseCode = Base64.encode(token + ':');
    return `Basic ${baseCode}`;
  }

  /**
   * 获取token
   */
  function getToken() {
    let token = '';
    try {
      const userInfo = instance.$store.getters.getUserInfo;
      if (userInfo) {
        token = userInfo.token;
      } else {
        token = localStorage.getItem('Token') || '';
      }
    } catch (error) {
      console.log(error);
    }
    return token;
  }
})(_instance);

export default _instance;
