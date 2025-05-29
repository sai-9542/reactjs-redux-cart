// axios/baseURL.js
import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://dummyjson.com/',  
  // You can also set headers here
  // headers: {
  //   Authorization: 'Bearer yourTokenHere',
  // },
});

const apiURL = 'https://dummyjson.com/';

//export default baseURL;
export { baseURL, apiURL };

