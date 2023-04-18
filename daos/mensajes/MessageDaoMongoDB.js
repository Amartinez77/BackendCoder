import mongoDB from "../../src/configs/MongoDB.js";
import messageModel from "../../src/models/message.js";
import CrudMongoDB from "../../src/services/crudMessages.js";

class MessageDAOMongoDB extends CrudMongoDB {
  constructor() {
    super(mongoDB, messageModel);
  }
}

export default MessageDAOMongoDB;
