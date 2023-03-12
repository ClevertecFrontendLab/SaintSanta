export const REGEX_WITH_UPPERCASE = /[A-ZА-ЯЁ]{1}/;
export const REGEX_WITH_1NUM = /[0-9]{1}/;
export const REGEX_WITH_LATIN_ABC = /^(?=.*[A-Za-z])[A-Za-z\d]*$/;
export const REGEX_WITH_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REGEX_WITH_PHONE_MASK = ['+','3','7','5',' ','(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,];
export const REGEX_WITH_PHONE = /^\+375\s?\(?(?:25|29|33|44)\)?\s?\d{3}\s?-?\d{2}\s?-?\d{2}/g;
