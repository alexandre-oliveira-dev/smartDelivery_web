import axios from "axios";

const patchRoute = window.location.origin;

export const api = axios.create({
  baseURL: patchRoute.includes('localhost')
    ? 'http://localhost:3333'
    : 'https://project-delivery-api.onrender.com',
});