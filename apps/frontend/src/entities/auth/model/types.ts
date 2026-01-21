export type SignInDto = {
  login: string;
  password: string;
};

export type SignUpDto = SignInDto & {
  email: string;
  firstName: string;
  lastName: string;
};

export type ForgotPasswordDto = {
  email: string;
};

export type VerifyOtpDto = {
  email: string;
  otpToken: string;
};

export type AccountRecoveryDto = {
  email: string;
  login: string;
  password: string;
  passwordConfirm: string;
};
