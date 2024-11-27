import models from "../model/index.js";
import Counter from "../helper/counter.js";
import { getDate, getTime, paginationValues } from "../helper/functions.js";

export const list = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };

  const { skip, limit } = paginationValues(req.query);

  const data = await models.Accounts.find(condition, "date name balance")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return new Response("Success", { data }, 200);
});

export const create = asyncErrorHandler(async (req) => {
  let { name, balance } = req.body;
  name = name?.trim();

  if (isNull(name)) throw new Error("The field 'Name' is required", 400);

  const exists = await models.Accounts.findOne({
    status: 0,
    name: { $regex: name, $options: "i" },
  });
  if (exists) throw new Error(`Account with name '${name}' already exists`, 400);

  const counter = new Counter("category");
  const uniqueId = await counter.uniqueId("CT");

  await models.Accounts({ name, balance, uniqueId }).save();
  counter.save();

  return new Response("Account created successfully", null, 200);
});

export const update = asyncErrorHandler(async (req) => {
  let { id, name, balance } = req.body;
  name = name?.trim();

  if (isNull(id)) throw new Error("Invalid Id", 400);
  if (isNull(name)) throw new Error("The field 'Name' is required", 400);

  const exists = await models.Accounts.findOne({
    status: 0,
    _id: { $ne: id },
    name: { $regex: name, $options: "i" },
  });
  if (exists) throw new Error(`Account with name '${name}' already exists`, 400);

  const data = await models.Accounts.findOneAndUpdate(
    { _id: id, status: 0 },
    { name, balance, upDate: getDate(), upTime: getTime() }
  );

  if (!data) throw new Error("No data found", 400);

  return new Response("Account updated successfully", null, 200);
});

export const del = asyncErrorHandler(async (req) => {
  const { id } = req.query;
  if (isNull(id)) throw new Error("Invalid Id", 400);

  const data = await models.Accounts.findOneAndUpdate({ _id: id, status: 0 }, { status: 1 });

  if (!data) throw new Error("No data found", 400);
  return new Response("Account deleted successfully", null, 200);
});
