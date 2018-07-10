const FA_ZERO_CODE = "۰".charCodeAt(0);
const FA_NINE_CODE = "۹".charCodeAt(0);
const EN_ZERO_CODE = "0".charCodeAt(0);

export const toPersianDigit = (a: number | string) =>
  a.toString().replace(/\d+/g, digit =>
    digit
      .split("")
      .map(d => d.charCodeAt(0))
      .map(d =>
        String.fromCharCode(
          d + (d < FA_ZERO_CODE ? FA_ZERO_CODE - EN_ZERO_CODE : 0)
        )
      )
      .join("")
  );
