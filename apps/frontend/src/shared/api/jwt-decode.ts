import { jwtDecode } from "jwt-decode";

import { getAccessToken } from "../lib/cookies";

type JwtPayload = {
  login: string;
  userId: string;
};

export const decodeAccessToken = () => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }

  return jwtDecode<JwtPayload>(token);
};
