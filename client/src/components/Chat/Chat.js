import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const ENDPOINT = "https://chat-app-backend-c8sp.onrender.com";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name: name, room: room }, (error) => {
      // alert(error);
    });

    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.once("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      console.log(message);
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // console.log(message, messages);
  return (
    <>
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
