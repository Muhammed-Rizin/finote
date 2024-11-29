import { get, post, patch } from "../config/api";

export const list = async () => await get(`category`);
export const create = async (props) => await post(`category`, props);
export const update = async (props) => await patch(`category`, props);

export const options = async (props) => await get(`category/options`, props);
