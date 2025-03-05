import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Network } from "@aptos-labs/ts-sdk";

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

const wallets = [new PetraWallet()];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider
      dappConfig={{
        network: Network.TESTNET,
        aptosConnectDappId: "2e6d49d4-3a86-417a-8b0c-042d5e3d75d0",
      }}
      plugins={wallets}
      autoConnect={false}
    >
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);
