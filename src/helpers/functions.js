import moment from "moment";
import { APP_NAME } from "../config";

export const setTitle = (name) => (document.title = `${name || ""} | ${APP_NAME} `);

export const dateConverter = (date) => {
  const isValidDate = moment(date, moment.ISO_8601, true).isValid();
  return isValidDate ? moment(date).format("DD-MM-YYYY") : "";
};

export const timeConverter = (time) => {
  const formats = ["HH:mm:ss", "HH:mm"];
  const isValidTime = moment(time, formats, true).isValid();
  return isValidTime ? moment(time, formats).format("hh:mm a") : "";
};

export const getDate = () => moment().format("YYYY-MM-DD");
export const getTime = () => moment().format("HH:mm");

export const numberToString = (number = 0) => number.toLocaleString("en-IN") || 0;
export const numberToCurrency = (number = 0) => {
  return (
    number?.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    }) || "₹0"
  );
};

export const setToken = (name, token) => {
  if (!name || !token) return;
  localStorage.setItem(name, token);
};

export const isNull = (field) => {
  return (
    field === undefined ||
    field === "undefined" ||
    field === "" ||
    field === null ||
    field === "null"
  );
};
