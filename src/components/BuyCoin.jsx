/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
// import { contractABI, contractAddress } from "../utils/Constants";
import { Context } from "../Context/ContextProvider";

import {
  useWallet,
  // InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

import Loader from "./Loader";
const BuyCoin = ({ run }) => {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const { account, signAndSubmitTransaction } = useWallet();
  const moduleAddress =
    "0x563873026c9896af342c725805826752479eee07baf65d18f04ac1e313d09b99";

  const { setReload, setHide } = useContext(Context);
  const [spinner, setSpinner] = useState(false);

  const [credits, setCredits] = useState(0);

  const increaseCredits = () => {
    setCredits((prevCredits) => prevCredits + 1);
  };

  const decreaseCredits = () => {
    setCredits((prevCredits) => Math.max(0, prevCredits - 1));
  };

  // blockchain
  const BuyCoin = async () => {
    setSpinner(true);

    if (!account) {
      console.log("Not connected");
      setSpinner(false);
      return [];
    }

    try {
      const payload = {
        data: {
          function: `${moduleAddress}::Memeverse::buy_token`,
          functionArguments: [credits],
        },
        value: Number(0.001 * credits) * 100000000,
      };

      // Sign and submit the transaction
      const response = await signAndSubmitTransaction(payload);
      console.log("Transaction sent:", response.hash);

      // Wait for the transaction to complete
      await aptos.waitForTransaction({ transactionHash: response.hash });
      console.log("Transaction mined");

      setReload((prev) => prev + 1);
      setSpinner(false);
      setHide(true);
    } catch (error) {
      console.error("Error during transaction:", error);
      setSpinner(false);
    }
  };
  return (
    <div className=" w-full h-full flex items-center justify-center">
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
      <article className="flex bg-black overflow-hidden flex-col px-4  py-3.5 rounded-2xl border border-solid border-neutral-400 max-w-[271px] ">
        <header className="flex gap-7 items-start self-end">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7192c270e419d23934658460a6dc455fd04c3a96c23e05ab6da6e1f565ccb143?placeholderIfAbsent=true&apiKey=b93734ecdcb94378af862d5b2ec71620"
            alt="Credit card illustration"
            className="object-contain shrink-0 mt-2.5 w-32 max-w-full aspect-[0.94]"
          />
          <img
            onClick={() => {
              run(false);
            }}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73c1ba757989e6d308fd98be1f9ae3e6a83ab4783c08ef4ab42e6b63c4ca9126?placeholderIfAbsent=true&apiKey=b93734ecdcb94378af862d5b2ec71620"
            alt="Credit card logo"
            className="object-contain  cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 shrink-0 aspect-square w-[29px]"
          />
        </header>
        <footer className="flex gap-5 justify-between mt-4 text-sm font-medium text-black">
          <div className="flex items-center text-white text-[1.5rem]">
            <button
              onClick={decreaseCredits}
              className="px-4 py-3 rounded-l-md border border-orange-100"
            >
              -
            </button>
            <span className="px-5 py-3 border-t border-b border-orange-100">
              {credits}
            </span>
            <button
              onClick={increaseCredits}
              className="px-4 py-3 rounded-r-md border border-orange-100"
            >
              +
            </button>
          </div>
          <div onClick={BuyCoin} className="m-auto">
            <img
              draggable={"false"}
              loading="lazy"
              className=" w-[109px] h-[42px] object-fill"
              src="https://i.imgur.com/MM8IEeK.png"
              alt=""
            />
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BuyCoin;
