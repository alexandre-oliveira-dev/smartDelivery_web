import axios from "axios";

const patchRoute = window.location.origin;

  export const api = axios.create({
    baseURL: patchRoute.includes('localhost')
      ? 'https://smartdelivery-api-dev.onrender.com'
      : 'https://project-delivery-api.onrender.com',
  });
/* export const api = axios.create({
  baseURL: 'https://project-delivery-api.onrender.com',
}); */