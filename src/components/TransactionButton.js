// src/TransactionButton.js
import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const PRICE = process.env.REACT_APP_PRICE || 0.01;
const RECIPIENT = process.env.REACT_APP_RECIPIENT;

const TransactionButton = ({inputMessage, setInput}) => {
  const [message, setMessage] = useState('');
  const [resetMessage, setResetMessage] = useState(false);

  // Check if Phantom Wallet is installed
  const isPhantomInstalled = () => {
    return window.solana && window.solana.isPhantom;
  };

  // Connect to Phantom Wallet
  const connectWallet = async () => {
    if (!isPhantomInstalled()) {
      alert('Phantom wallet is not installed');
      return null;
    }
    try {
      const response = await window.solana.connect();
      console.log('Connected wallet public key:', response.publicKey.toString());
      return response.publicKey;
    } catch (err) {
      console.error('Wallet connection error:', err);
      return null;
    }
  };

  // Send transaction and memo
  const sendTransaction = async () => {
    try {
      setMessage('Posting message...');
      const senderPublicKey = await connectWallet();
      if (!senderPublicKey) return;

      const recipientPublicKey = new PublicKey(RECIPIENT);
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

      const lamports = PRICE * 1_000_000_000;

      // Create transaction with transfer and memo instructions
      const transaction = new Transaction();

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports,
      });

      const memoInstruction = {
        keys: [{ pubkey: senderPublicKey, isSigner: true, isWritable: false }],
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
        data: Buffer.from(inputMessage),
      };

      transaction.add(transferInstruction, memoInstruction);

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderPublicKey;

      // Sign and send transaction using Phantom
      const { signature } = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);

      // Send the signature to your backend
      const response = await fetch('./.netlify/functions/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature }),
      });

      const data = await response.json();
      console.log('Server response:', data);
      setInput('');
      setMessage('Transaction sent successfully!');
      setResetMessage(true);
    } catch (error) {
      console.error('Transaction failed:', error);
      setMessage('Transaction failed! Check the console for details.');
      setResetMessage(true);
    }
  };

  useEffect(() => {
    if (!resetMessage) { return }
    setTimeout(() => setMessage(''), 3000);
    setResetMessage(false);
  }, [resetMessage]);

  return (
    <div>
      <button
        onClick={sendTransaction}
        className={`border-2 border-solid border-purple-200 rounded-lg p-3 hover:bg-purple-200 hover:text-white font-bold text-gray-500 ${message.length !== 0 && 'cursor-not-allowed'}`}
        disabled={message.length !== 0}>

        {message ? message : `Post to TG group`}
      </button>
    </div>
  );
};

export default TransactionButton;
