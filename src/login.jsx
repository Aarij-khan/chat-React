import React from "react";
import tick from "./assets/tick.gif";
import { useState ,useEffect} from "react";
import { auth } from "./firebaseConfig/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";

function login() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  
 const navigate = useNavigate();

  useEffect(()=>{
    let userId =localStorage.getItem("user")
		console.log("TCL: login -> userId", userId)
    if (userId !== null) {
      navigate("/home");
    }else{
      navigate("/");
      
    }
  },[navigate])
  
  const loginToDatabase = () => {

    if (Email != "" && password != "") {
    
      setIsloading(true)
      signInWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
            const uid =userCredential.user.uid
						console.log("uid localStorage mai gayi", uid)
            localStorage.setItem("user",uid)
            console.log(userCredential)
            window.location.href = "./home"
            setEmail("");
            setPassword("");

        })
        setIsloading(false)
        .catch((error) => {
         alert(error.message);
         setIsloading(false)
        });
    }else{
      alert("enter fields")
    }
  };

  return (
    <div>
      <div className="w-full h-[100vh] bg-yellow-700 flex items-center justify-center">
        <div className="flex flex-col gap-6 items-center ">
          <img src={tick} className="h-[190px] w-[350px] object-contain" />
          <input
            type="email"
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
          <Link to="/signup">
          <p className="text-white">Don't have an account ?<span className="text-blue-700"> sign up</span></p>
          </Link>
          {isloading ? (
            <Loader />
          ) : (
            <button
              className="border-2 p-3 bg-white rounded-lg w-[200px] hover:bg-teal-400 font-bold "
              onClick={loginToDatabase}
            >
              Login
            </button>
          )}
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
}

export default login;
