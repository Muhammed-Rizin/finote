import { Schema, model } from "mongoose";
import { COLLECTIONS } from "../config/collections.js";
import { getDate, getMonth, getTime } from "../helper/functions.js";

const schema = new Schema(
  {
    name: String,
    amount: { type: Number, default: 0 },
    category: [{ type: Schema.Types.ObjectId, ref: COLLECTIONS.CATEGORY }],
    user: { type: Schema.Types.ObjectId, ref: COLLECTIONS.USERS },

    remarks: String,
    uniqueId: String,

    ip: { type: String },
    status: { type: Number, default: 0 },

    date: { type: String, default: () => getDate() },
    time: { type: String, default: () => moment().format("HH:mm") },
    month: { type: String, default: () => getMonth() },

    addedDate: { type: String, default: () => getDate() },
    addedTime: { type: String, default: () => getTime() },

    upDate: { type: String, default: () => getDate() },
    upTime: { type: String, default: () => getTime() },
  },
  { timestamps: true, collection: COLLECTIONS.INCOME_EXPENSE }
);

export default model(COLLECTIONS.INCOME_EXPENSE, schema);
