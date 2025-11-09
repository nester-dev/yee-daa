import { default as rootAxios } from "axios";

const baseURL = import.meta.env.VITE_API_URL;
export const axios = rootAxios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
