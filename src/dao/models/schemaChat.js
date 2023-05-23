import mongoose from "mongoose";

export const schemaChat = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true }
}, { versionKey: false });
