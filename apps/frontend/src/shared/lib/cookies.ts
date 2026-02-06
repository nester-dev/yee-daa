import Cookies from "js-cookie";

const COOKIES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export const setAccessToken = (token: string) => {
  Cookies.set(COOKIES.ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  Cookies.remove(COOKIES.ACCESS_TOKEN);
};

export const getAccessToken = () => {
  return Cookies.get(COOKIES.ACCESS_TOKEN);
};

export const removeRefreshToken = () => {
  Cookies.remove(COOKIES.REFRESH_TOKEN);
};

export const getRefreshToken = () => {
  return Cookies.get(COOKIES.REFRESH_TOKEN);
};
