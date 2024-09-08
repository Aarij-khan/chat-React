import React , {useState} from "react";
import tick from "./assets/tick.gif";
import { auth ,db} from "./firebaseConfig/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "./loader";
import {Link} from "react-router-dom"
import { doc, setDoc } from "firebase/firestore";


function Signup() {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [name, setName] = useState("");
    const signUpDatabase = () =>{
        if (Email != "" && password != "") {
          
            createUserWithEmailAndPassword(auth, Email, password)
            .then(async(res) => {
              setIsloading(true);
              const uid =res.user.uid
              localStorage.setItem("user",uid)
              setEmail("");     
              setPassword("");
              const userData = {Email,uid,name};
							console.log(" userData set hai", userData)
              await setDoc(doc(db, "users", uid ),userData);
              window.location.href = "/login";

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
            placeholder="UserName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <p className="text-white">have an account ? Login</p>
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
