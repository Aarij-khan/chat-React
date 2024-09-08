import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig/firebase";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

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
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    var getId = localStorage.getItem("user")
    setstorageId(getId)
    const querySnapshot = await getDocs(collection(db, "users"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
      setshowList(arr);
    });
  }
  const logoutBtn = () => {
    localStorage.removeItem("user");
    Navigate("/login");
  }
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AARIJ-CHAT-APP
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            ></svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <Link to="/chat">
                <li>
                  <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Chat
                  </a>
                </li>
              </Link>
              <li onClick={logoutBtn } className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  logout
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
          class="w-32 focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
