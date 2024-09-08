import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Chat() {
  const { state } = useLocation();
  const [message, setmessage] = useState("");

  return (
    <div>
      <div className="h-screen w-full flex justify-center gap-4 items-end pb-4 bg-green-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          className="focus:ring-4 focus:outline-none rounded-lg p-2 w-[60vw] border-2 focus:ring-green-300 dark:focus:ring-green-800"
        />
        <button
          type="button"
          class="focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          send
        </button>
      </div>
    </div>
  );
}

export default Chat;
