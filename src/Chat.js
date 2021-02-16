import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Call from "@material-ui/icons/Call";
import Search from "@material-ui/icons/Search";
import MoreVert from "@material-ui/icons/MoreVert";
import firebase from "firebase";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Send from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([{}]);

  // useEffect(() => {

  // }, [])

  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages != null]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => {
              console.log(doc.id);
              return {
                data: doc.data(),
                ID: doc.id,
              };
            })
          )
        );
    }
  }, [roomId]);

  const sendMessages = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="header__left">
          <h3>{roomName}</h3>
          <p>
            {new Date(
              messages[messages.length - 1]?.data?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="header__right">
          <Call />
          <Search />
          <MoreVert />
        </div>
      </div>
      <div className="chat__body">
        {messages.map(({ data, ID }) => (
          <div
            ref={messageRef}
            key={ID}
            className={`chat__messages ${
              user.displayName === data?.name && "chat__reciver"
            } `}
          >
            <p className="user__name">{data?.name}</p>
            <p>
              {data?.message}{" "}
              <span className="time__stamp">
                {new Date(data?.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Write a message"
          />
          <Button type="submit" onClick={sendMessages}>
            <Send />{" "}
          </Button>
        </form>

        {/* <Send /> */}
      </div>
    </div>
  );
}

export default Chat;
