import React from "react";

import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import Loader from "@/components/Loader";

import RegisterModal from "@/components/RegisterModal";
import Footer from "@/components/Footer";
import CreateButton from "../components/CreateButton";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    setMemeType,
    setNavActiveBar,
    account,
    data,
    loader,
    setReload,
    read,
  } = React.useContext(Context);


  
 
    React.useEffect(() => {
      setNavActiveBar("Home");
    }, []);
  return (
    <div className="flex overflow-clip flex-col   pt-0 bg-[#030214] pb-[0px] max-md:pb-24">
      {/* loader */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          loader ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center min-h-[70vh] ">
          <Loader run={loader} />
        </div>
      </div>
      {/* loader end*/}
      {/* Register Popup */}
      <div
        className={` top-0 left-0 w-full h-full z-40 backdrop-filter backdrop-blur-sm ${
          data?.get_user_profile == null && account && read > 0
            ? "fixed"
            : "hidden"
        } `}
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center min-h-[70vh] ">
          <RegisterModal reload={setReload} />
        </div>
      </div>
      <div className="flex flex-col  ml-0 w-full  max-md:max-w-full">
        <div className="self-stretch w-full max-md:max-w-full">
          {/* navbar
           */}
          {/* <div className="flex justify-evenly autoShow  max-md:flex-col ">
            <div className="flex flex-col  w-[17%] max-md:ml-0 max-md:w-full">
              <img
                draggable={`false`}
                loading="eager"
                srcSet="https://i.imgur.com/eVhRuU9.png"
                className="object-contain  grow shrink-0 max-w-full aspect-[1.33] w-[92px] max-md:mt-10"
              />
            </div>
            <div className="flex flex-col ml-5 mx-auto w-full max-md:ml-0 max-md:w-full">
              <div className="flex  w-max  relative right-36 gap-10 justify-between items-center  m-auto  min-w-[320px] max-md:mt-10 max-md:max-w-full">
                <div className="w-full py-2 flex gap-[51px] px-3 items-center justify-evenly relative rounded-[48px] border-[#767676] border-[1px] border-solid box-border h-[2.438rem] overflow-clip text-left text-[1.125rem] text-[#7b7b7b] font-inter">
                  <div
                    className={`w-max h-max capitalize ${
                      activeButton === "Home" ? "text-white" : ""
                    }`}
                    onClick={() => handleButtonClick("Home")}
                  >
                    {" "}
                    Home
                  </div>
                  <div
                    className={`w-max h-max capitalize   cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ${
                      activeButton === "Explore" ? "text-white" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick("Explore");
                      navigate("/explore");
                    }}
                  >
                    {" "}
                    Explore
                  </div>
                  <div
                    className={`w-max h-max capitalize  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ${
                      activeButton === "Gen Memes" ? "text-white" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick("Gen Memes");
                      navigate("/gen-memes");
                    }}
                  >
                    {" "}
                    Gen Memes
                  </div>
                  <div
                    className={`w-max h-max capitalize  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ${
                      activeButton === "Games" ? "text-white" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick("Games");
                      navigate("/games");
                    }}
                  >
                    {" "}
                    Games
                  </div>
                </div>
              </div>
              <div className="absolute right-24 top-4">
                {account?.address ? (
                  <div>
                    <div
                      className=" w-[136px]  h-[39px] 
                  "
                    >
                      <Layout>
                        <Row align="middle">
                          <Col
                            span={12}
                            style={{
                              textAlign: "right",
                              backgroundColor: "black",
                              paddingRight: "00px",
                            }}
                          >
                            <WalletSelector />
                          </Col>
                        </Row>
                      </Layout>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      onClick={() => {
                        setIsWalletOpen(true);
                      }}
                      className="w-max px-[14px] py-[9px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center justify-center relative rounded-[48px] border-[#767676] border-[1px] border-solid box-border h-[2.438rem] overflow-clip text-left text-[1.125rem] text-white font-inter"
                    >
                      <div className="hidden">
                        <WalletSelector setModalOpen={isWalletOpen} />
                      </div>

                      <div className=" capitalize font-medium">
                        Connect Wallet
                      </div>
                    </div>
                    <div
                      ref={walletSelectorRef}
                      className=" w-max hidden h-[39px] bg-
                  "
                    >
                      <Layout>
                        <Row align="middle">
                          <Col
                            span={12}
                            style={{
                              textAlign: "right",
                              backgroundColor: "black",
                              paddingRight: "200px",
                            }}
                          >
                            <WalletSelector
                              isModalOpen={isWalletOpen}
                              setModalOpen={setIsWalletOpen}
                            />
                          </Col>
                        </Row>
                      </Layout>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}
          <Navbar/>
        </div>
      </div>
      {/* first part */}
      <div className=" relative w-full h-auto ">
        {/* absolute part */}
        <div className="absolute right-0 top-[127px] overflow-visible ">
          <img
            className=" w-[282px] h-auto  object-cover "
            loading="eager"
            draggable={`false`}
            src="https://i.imgur.com/nZLvDe5.png"
            alt=""
          />
        </div>
        <div className="absolute left-0 top-[127px]">
          <img
            className=" w-[282px] h-auto  object-cover"
             loading="eager"
            draggable={`false`}
            src="https://i.imgur.com/3RSxY2q.png"
            alt=""
          />
        </div>
        <div className="absolute  top-16">
          <img  loading="eager"
            draggable={`false`} src="https://i.imgur.com/gc6vCyI.png" alt="" />
        </div>

        <div className="mt-[20px] w-full flex items-start justify-center">
          <div className="w-max mx-auto relative capitalize text-[6.875rem] font-bebas-neue text-center inline-block [filter:drop-shadow(0px_30px_60px_rgba(0,_0,_0,_0.5))] text-white">
            <span>{`create memes like a `}</span>
            <span className="text-[#ffe500] p-2 px-5 w-max  relative">
              pro
              <img
                className="absolute bottom-0 z-10 right-0 object-cover overflow-visible"
                src="https://i.imgur.com/9Rn9OMz.png"
                 loading="eager"
            draggable={`false`}
                alt=""
              />
            </span>
          </div>
        </div>
        <div>
          <div className="w-max mx-auto flex flex-col mt-5 relative text-[1.563rem] font-medium font-inter text-white text-center  h-[4.313rem]">
            {`  Get meme-fied in a snap with MEMISH. Instant laughs, zero effort.`}
            <span>{`Let's meme it!`}</span>
          </div>
        </div>

        <div
          className="
        mt-[120px] z-20 mb-[200px] flex gap-6 w-max mx-auto"
        >
          <div
            onClick={() => {
              navigate("/explore");
            }}
            className="z-20  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex w-[181px] h-[56px] col-span-1 "
          >
            <img loading="lazy" className="w-full h-auto object-contain " src="https://i.imgur.com/T6wAbDL.png" alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/gen-memes");
            }}
            className="flex z-20  w-[181px] h-[56px]   cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 "
          >
            <img
              loading="lazy"
            className="w-full h-auto object-contain "
              src="https://i.imgur.com/pvs7qNb.png" alt="" />
          </div>
        </div>

        <div className="w-max  mx-auto">
          <div className="w-max mx-auto autoShow relative text-[5.188rem] font-bebas-neue text-white text-left inline-block">
            {`Features that'll make you go "STONKS"`}
          </div>
        </div>
      </div>

      {/* second part */}
      <div className=" mt-[60px] autoShow px-[50px] grid grid-cols-12 gap-9">
        <div className=" col-span-4">
          <img
            onContextMenu={(e) => e.preventDefault()}
            draggable={"false"}
            loading="lazy"
            src="https://i.imgur.com/OHroTiG.png"
            alt=""
            className="w-full h-auto object-contain "
          />
        </div>
        <div className=" col-span-4">
          <img
            onContextMenu={(e) => e.preventDefault()}
            draggable={"false"}
            loading="lazy"
            className="w-full h-auto object-contain "
            src="https://i.imgur.com/lBKoRTd.png"
            alt=""
          />
        </div>
        <div className=" col-span-4">
          <img
            onContextMenu={(e) => e.preventDefault()}
            draggable={"false"}
            loading="lazy"
            className="w-full h-auto object-contain "
            src="https://i.imgur.com/1oyAVYf.png"
            alt=""
          />
        </div>
      </div>
      <div className=" mt-24">
        <div className="flex autoShow items-center justify-center    ">
          <img
            onClick={() => {
              navigate("/type");
            }}
            loading="lazy"
            className="w-max   cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 h-[56px]  object-cover "
            src="https://i.imgur.com/pvs7qNb.png"
            alt=""
          />
        </div>
      </div>
      {/* aptos winter school */}
      {/* <div className=" mt-[130px] autoShow w-full flex items-center justify-center">
        <div className="w-max mx-auto relative text-[1.5rem] uppercase font-semibold font-inter text-left inline-block text-white">
          <span>{`memes created in `}</span>
          <span className="text-[#00aaff]">APTOS WINTER SCHOOL</span>
          <span className="text-[#f24407]">{` `}</span>
          <span>BY MEMEVERSE</span>
        </div>
      </div> */}

      {/* Pics */}
      <div className="grid autoShow grid-cols-12 mt-10 gap-8 px-[72px]">
        <div className=" col-span-3">

          <img
            loading="lazy"
            className="w-full h-auto object-contain "
            src="https://i.imgur.com/qmS6l4q.png" alt="" />
        </div>
        <div className=" col-span-3">
          <img
            loading="lazy"
            className="w-full h-auto object-contain "
            src="https://i.imgur.com/yk5h482.jpeg"
            alt=""
          />
        </div>
        <div className=" col-span-3">
          <video
            autoPlay
            loop
            muted
            src="https://i.imgur.com/vxuWBsU.mp4"
          ></video>
        </div>
        <div className=" col-span-3">
          <img className="w-full h-auto object-contain " loading="lazy" src="https://i.imgur.com/22r1rPL.jpeg" alt="" />
        </div>
      </div>

      <div className=" mt-[67px] w-full flex flex-col items-center">
        <div className="w-max autoShow relative text-[5.188rem] font-bebas-neue text-white text-left inline-block">
          {`Features that'll make you go "STONKS"`}
        </div>
        <div
          draggable={"false"}
          className="mt-20 w-full gap-[25px] px-[60px] grid grid-cols-12"
        >
          <div
            onClick={() => {
              setMemeType(0);
              navigate("/meme-input");
            }}
            draggable={"false"}
            className=" col-span-4 autoShow flex pb-6 items-end h-[300px] bg-[url('https://i.imgur.com/OZ9aKxT.png')]  bg-contain bg-no-repeat "
          >
            <CreateButton />
          </div>
          <div
            onClick={() => {
              setMemeType(1);
              navigate("/meme-input");
            }}
            draggable={"false"}
            className=" col-span-4 autoShow  flex pb-6 items-end h-[300px] bg-[url('https://i.imgur.com/WGSFJ3k.png')]  bg-contain bg-no-repeat "
          >
            <CreateButton />
          </div>
          <div
            onClick={() => {
              setMemeType(4);
              navigate("/meme-input");
            }}
            draggable={"false"}
            className=" col-span-4 autoShow  flex pb-6 items-end h-[300px] bg-[url('https://i.imgur.com/YtU3gAr.png')]  bg-contain bg-no-repeat "
          >
            <CreateButton />
          </div>
          <div
            onClick={() => {
              setMemeType(2);
              navigate("/meme-input");
            }}
            draggable={"false"}
            className=" col-span-4 autoShow  flex pb-6 items-end h-[300px] bg-[url('https://i.imgur.com/x82rZg9.png')]  bg-contain bg-no-repeat "
          >
            <CreateButton />
          </div>
          <div
            onClick={() => {
              setMemeType(2);
              navigate("/meme-input");
            }}
            draggable={"false"}
            className=" col-span-4 autoShow  flex pb-6 items-end h-[300px] bg-[url('https://i.imgur.com/3UPPGPp.png')]  bg-contain bg-no-repeat "
          >
            <CreateButton />
          </div>
          <div
            onClick={() => {
              setMemeType(3);
              navigate("/meme-input");
            }}
            draggable={"false"}
            
            className=" col-span-4 autoShow  flex pb-6 items-end h-[300px]  bg-[url('https://i.imgur.com/Vka2jHX.png')]  bg-contain bg-no-repeat "
          >
            <CreateButton />
          </div>
        </div>
      </div>

      {/* end */}
      <div className=" mt-[116px]">
        <div className="w-[90%] mx-auto flex flex-col items-center justify-center  relative rounded-[13px] border-[#737373] border-[1px] border-solid box-border h-[15.063rem] overflow-clip text-left text-[5rem] text-[#d8d8d8] font-bebas-neue">
          <div className=" tracking-[-0.04em] [filter:drop-shadow(0px_30px_60px_rgba(0,_0,_0,_0.5))]">
            <span>{`Transform thoughts into `}</span>
            <span className="text-[#ffe500]   autoShow  ">Memes</span>
            <span> with MEMISH</span>
          </div>
          <div className="text-[1.5rem]    uppercase font-medium font-inter text-[#8d8d8d]">{`Make your self laugh on your own thoughts `}</div>
        </div>
      </div>

      <div className=" mt-20">
        <Footer />
      </div>
    </div>
  );
}
