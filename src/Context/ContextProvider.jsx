import React, { useEffect, useState } from "react";
// import { contractABI, contractAddress } from "../utils/AptosverseUtils";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {
  useWallet,
  // InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";

export const Context = React.createContext();

// eslint-disable-next-line react/prop-types
export const AptosProvider = ({ children }) => {
  // wallet initialization
  // const [accountHasList, setAccountHasList] = useState(false);
  const [connected, setConnected] = useState(false);
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const { account, signAndSubmitTransaction } = useWallet();
  const [navActiveBar, setNavActiveBar] = useState("Home");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [memeType, setMemeType] = useState(0);
  const [regenerate, setRegenerate] = useState("");

  const [result, setResult] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [imgView, setImgView] = useState(null);
  const [context, setContext] = useState("");
  const [resultVideo, setResultVideo] = useState(null);


  const [reload, setReload] = useState(0);
  const [read, setRead] = useState(false);
  const [data, setData] = useState({
    view_all_posts: null,
    get_user_profile: null,
  });
  const moduleAddress =
    "0x563873026c9896af342c725805826752479eee07baf65d18f04ac1e313d09b99";

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
    try {
      const todoListResource = await aptos.getAccountResource({
        accountAddress: moduleAddress,
        resourceType: `${moduleAddress}::Memeverse::MainResource`,
      });
      // setAccountHasList(true);
      console.log(todoListResource);
      // view function
      try {
        const initialPromises = [
         
          aptos.view({
            payload: {
              function: `${moduleAddress}::Memeverse::view_all_posts`,
              typeArguments: [],
              functionArguments: [],
            },
          })
        ];

        // Check if user is registered
        const isUserRegisteredResult = await aptos.view({
          payload: {
            function: `${moduleAddress}::Memeverse::is_user_registered`,
            typeArguments: [],
            functionArguments: [account.address],
          },
        });
        console.log(isUserRegisteredResult);

        // Initialize an array to hold all promises
        let allPromises = [];
        allPromises.push(...initialPromises);
        // console.log("allpromis init",allPromises)

        if (isUserRegisteredResult[0]) {
          // If user exists, add these promises to the array
          const userSpecificPromises = [
            aptos.view({
              payload: {
                function: `${moduleAddress}::Memeverse::get_user_profile`,
                typeArguments: [],
                functionArguments: [account.address],
              },
            })
          ];

          allPromises.push(...userSpecificPromises);
        }

        // Execute all promises concurrently
        const promiseResults = await Promise.all(allPromises);

        // Assign results to corresponding keys in the data object
        setData((prevData) => ({
          ...prevData,
          view_all_posts: promiseResults[0],
          ...(isUserRegisteredResult && {
            get_user_profile: promiseResults[1],
          }),
        }));

        setRead(true);
        setConnected(true);

        console.log("gotcha", data, promiseResults);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    } catch (e) {
      // setAccountHasList(false);
      console.log(e);
    }
  };

  async function genAi(num) {
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    // \end{code}
    const payload = {
      data: {
        function: `${moduleAddress}::Memeverse::gen_image`,
        functionArguments: [num],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // spinner(false);
      return true;
    } catch (error) {
      // spinner(false);
      console.log(error);
      return false;
    }
  }
 

  async function tipBuilder(addr, _tip) {
    // spinner(true);
    console.log("tip", _tip);
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    // \end{code}
    const l = String(_tip * 100000000);
    const payload = {
      data: {
        function: `${moduleAddress}::Memeverse::tip_builders`,
        functionArguments: [addr, l],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // spinner(false);
    } catch (error) {
      // spinner(false);

      console.log(error);
    }
  }

  async function savePost(index) {
    // spinner(true);
    // console.log("tip", _tip);
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    // \end{code}
    const payload = {
      data: {
        function: `${moduleAddress}::Memeverse::save_post`,
        functionArguments: [index],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setReload((prev) => prev + 1);

      // spinner(false);
    } catch (error) {
      // spinner(false);

      console.log(error);
    }
  }

  async function createBuilderPost(
    _project_name,
    _project_description,
    _project_url,
    _demo_video_link,
    _calendly_link,
    _grants_required,
    _reason,
    _telegram_link,
    spinner
  ) {
    spinner(true);
    // console.log("answerString(", ));
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    // \end{code}
    const payload = {
      data: {
        function: `${moduleAddress}::Memeverse::create_builders_post`,
        functionArguments: [
          String(_project_name),
          String(_project_description),
          String(_project_url),
          String(_demo_video_link),
          String(_calendly_link),
          Number(_grants_required) * 100000000,
          String(_reason),
          String(_telegram_link),
        ],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      // \end{code}
      await aptos.waitForTransaction({ transactionHash: response.hash });
      spinner(false);
    } catch (error) {
      spinner(false);

      console.log(error);
    }
  }

  async function PostMeme(caption, _img_url, spin) {
    spin(true);
    console.log("caption", caption);
    console.log("imgurl", _img_url);
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    const payload = {
      data: {
        function: `${moduleAddress}::Memeverse::create_post`,
        functionArguments: [_img_url, caption],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setReload((prev) => {
        return prev + 1;
      });
      spin(false);
    } catch (error) {
      spin(false);

      console.log(error);
    }
  }

  async function getUserDataFromAddress(addr) {
    if (!account) {
      alert("Connect Wallet");
      return [];
    }

    try {
    
      const response = await aptos.view({
        payload: {
          function: `${moduleAddress}::Memeverse::get_user_profile`,
          typeArguments: [],
          functionArguments: [addr],
          //    abi:myABI
        },
      });
      console.log("getUserDataFromAddress", response[0]);
      return response[0];
    } catch (e) {
      // setAccountHasList(false);
      console.log(e);
    }
  }

 

async function isUserExist(_address) {
  if (!account) {
    alert("Connect Wallet");
    return [];
  }

  try {
    const userExists = await aptos.view({
      payload: {
        function: `${moduleAddress}::Memeverse::is_user_registered`,
        typeArguments: [],
        functionArguments: [_address],
      },
    });

    console.log("User exists:", userExists);
    return userExists[0];
  } catch (error) {
    console.error("Error checking if user exists", error);
    return;
  }
}

  async function likePost(index) {
    if (!account) {
      alert("Connect Wallet");
      return [];
    }
    const payload = {
      data: {
        function: `${moduleAddress}::Memeverse::like_post`,
        functionArguments: [index],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      console.log(response);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      // setReload((prev) => {
      //   return prev + 1;
      // });
      setReload(prev=>prev+1)
    } catch (error) {
      console.log(error);
    }
  }

  // function formatAMPM(date) {
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   let ampm = hours >= 12 ? "pm" : "am";
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // The hour '0' should be '12'
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   let strTime = hours + ":" + minutes + " " + ampm;
  //   return strTime;
  // }
  // function formatDate(date) {
  //   const day = date.getDate();
  //   const monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   const month = monthNames[date.getMonth()];
  //   const year = date.getFullYear();

  //   return `${day}-${month}-${year}`;
  // }

 

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, reload]);
  // wallet initialization end

  return (
    <Context.Provider
      value={{
        setReload,
        getUserDataFromAddress,
        likePost,
        PostMeme,
        genAi,
        createBuilderPost,
        tipBuilder,
        savePost,
        setRegenerate,
        setContext,
        setMemeType,
        setImage,
        setNavActiveBar,
        setLoader,
        setResult,
        setDownloadLink,
        setResultVideo,
        setImgView,isUserExist,
        context,
        memeType,
        image,
        loader,
        result,
        data,
        downloadLink,
        imgView,
        resultVideo,
        account,
        regenerate,
        connected,
        read,
        navActiveBar,
      }}

    >
      {children}
    </Context.Provider>
  );
};
