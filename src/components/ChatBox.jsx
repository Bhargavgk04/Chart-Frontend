import React, { useEffect, useRef } from "react";
import SendInput from "./SendInput";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const defaultMaleImage = "/assets/default-male.jpg";
const defaultFemaleImage = "/assets/default-female.jpg";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white">
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img
            src={selectedUser?.gender === "male" ? defaultMaleImage : defaultFemaleImage}
            alt="User Profile"
          />
        </div>
      </div>
      <div>
        <p className="font-bold">{selectedUser?.fullname}</p>
        <p className="text-xs opacity-70">{isOnline ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
};

const Message = ({ message, authUserId }) => {
  const isOwnMessage = message.senderId === authUserId;

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} w-full my-2`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 break-words ${
          isOwnMessage
            ? 'bg-blue-500 text-white ml-auto rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.text || message.content}</p>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    console.log('Messages:', messages);
    console.log('Auth User ID:', authUser?._id);
  }, [messages, authUser]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              authUserId={authUser?._id}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet</p>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <SendInput />
    </div>
  );
};

export default ChatBox;
