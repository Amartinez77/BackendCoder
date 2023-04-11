import { set, connect } from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGO_URI;

set("strictQuery", false);
const connection = connect(URL, {
  useNewUrlParser: true,
});

export default connection;
