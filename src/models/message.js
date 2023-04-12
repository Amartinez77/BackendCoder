import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = model("Message", messageSchema);

export default Message;
