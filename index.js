//este es un server y se ejecuta con node index.js
const webSocket = require("ws");

const ws = new webSocket.Server({ port: 8087 });

ws.on("connection", (wss) => {
  console.log("Un nuevo usuario conectado");
  wss.on("message", (data) => {
    console.log(`message:${data}`);
    ws.clients.forEach((cliente) => {
      if (cliente != wss && cliente.readyState == webSocket.OPEN) {
        cliente.send(data);
      }
    });
  });
  wss.on("close", () => {
    console.log("usuario desconectado");
  });
});
console.log(`server funcionando`);
