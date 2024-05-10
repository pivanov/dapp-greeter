import { ethers, Signer } from 'ethers';
import { useState, useEffect, useCallback, useRef } from 'react';
import GreeterABI from './abis/Greeter.json';
import { cn } from './utils/helpers';

const greeterAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export const Greeter = () => {

  const refInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    fetchGreeting();
  }, [])

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getMessageCount() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, GreeterABI.abi, provider);
      const signer: Signer = await provider.getSigner(); // Ensure the signer is of type Signer
      try {
        const contractWithSigner = contract.connect(signer) as any; // Cast it to your custom interface
        const count = await contractWithSigner.getCount();
        setMessageCount(count.toString());


        // const tx = await contractWithSigner.getMessageCount();
        // const receipt = await tx.wait();

        // let count: string | undefined;

        // receipt.logs?.forEach((log: any) => {
        //   const parsedLog = contract.interface.parseLog(log);
        //   if (parsedLog?.name === "CountRetrieved") {
        //     count = parsedLog.args.count?.toString();
        //   }
        // });

        // console.log('@@@ count', count);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const fetchGreeting = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();  // Ensures the signer is the user
      const contractWithSigner = new ethers.Contract(greeterAddress, GreeterABI.abi, signer);

      try {
        const message = await contractWithSigner.greet();
        setMessage(message);

        const count = await contractWithSigner.getCount();
        setMessageCount(count.toString());
      } catch (error) {
        console.log(error);
      }
    }
  }, [message]);

  const setGreeting = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newMessage = refInput.current?.value;
    setIsLoading(true);
    (refInput.current as HTMLInputElement).value = '';

    if (typeof window.ethereum !== 'undefined' && newMessage) {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer: Signer = await provider.getSigner(); // Ensure the signer is of type Signer
      const contract = new ethers.Contract(greeterAddress, GreeterABI.abi, signer);

      try {
        const transaction = await contract.setGreeting(newMessage);

        await transaction.wait();
      } catch (error) {
        setIsLoading(false);
        (refInput.current as HTMLInputElement).value = message;
        return;
      }
    }

    fetchGreeting();
    setIsLoading(false);
  }, [message]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg w-full max-w-md">
        <div className="p-6 pt-4 relative">
          {
            !isLoading && (
              <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">Current greeting message</h3>
            )
          }

          <div className="relative flex gap-x-3 max-w-xl text-sm text-gray-500">
            <span
              className={cn(
                "flex items-center justify-center",
                "px-2 h-6",
                "whitespace-nowrap text-xs font-bold text-white",
                "bg-green-500 rounded-md"
              )}>
              # {messageCount}
            </span>
            {
              isLoading
                ? (
                  <div
                    className={cn(
                      "absolute bg-white w-full h-full inset-0 min-h-8"
                    )}
                  >
                    <div
                      role="status"
                      className="absolute -translate-y-1/2 top-2/4"
                    >
                      <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    </div>
                  </div>
                )
                : (
                  <p className='pt-0.5'>{message}</p>
                )
            }
          </div>

          <hr className='my-4' />

          <div className="mt-2 max-w-xl text-sm text-gray-400">
            <p>Change the greeting message.</p>
          </div>
          <form className="mt-2 sm:flex sm:items-center justify-between">
            <div className="w-full">
              <input
                ref={refInput}
                type="text"
                name="message"
                id="message"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Hello :)"
              />
            </div>
            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              onClick={setGreeting}
            >
              Save
            </button>

            {/* <button onClick={getMessageCount}>getMessageCount</button> */}
          </form>
        </div>
      </div>
    </>
  );
};

Greeter.displayName = 'Greeter';
