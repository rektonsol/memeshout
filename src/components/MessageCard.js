import React, { useState } from 'react';
import TransactionButton from './TransactionButton';

function MessageCard() {
  const [input, setInput] = useState('');

  return (
    <div className='w-[65%] max-sm:w-full h-50'>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your message"
        className='border-2 border-solid border-purple-200 rounded-lg w-full h-40 outline-none p-3 resize-none'
        maxLength='1000'>
      </textarea>

      <br /><br />
      <TransactionButton inputMessage={input} setInput={setInput} />
    </div>
  );
}

export default MessageCard;
