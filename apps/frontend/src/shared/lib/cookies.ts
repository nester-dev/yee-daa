import Cookies from "js-cookie";

const COOKIES = {
  ACCESS_TOKEN: "accessToken",
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
