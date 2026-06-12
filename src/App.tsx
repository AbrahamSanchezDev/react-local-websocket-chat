import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChatWebSocket from "./components/ChatWebSocket/ChatWebSocket";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />  

         <ChatWebSocket/>
         
      </header>
    </div>
  );
}

export default App;
