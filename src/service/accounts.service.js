import { get, post, patch } from "../config/api";

export const list = async () => await get(`accounts`);
export const create = async (props) => await post(`accounts`, props);
export const update = async (props) => await patch(`accounts`, props);

export const options = async (props) => await get(`accounts/options`, props);
