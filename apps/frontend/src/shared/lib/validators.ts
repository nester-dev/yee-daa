export const isCyrillicWithHyphen = (value: string) =>
  /^[А-ЯЁ][а-яё-]*$/.test(value);

export const startsWithCyrillicUppercase = (value: string) =>
  /^[А-Я]/.test(value);

export const isLatinWithSpecialChars = (value: string) =>
  /^[A-Za-z0-9!@#$&_+.-]+$/.test(value);

export const isPasswordValid = (value: string) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
