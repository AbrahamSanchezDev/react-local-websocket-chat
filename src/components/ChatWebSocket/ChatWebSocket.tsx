import React from "react";
import "./ChatWebSocket.css";
import { FiSend } from "react-icons/fi";
import { useState, useEffect } from "react";

function ChatWebSocket() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8087");
    newSocket.onmessage = (event) => {
      event.data.text().then((text: string) => {
        console.log(text);

        setMensajes((prevMensajes) => [...prevMensajes, text]);
      });
    };
    newSocket.onclose = () => {
      console.log("desconectado");
    };
    setSocket(newSocket);
  }, []);

  const renderMsgs = () => {
    return (
      <>
        {mensajes.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </>
    );
  };

  const mandarMensaje = () => {
    if (socket && mensaje.trim()) {
      socket.send(mensaje);
      setMensaje("");
    }
  };

  return (
    <>
      <div className="chat">
        <div className="chat-header">Mensageria mediante WebSocket</div>
        {/* bucle que muestre mensajes */}
        <div className="chat-message">
          mensajes:
          {renderMsgs()}
        </div>
        <div className="chat-sender">
          <input
            type="text"
            className="chat-send"
            value={mensaje}
            onChange={(evento) => {
              setMensaje(evento.target.value);
            }}
            onKeyDown={(evento) => {
              if (evento.key === "Enter") {
                mandarMensaje();
              }
            }}
          />
          <FiSend onClick={mandarMensaje} />
        </div>
      </div>
    </>
  );
}

export default ChatWebSocket;
