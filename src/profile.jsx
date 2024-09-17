import React, { useEffect } from "react";
import Navbar from "./navbar";
import { storage ,db } from "./firebaseConfig/firebase";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [pic, setPic] = useState("");
  const [Userinfo, setUserinfo] = useState({});
  const handleImage = (e) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    console.log("🚀 objectURL:", objectURL);
    setPic(objectURL);
  };

  async function getprofileUsers() {
    let localId = await localStorage.getItem("user");
    console.log("🚀 ~ getprofileUsers ~ localId:", localId);
    const docRef = doc(db, "users", localId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setUserinfo(docSnap.data());
        
    } else {
      console.log("No such document!");
    }
  }
  useEffect(() => {
    getprofileUsers();
  }, []);
  return (
    <div>
      <Navbar />

      <div className="flex w-full justify-center items-center flex-col">
        <label className="flex w-full justify-center items-center gap-5 flex-col">
          <img
            src={
              pic ||
              "https://i.pinimg.com/1200x/cb/45/72/cb4572f19ab7505d552206ed5dfb3739.jpg"
            }
            className="w-[25%]"
          />
          <label
            htmlFor="img"
            className="w-[200px] bg-purple-400 p-2 rounded-lg text-white cursor-pointer block text-center"
          >
            Upload
          </label>
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={handleImage}
          />
        </label>
        <div className="w-full flex flex-col gap-6 justify-center items-center text-3xl mt-10">
 
            <h1 className="uppercase">Name: {Userinfo.name}</h1>
            <h1>Email: {Userinfo.Email}</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
