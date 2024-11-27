import models from "../model/index.js";
import Counter from "../helper/counter.js";
import { getDate, getTime, paginationValues } from "../helper/functions.js";

export const list = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };

  const { skip, limit } = paginationValues(req.query);

  const data = await models.Category.find(condition, "date name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return new Response("Success", { data }, 200);
});

export const create = asyncErrorHandler(async (req) => {
  let { name } = req.body;
  name = name?.trim();

  if (isNull(name)) throw new Error("The field 'Name' is required", 400);

  const exists = await models.Category.findOne({
    status: 0,
    name: { $regex: name, $options: "i" },
  });
  if (exists) throw new Error(`Category with name '${name}' already exists`, 400);

  const counter = new Counter("category");
  const uniqueId = await counter.uniqueId("CT");

  await models.Category({ name, uniqueId }).save();
  counter.save();

  return new Response("Category created successfully", null, 200);
});

export const update = asyncErrorHandler(async (req) => {
  let { id, name } = req.body;
  name = name?.trim();

  if (isNull(id)) throw new Error("Invalid Id", 400);
  if (isNull(name)) throw new Error("The field 'Name' is required", 400);

  const exists = await models.Category.findOne({
    status: 0,
    _id: { $ne: id },
    name: { $regex: name, $options: "i" },
  });
  if (exists) throw new Error(`Category with name '${name}' already exists`, 400);

  const data = await models.Category.findOneAndUpdate(
    { _id: id, status: 0 },
    { name, upDate: getDate(), upTime: getTime() }
  );

  if (!data) throw new Error("No data found", 400);

  return new Response("Category updated successfully", null, 200);
});

export const del = asyncErrorHandler(async (req) => {
  const { id } = req.query;
  if (isNull(id)) throw new Error("Invalid Id", 400);

  const data = await models.Category.findOneAndUpdate({ _id: id, status: 0 }, { status: 1 });

  if (!data) throw new Error("No data found", 400);
  return new Response("Category deleted successfully", null, 200);
});

export const options = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };

  const data = await models.Category.find(condition, OPTIONS_FIELD).sort({ name: 1 }).lean();

  return new Response("Success", { count: data.length, data }, 200);
});
