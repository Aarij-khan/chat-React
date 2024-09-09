import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { collection, addDoc, query, where, onSnapshot  } from "firebase/firestore";
import { db } from "./firebaseConfig/firebase";

function Chat() {
  const { state } = useLocation();
  
  const [message, setmessage] = useState("");
  const [Chat, setChat] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, "Msg"), where(state.uid, "==", true),where(state.storageId, "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });

      const sortList = list.sort((a,b)=> a.createdAt - b.createdAt)
      setChat(sortList)
    });
    return () => unsubscribe()
  }, []);

  

  const sendMsg = async () => {
    try {
      const docRef = await addDoc(collection(db, "Msg"), {
        message,
        [state.storageId]: true,
        senderId: state.storageId,
        createdAt: Date.now(),
        [state.uid] : true,
      });
      console.log("Documentchale gaya ", docRef);
      setmessage("")
    } catch (e) {
      console.error("data sending Error adding document: ", e);
    }
  };

  return (
    <div>
    
      {Chat.map((e,idx)=>{
        return(
          <div className={`w-full flex  ${state.storageId == e.senderId ? "justify-end" : "justify-start"}`}>
          <div key={idx} className={`h-33 bg-green-600 border-2 w-36 rounded-xl p-2`}>
            <h1>{e.message}</h1>
            <h1>{moment(e.createdAt).startOf('second').fromNow()}</h1>
          </div>

          </div>
        )
      })}
        <div className=" w-full h-screen flex justify-center gap-4 items-end  bg-green-500">
        <input
          type="text"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          className="focus:ring-4 focus:outline-none rounded-lg p-2 w-[60vw] border-2 focus:ring-green-300 dark:focus:ring-green-800"
        />
        <button
          type="button"
          class="focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={sendMsg}
        >
          send
        </button>
        </div>
      </div>
  );
}

export default Chat;
