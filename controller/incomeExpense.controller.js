import models from "../model/index.js";
import Counter from "../helper/counter.js";

import { TYPES } from "../config/index.js";
import { getDate, getTime, paginationValues } from "../helper/functions.js";

export const list = asyncErrorHandler(async (req) => {
  const condition = { status: 0 };

  const { skip, limit } = paginationValues(req.query);

  const data = await models.IncomeExpense.find(condition, "date time amount remarks")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("category", "name")
    .lean();

  return new Response("Success", { data }, 200);
});

export const create = asyncErrorHandler(async (req) => {
  let { type, date, time, amount, category, remarks } = req.body;
  remarks = remarks?.trim();
  amount = Number(amount);

  if (isNull(type)) throw new Error("The field 'Type' is required", 400);
  if (isNull(category)) throw new Error("The field 'Category' is required", 400);
  if (isNull(amount) || isNaN(amount) || amount <= 0)
    throw new Error("The field 'Amount' is required", 400);

  const counter = new Counter("category");
  const uniqueId = await counter.uniqueId("CT");

  await models.IncomeExpense({ type, date, time, amount, category, remarks, uniqueId }).save();
  counter.save();

  return new Response(
    `${type === TYPES.INCOME ? "Income" : "Expense"} created successfully`,
    null,
    200
  );
});

export const update = asyncErrorHandler(async (req) => {
  let { id, type, date, time, amount, category, remarks } = req.body;
  remarks = remarks?.trim();
  amount = isNaN(amount);

  if (isNull(id)) throw new Error("Invalid Id", 400);
  if (isNull(type)) throw new Error("The field 'Type' is required", 400);
  if (isNull(category)) throw new Error("The field 'Category' is required", 400);
  if (isNull(amount) || isNaN(amount) || amount <= 0)
    throw new Error("The field 'Amount' is required", 400);

  const data = await models.IncomeExpense.findOneAndUpdate(
    { _id: id, status: 0 },
    { type, date, time, amount, category, remarks, upDate: getDate(), upTime: getTime() }
  );

  if (!data) throw new Error("No data found", 400);

  return new Response(
    `${type === TYPES.INCOME ? "Income" : "Expense"} updated successfully`,
    null,
    200
  );
});

export const del = asyncErrorHandler(async (req) => {
  const { id } = req.query;
  if (isNull(id)) throw new Error("Invalid Id", 400);

  const data = await models.IncomeExpense.findOneAndUpdate({ _id: id, status: 0 }, { status: 1 });

  if (!data) throw new Error("No data found", 400);
  return new Response(
    `${data.type === TYPES.INCOME ? "Income" : "Expense"} deleted successfully`,
    null,
    200
  );
});
