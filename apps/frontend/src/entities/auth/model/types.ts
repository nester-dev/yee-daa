export type SignInDto = {
  login: string;
  password: string;
};

export type SignUpDto = SignInDto & {
  email: string;
  firstName: string;
  lastName: string;
};
