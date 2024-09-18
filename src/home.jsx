import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig/firebase";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, where ,query} from "firebase/firestore";
import Navbar2 from "./navbar2";

function Home() {
  const [showList, setshowList] = useState([]);
  const [storageId, setstorageId] = useState("");

  const Navigate = useNavigate();

  function checkUsers() {
    let userId =localStorage.getItem("user")
    setstorageId(userId)
		console.log("TCL: login -> userId", userId)
    if (userId !== null) {
      Navigate("/home");
    }else{
      Navigate("/");
      
    }
  }
  useEffect(() => {
    getUsers();
    checkUsers();
  }, []);

  async function getUsers() {
    try {
      const querySnapshot = await getDocs( query(collection(db, "users"),where("uid", "!=", storageId)));

      
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
        setshowList(arr);
      });
      
      console.log("TCL: getUsers -> arr", arr)
      
    } catch (error) {
			console.log("TCL: getUsers -> error", error)
      
    }
   
  }
 
  return (
    <div>
      <Navbar2/>
      {showList.map((e, idx) => {
        return (
          <div key={idx} className="border border-gray-400 p-4 flex justify-between items-center">
             <img
            src={
                e.img ||
              "https://i.pinimg.com/1200x/cb/45/72/cb4572f19ab7505d552206ed5dfb3739.jpg"
            }
            className="w-[70px] h-[70px] object-cover rounded-full"
          />
            <div className="flex w-[55%]  items-center justify-between">
            <h1 className="text-2xl uppercase font-bold">{e.name}</h1>
            <h1 className="text-xl uppercase font-bold">{e.Email}</h1>
            </div>
            <button
          type="button"
          onClick={()=>Navigate("/chat",{state:{...e,storageId}})}
          className="w-32 focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Chat
        </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
