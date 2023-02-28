import { closestIndexTo, format } from "date-fns";
import { nlBE } from "date-fns/locale/index.js";

import { DUTCH_MONTHS, ENGLISH_MONTHS } from "./constants/date.js";

export const convertToEnglishDate = (text) => {
  for (let i = 0; i < DUTCH_MONTHS.length; i++) {
    if (text.includes(DUTCH_MONTHS[i])) {
      return text.replace(DUTCH_MONTHS[i], ENGLISH_MONTHS[i]);
    }
  }
  return text;
};

export const convertToStringDateList = (list) => {
  return list.map((e) => e.round);
};

export const convertToDateList = (list) => {
  return list.map((e) => new Date(e.round));
};

export const findClosestDateIndex = (list) => {
  // const today = new Date("donderdag 17 november 2022 14:30");
  const today = new Date();
  return closestIndexTo(today, list);
};

export const formatDateToString = (date) => {
  if (date) return format(date, "dd MMMM yyyy", { locale: nlBE });
  return "";
};

export const formatToCorrectDate = (text) => {
  const day = text.slice(0, 2);
  const month = text.slice(3, 5);
  const year = text.slice(6);
  const result = `${year}-${month}-${day}`;

  return new Date(result);
};
