import axios from "axios";

const patchRoute = window.location.origin;


/* export const api = axios.create({
  baseURL: patchRoute.includes('localhost')
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD,
}); */
export const api = axios.create({
  baseURL: 'https://project-delivery-api.onrender.com',
});