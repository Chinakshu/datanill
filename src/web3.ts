// src/web3.ts
import Web3 from 'web3';

let web3: Web3 | null = null;

const initializeWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("Error requesting accounts:", error);
    }
  } else {
    console.warn('MetaMask is not installed.');
  }
};

initializeWeb3();

export default web3;
