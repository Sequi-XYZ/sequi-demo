
import LitJsSdk from "@lit-protocol/sdk-browser";
import { useRef, useState } from "react";
import { Button, ChangeBu, Header, InputPost, Post, Posts } from "./Styles";


export default function App() {
    const [encryptedSymetricKey, setEncryptedKey] = useState("");
    const [encryptedStringS, setencryptedString] = useState("");
    const [messageC, setMessage] = useState("Create a new Post");
    const [bought, setBought] = useState(false);
    const [buyer, setBuyer] = useState(false);
    const InputMessage = useRef(null);
    const chain = "goerli";

    async function connect() {
        const client = await new LitJsSdk.LitNodeClient();
        window.litNodeClient = client;
        const tx = await client.connect();
        var authSig = await LitJsSdk.checkAndSignAuthMessage({
            chain: "goerli",
        });
    }
    const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: "goerli",
          method: "eth_getBalance",
          parameters: [":userAddress", "latest"],
          returnValueTest: {
            comparator: ">=",
            value: "1000000000000", // 0.000001 ETH
          },
        },
      ];
    async function signing() {
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
           `${InputMessage.current.value}`
          );
        
          setMessage(InputMessage.current.value);
        const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
            accessControlConditions,
            symmetricKey,
            authSig,
            chain,
        })
        console.log(`${encryptedSymmetricKey} ------ ENCRYPTED symetric KEY`);
        setEncryptedKey(`${LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")}`);
        setencryptedString(encryptedString);
        console.log(`${encryptedStringS} ----------- STRING`);

        return {
            encryptedString,
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        }
    }

    async function decrypt() {
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "goerli" });
        const symmetricKey = await window.litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt: encryptedSymetricKey,
        chain,
        authSig,
      });
      const decryptedString = await LitJsSdk.decryptString(
        encryptedStringS,
        symmetricKey
      );
      console.log(decryptedString)
      if(decryptedString == messageC) {
        setBought(true);
      }

  return { decryptedString }
    }





    return (
        <>
         <Header>

         <Button  onClick={() => connect()}>
            Connect
        </Button>
      <InputPost placeholder="Tweet" ref={InputMessage}>
                
            </InputPost>
        <Button  onClick={() => signing()}>
            Post
        </Button>
            <Button onClick={() => decrypt()}>
                Decode
            </Button>
         </Header>

         <Posts>
<Post>
    {messageC != undefined ? 
    <>
    </> : 
    "Create a Post"
    }

    {buyer ? 
<>
{bought ? messageC : "Pay Content"}
</>    
:
<>
{messageC}
</>
}
</Post>
 
 <ChangeBu onClick={() => setBuyer(!buyer)}>
   Change
 </ChangeBu>
         </Posts>
 

        </>
    )
}