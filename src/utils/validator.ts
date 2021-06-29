const emailRegex =
  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const pwRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// Password Regex Example
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

const isEmptyString = (value: string) => {
  if (!value.length) {
    return true;
  }
};

export const emailValidator = (email: string) => {
  let errorMessage = '';
  if (!emailRegex.test(email)) errorMessage = '이메일형식으로 적어주세요';
  if (isEmptyString(email)) errorMessage = '이메일을 적어주세요';
  return errorMessage;
};

export const pwValidator = (pw: string) => {
  let errorMessage = '';
  if (!pwRegex.test(pw))
    errorMessage = '영문 대소문자, 숫자, 특수문자 포함 8자이상 적어주세요';
  if (isEmptyString(pw)) errorMessage = '비밀번호를 적어주세요';
  return errorMessage;
};
