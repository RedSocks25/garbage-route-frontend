import axios from 'axios';

const garbageApi = axios.create({
  baseURL: 'http://garbage-back.peru-iot4.com/',
});

export default garbageApi;