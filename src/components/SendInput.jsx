import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "../store/useChatStore";

const SendInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });

      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <form onSubmit={handleSendMessage} className="px-4 my-3">
      <div className="w-full relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
