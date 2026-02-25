"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/utils/constants';

interface Transaction {
  to: string;
  amount: string;
  time: string;
  status: string;
  hash: string;
}

interface WalletContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  contract: ethers.Contract | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
  balance: string;
  tokenName: string;
  tokenSymbol: string;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const isConnected = !!account;

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Check current network
        const network = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('Current network:', network);
        
        // Check if we're on the right network (31337 = 0x7a69)
        if (network !== '0x7a69') {
          // Try to switch to Hardhat network automatically
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x7a69' }],
            });
          } catch (switchError: unknown) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError && typeof switchError === 'object' && 'code' in switchError && (switchError as { code: number }).code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: '0x7a69',
                    chainName: 'Hardhat',
                    rpcUrls: ['http://127.0.0.1:8545'],
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                  }],
                });
              } catch (addError) {
                console.error('Error adding Hardhat network:', addError);
                alert('Cannot add Hardhat network to MetaMask. Please add manually:\n\nNetwork Name: Hardhat\nRPC URL: http://127.0.0.1:8545\nChain ID: 31337');
                return;
              }
            } else {
              console.error('Error switching network:', switchError);
              alert('Cannot switch network. Please switch manually in MetaMask.');
              return;
            }
          }
        }
        
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider and signer
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const web3Signer = await web3Provider.getSigner();
        const userAddress = await web3Signer.getAddress();
        
        console.log('Connected to address:', userAddress);
        console.log('Contract address:', CONTRACT_ADDRESS);
        
        // Create contract instance
        const tokenContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, web3Signer);
        
        try {
          // Get token info
          const name = await tokenContract.name();
          const symbol = await tokenContract.symbol();
          const userBalance = await tokenContract.balanceOf(userAddress);
          
          console.log('Token data loaded:', { name, symbol, balance: ethers.formatEther(userBalance) });
          
          setProvider(web3Provider);
          setSigner(web3Signer);
          setAccount(userAddress);
          setContract(tokenContract);
          setTokenName(name);
          setTokenSymbol(symbol);
          setBalance(ethers.formatEther(userBalance));
        } catch (error) {
          console.error("Cannot read data from contract. Is address correct? Is node running?", error);
          alert('Cannot connect to contract. Please check:\n\n1. Is Hardhat node running in terminal?\n2. Is MetaMask on Localhost 8545 network?\n3. Is contract address correct?');
        }
      } else {
        alert('MetaMask is not installed! Please install MetaMask.');
      }
    } catch (error: unknown) {
      console.error('Wallet connection error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Wallet connection error! ' + errorMessage);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setContract(null);
    setBalance('0');
    setTokenName('');
    setTokenSymbol('');
  };

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const value: WalletContextType = {
    account,
    provider,
    signer,
    contract,
    connectWallet,
    disconnectWallet,
    isConnected,
    balance,
    tokenName,
    tokenSymbol,
    transactions,
    addTransaction,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: 'accountsChanged', handler: (accounts: string[]) => void) => void;
      removeListener: (event: 'accountsChanged', handler: (accounts: string[]) => void) => void;
    };
  }
}
