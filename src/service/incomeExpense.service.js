import { get, post } from "../config/api";

export const list = async () => await get(`income-expense`);
export const create = async (props) => await post(`income-expense`, props);
