export const toPersianDigit = a =>
  a.toString().replace(/\d+/g, digit =>
    digit
      .split("")
      .map(d => d.charCodeAt())
      .map(d => String.fromCharCode(d + (!!a && a == true ? 1584 : 1728)))
      .join("")
  );
