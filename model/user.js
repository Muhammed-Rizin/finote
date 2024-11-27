import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { COLLECTIONS } from "../config/collections.js";
import { getDate, getTime } from "../helper/functions.js";

const schema = new Schema(
  {
    name: String,
    image: String,
    email: String,
    mobile: String,
    username: String,
    password: String,

    ip: { type: String },
    uniqueId: { type: String },

    status: { type: Number, default: 0 },
    date: { type: String, default: () => getDate() },
    time: { type: String, default: () => getTime() },

    upDate: { type: String, default: () => getDate() },
    upTime: { type: String, default: () => getTime() },
  },
  { timestamps: true, collection: COLLECTIONS.USERS }
);

schema.methods.generatePasswordHash = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

schema.methods.validatePassword = (password, hashedPassword) => {
  const res = bcrypt.compareSync(password, hashedPassword);
  return res;
};

export default model(COLLECTIONS.USERS, schema);
