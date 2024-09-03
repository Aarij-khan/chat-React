import React , {useState} from "react";
import tick from "./assets/tick.gif";
import { auth } from "./firebaseConfig/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "./loader";
import login from "./login";
import {Link} from "react-router-dom"


function Signup() {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, setIsloading] = useState(false);
    const signUpDatabase = () =>{
        if (Email != "" && password != "") {
          setIsloading(true)
            createUserWithEmailAndPassword(auth, Email, password)
            .then((userCredential) => {
              console.log(userCredential)
              window.location.href = "/";
              alert("Signup sucessfull")
              setEmail("");     
              setPassword("");

            })
            .catch((error) => {
              alert(error.message);
              setIsloading(false)
            }); 
        }else{
            alert("Enter values")
        }

    }
  return (
    <div>
      <div className="w-full h-[100vh] bg-teal-700 flex items-center justify-center">
        <div className="flex flex-col gap-6 items-center ">
          <img src={tick} className="h-[190px] w-[350px] object-contain" />
          <input
            type="text"
            className="w-[300px] h-[45px] sm:h-[45px] sm:w-[400px] rounded-lg p-1"
            placeholder="Enter Email address"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-[300px] h-[45px] sm:h-[45px] sm:w-[400px] rounded-lg p-1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <Link to="/">
          <p className="text-white">have an account??</p>
          </Link>
          {isloading ? (
            <Loader />
          ) : (
            <button
              className="border-2 p-3 bg-white rounded-lg w-[200px] hover:bg-teal-400 font-bold "
              onClick={signUpDatabase}
            >
              Signup
            </button>
          )}
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
