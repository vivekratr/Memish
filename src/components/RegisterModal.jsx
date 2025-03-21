import  { useState, useRef, useContext } from "react";
import {
  useWallet,
  // InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import { Context } from "../Context/ContextProvider";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

import axios from "axios";
import Loader from "./Loader";

const RegisterModal = () => {
 const aptosConfig = new AptosConfig({ network: Network.TESTNET });
 const aptos = new Aptos(aptosConfig);
 const { account, signAndSubmitTransaction } = useWallet();
 const moduleAddress =
   "0x563873026c9896af342c725805826752479eee07baf65d18f04ac1e313d09b99";

   const [spinner, setSpinner] = useState(false);
   const [hide, setHide] = useState(false);
   const fileInputRef = useRef(null);
   const [image, setImage] = useState(null);
   const [fullName, setFullName] = useState("");
   const [username, setUsername] = useState("");
  const [interests, setInterests] = useState("");
   const { setReload } = useContext(Context);

  
  const handleImageGen2 = async () => {
    setSpinner(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      // console.log(import.meta.env)
      const response = await axios.post(
        // import.meta.env.VITE_SERVER_URL + `/uploadimage`,
        "https://memish.onrender.com/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("response", response.data.link_preview);

      // setImgUrl(response.data.link_preview);

      // handleUpload();
      setSpinner(false);
      return response.data.link_preview;
    } catch (error) {
      setSpinner(false);

      console.error("Error sending POST request:", error);
    }
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      // reader.onload = (e) => {
      //   // setSelectedImage(e.target.result);
      // };
      reader.readAsDataURL(file);
    }
  };
  const handleInterestsChange = (event) => {
    const value = event.target.value;
    const interestsArray = value.split(",").map((item) => item.trim());
    setInterests(interestsArray);
  };

  // blockchain
   const addNewList = async (pic) => {
     setSpinner(true);
     if (!account) {
       console.log("not connected");
       setSpinner(false);
       return [];
     }

     const transaction = {
       data: {
         function: `${moduleAddress}::Memeverse::register_user`,
         functionArguments: [fullName, username, pic, interests],
       },
     };
     try {
       // sign and submit transaction to chain
       const response = await signAndSubmitTransaction(transaction);
       console.log(response);
       // wait for transaction
       await aptos.waitForTransaction({ transactionHash: response.hash });
       setSpinner(false);
       setHide(true);
       setReload((prev) => {
         return prev + 1;
       });
     } catch (error) {
       console.log(error)
       setSpinner(false);
     }
   };
  return (
    <div>
      <div className="max-w-[80%] w-max px-[65px] py-[61px] mx-auto relative rounded-lg bg-[#4c4c4c69] h-[29.063rem] overflow-hidden text-left text-[0.875rem] text-[#9ca3af] font-inter">
        <div className="grid grid-cols-12 gap-[70px]">
          <div className=" col-span-6">
            <div className=" w-[343px] h-[343px] ">
              <img draggable="false" className="w-full h-auto object-contain " src="https://i.imgur.com/TdsO6XE.jpeg" alt="meme" />
            </div>
          </div>
          <div className=" col-span-6">
            <div
              className={`  relative flex flex-col  ${hide ? "hidden" : ""} `}
            >
              {/* loader */}
              <div
                className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
                  spinner ? "fixed" : "hidden"
                } `}
              >
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center min-h-[70vh] ">
                  <Loader run={spinner} />
                </div>
              </div>
              {/* loader end*/}

              <div className="w-[6rem] pb-[0px] relative text-[1.375rem] font-semibold font-inter text-white text-left inline-block">
                Join now
              </div>
              <div className="w-[12.625rem] pb-1 relative text-[0.75rem] font-inter text-white text-left inline-block">
                Create Memes in one click!
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full  text-black relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] p-2 placeholder:text-gray-400 font-inter"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full mb-3 text-black relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] p-2  placeholder:text-gray-400 font-inter"
                />
              </div>
              <div className="mb-1">
                <input
                  type="text"
                  placeholder="Your Interests"
                  value={interests.length > 0 ? interests.join(", ") : ""}
                  onChange={handleInterestsChange}
                  className="w-full text-black  relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] p-2 placeholder:text-gray-400 font-inter"
                />
              </div>
              <div
                className=" my-3
          "
              >
                <img
                  onClick={handleImageClick}
                  draggable={`false`}
                  loading="lazy"
                  className="w-full h-auto object-contain "
                  src="https://i.imgur.com/UZVnkAt.png"
                  alt=""
                />
                {/* image and submit */}
                <div className="flex justify-between px-4 pb-3 items-center">
                  <div className=" cursor-pointer">
                    {/* <img
              className=" w-[26px] object-cover  "
              src={`${!selectedImage ? "https://i.imgur.com/lfZjBZs.png" : ""}`}
              alt=""
            /> */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                {/* <div
                  onClick={async () => {
                    setSpinner(true);
                    let url = await handleImageGen2();
                    addNewList(url);
                  }}
                  className="w-[181px] mx-auto cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center justify-center relative rounded-[97px] bg-[#1D9BF0] box-border h-[2.063rem] overflow-hidden text-left text-[1.125rem] text-white font-inter border-t-[1px] border-solid border-[#A1C2FF] border-r-[1px] border-l-[1px]"
                >
                  <div className="font-semibold">Register</div>
                </div> */}

                <div
                  onClick={async () => {
                    setSpinner(true);
                    let url = await handleImageGen2();
                    addNewList(url);
                  }}
                  className="w-full flex items-center justify-center relative bg-[#6B09D6] h-[2.813rem] overflow-hidden text-left text-[1rem] text-white font-inter"
                >
                  <b className="">Signup</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal
