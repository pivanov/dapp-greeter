import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import GreeterABI from './abis/Greeter.json';

const greeterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const Greeter = () => {
  const [greeter, setGreeterValue] = useState('');

  useEffect(() => {
    fetchGreeting();
  }, [])


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, GreeterABI.abi, provider);
      try {
        const data = await contract.greet();
        console.log('@@@ data', data);
        setGreeterValue(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const setGreeting = async () => {
    if (!greeter) {
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, GreeterABI.abi, signer);
      const transaction = await contract.setGreeting(greeter);
      setGreeterValue('');
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <h1>Test DAPP</h1>
      <h3>m: {greeter}</h3>

      <input type='text' onChange={e => setGreeterValue(e.target.value)} />
      <button onClick={setGreeting}>Send</button>

    </div>
  );
};


Greeter.displayName = 'Greeter';
