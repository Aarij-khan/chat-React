import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig/firebase";
import { useState } from "react";

function Navbar2() {
  const [Img, setImg] = useState("");
  const Navigate = useNavigate();
  const logoutBtn = () => {
    localStorage.removeItem("user");
    Navigate("/");
  };

  async function getNavbardata() {
    let localId = await localStorage.getItem("user");
    console.log("🚀 ~ getNavbardata ~ localId:", localId);
    const docRef = doc(db, "users", localId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setImg(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  useEffect(() => {
    getNavbardata();
  }, []);
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div
          className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4`}
        >
          <div className="flex justify-center items-center gap-2">
            <img
              src={Img.img}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <h6 className="font-bold">{Img.name}</h6>
          </div>
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span
              className={`self-center text-2xl font-semibold whitespace-nowrap dark:text-white uppercase `}
            >
              chat-app
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
              <Link to={"/home"}>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
              </Link>
              <Link to="/profile">
                <li>
                  <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Profile
                  </a>
                </li>
              </Link>

              <li
                onClick={logoutBtn}
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                logout
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar2;
