class MessageDTO {
  constructor(message) {
    this.id = message.autor;
    this.mensaje = message.text;
    this.timestamp = message.timestamp;
  }
}

export default MessageDTO;

/*
DTO: normaliza los valores, para obtener siempre la misma estructura sin importar la persistencia (MongoDB, SQL, etc).
MongoDB:
    _id: new ObjectId("6352fc524338bbbb986959b8"),
    author: {
      id: 'gaston',
      nombre: 'Hard-code: Nombre del usuario',
      apellido: 'Hard-code: Apellido del usuario',
      edad: 'Hard-code: Edad',
      alias: 'Hard-code: alias del usuario',
      avatar: 'Hard-code: url avatar'
    },
    text: { id: new ObjectId("6352fc524338bbbb986959b7"), mensaje: 'a' }
  }
*/
