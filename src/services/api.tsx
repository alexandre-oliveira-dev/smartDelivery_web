import axios from "axios";

export const api = axios.create({
    baseURL:'https://project-delivery-api.onrender.com'
})