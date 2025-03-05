import React, { useRef, useState } from "react";
import { Context } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Col, Layout, Row } from "antd";

const Navbar = () => {
    const walletSelectorRef = useRef(null);
    const [isWalletOpen, setIsWalletOpen] = useState(false);
  const { navActiveBar, setNavActiveBar,account } = React.useContext(Context);
  const handleButtonClick = (buttonName) => {
    setNavActiveBar(buttonName);
    };
    const navigate = useNavigate();

  return (
    <div className="self-stretch  pt-5 w-full max-md:max-w-full">
      {/* navbar
       */}
      <div className="flex justify-evenly px-12  max-md:flex-col ">
        <div className="flex flex-col  mx-auto max-md:ml-0 max-md:w-full">
          <img
            draggable={`false`}
            loading="eager"
            srcSet="https://i.imgur.com/eVhRuU9.png"
            className="object-contain grow shrink-0 max-w-full aspect-[1.33] w-[92px] max-md:mt-10"
            // className="object-contain grow shrink-0 max-w-full aspect-[1.33] w-[162px] max-md:mt-10"
          />
        </div>
        <div className="flex flex-col ml-44 mx-auto w-full max-md:ml-0 max-md:w-full">
          <div className="flex  w-max  relative right-36 gap-10 justify-between items-center  m-auto  min-w-[320px] max-md:mt-10 max-md:max-w-full">
            <div className="w-full py-2 flex gap-[51px] px-3 items-center justify-evenly relative rounded-[48px] border-[#767676] border-[1px] border-solid box-border h-[2.438rem] overflow-hidden text-left text-[1.125rem] text-[#7b7b7b] font-inter">
              <div
                className={`w-max h-max capitalize  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ${
                  navActiveBar === "Home" ? "text-white" : ""
                }`}
                onClick={() => {
                  handleButtonClick("Home");
                  navigate("/");
                }}
              >
                {" "}
                Home
              </div>
              <div
                className={`w-max h-max capitalize   cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ${
                  navActiveBar === "Explore" ? "text-white" : ""
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
                  navActiveBar === "Gen Memes" ? "text-white" : ""
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
                  navActiveBar === "Games" ? "text-white" : ""
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
          {/* wallet */}
          <div className="absolute right-16 top-8">
            {account?.address ? (
              <div onClick={() => {
                navigate('/profile')
              }}>
                <div className="w-max px-[14px] py-[9px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center justify-center relative rounded-[48px] border-[#767676] border-[1px] border-solid box-border h-[2.438rem] overflow-hidden text-left text-[1.125rem] text-white font-inter">
                  <div className=" capitalize font-medium">Profile</div>
                </div>
              </div>
            ) : (
              <div>
                <div
                  onClick={() => {
                    setIsWalletOpen(true);
                  }}
                  className="w-max px-[14px] py-[9px]  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 flex items-center justify-center relative rounded-[48px] border-[#767676] border-[1px] border-solid box-border h-[2.438rem] overflow-hidden text-left text-[1.125rem] text-white font-inter"
                >
                  <div className=" capitalize font-medium">Connect Wallet</div>
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
                          // Add any wallet sorting options as props here if needed
                        />
                      </Col>
                    </Row>
                  </Layout>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
