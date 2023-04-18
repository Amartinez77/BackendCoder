// const ProductosDAOMongoDB = require(`./productos/ProductosDAOMongoDB`);
// const CarritoDAOMongoDB = require(`./carritos/CarritoDAOMongoDB`);
// const OrdenesDAOMongoDB = require(`./ordenes/OrdenesDAOMongoDB`);
import MessagesDAOMongoDB from "./mensajes/MessageDaoMongoDB.js";

const getStorage = () => {
  const storage = `MongoDb`;
  switch (storage) {
    case `MongoDB`:
      return {
        mensajes: new MessagesDAOMongoDB(),
      };
      break;

    default:
      return {
        mensajes: new MessagesDAOMongoDB(),
      };
      break;
  }
};

export default getStorage;
