import Message from "../models/message.js";

async function saveMessage(user, text) {
  const message = new Message({ user, text });
  await message.save();
}

export default saveMessage;
