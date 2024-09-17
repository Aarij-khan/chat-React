import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig/firebase";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, where ,query} from "firebase/firestore";
import Navbar from "./navbar";

function Home() {
  const [showList, setshowList] = useState([]);
  const [storageId, setstorageId] = useState("");

  const Navigate = useNavigate();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // alert(`hello ${user.email.split("@")[0]}`);
  //       // window.location.href = "./home";

  //     } else {
  //       window.location.href = "./login";
  //     }
  //   });
  // }, []);
  function checkUsers() {
    let userId =localStorage.getItem("user")
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
      var getId =  localStorage.getItem("user");
      setstorageId(getId)
      const querySnapshot = await getDocs( query(collection(db, "users"),where("uid" , "!=" ,getId)));
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
      <Navbar/>
      {showList.map((e, idx) => {
        return (
          <div key={idx} className="border border-gray-400 p-4 flex justify-between items-center">
            <div className="flex w-[55%]  items-center justify-between">
            <h1 className="text-3xl">{e.name}</h1>
            <h1 className="text-xl">{e.Email}</h1>
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
