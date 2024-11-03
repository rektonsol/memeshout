// src/App.js
import React, { useState } from 'react';
import './App.css';
import MessageCard from './components/MessageCard';

import banner from './assets/banner.png';
import telegram from './assets/tg.svg';
import twitter from './assets/x.png';
import coin from './assets/coin.svg';
import dexscreener from './assets/dexscreener.png';


function App() {
  const [showMessageCard, setShowMessageCard] = useState(false);
  const [icon, setIcon] = useState('copy');

  return (
    <div className="App">
      <div className="w-full h-full">
        <main className="flex items-center justify-start w-full h-full absolute flex-col gap-4 px-8 max-md:px-4 py-20 max-md:py-10 z-[2]">
          <div className="flex flex-col gap-8 items-center max-md:py-5 p-4 rounded-[40px] rounded-lg border-solid border-2 border-[#611dfc] bg-white">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center flex-col">
                <img src={banner} className="rounded-[20px] max-h-56 max-w-2xl max-lg:w-full rounded-lg border-solid border-2 border-[#611dfc]" />
                <div className="flex gap-2 flex-col relative items-center mt-10">
                  <p className="text-3xl font-semibold p-1.5 text-center rounded-md px-4 dela font-extrabold border-[#698efc] uppercase text-[#611dfc]">
                    MEME SHOUT
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-black max-w-[450px] text-center p-2 rounded-lg text-md font-bold text-gray-600">
                  Promote any memecoin to our TG members for {process.env.REACT_APP_PRICE}SOL
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center flex-wrap w-full flex-col">
              {showMessageCard ?
              <div className="group relative inline-flex items-center justify-center px-4 py-8 w-full rounded-2xl border-solid border-2 border-purple-200">
                <MessageCard />
              </div> :
              <div className="flex w-full">
                <a onClick={ () => setShowMessageCard(true) } className="w-full flex-grow">
                  <button className="group relative inline-flex items-center justify-center px-4 py-8 w-full rounded-2xl border-solid border-2 border-purple-200 hover:bg-purple-200">
                    <div className="flex gap-2 items-center">
                      <p className="text-lg text-gray-600 font-semibold"> 🗣️ SHOUT ABOUT A MEME! 🗣️</p>
                    </div>
                  </button>
                </a>
              </div>}
            </div>

            <div className="flex gap-2 items-center justify-center flex-wrap w-full flex-col">
              <div className="flex gap-2 w-full">
                <a href="" target="_blank" className="w-full flex-grow">
                  <button className="group relative inline-flex items-center justify-center px-4 py-8 max-sm:py-6 w-full rounded-2xl border-solid border-2 border-purple-200 hover:bg-purple-200">
                    <div className="flex gap-2 items-center">
                      <img src={telegram} className="h-7 max-sm:h-5" />
                      <p className="text-lg text-gray-600 font-semibold max-md:hidden">Telegram</p>
                    </div>
                  </button>
                </a>
                <a href="" target="_blank" className="w-full flex-grow">
                  <button className="group relative inline-flex items-center justify-center px-4 py-8 max-sm:py-6 w-full rounded-2xl border-solid border-2 border-purple-200 hover:bg-purple-200">
                    <div className="flex gap-2 items-center">
                      <img src={twitter} className="h-7 max-sm:h-5" />
                      <p className="text-lg text-gray-600 font-semibold max-md:hidden">X</p>
                    </div>
                  </button>
                </a>
              </div>
              <div className="flex gap-2 w-full">
                <a href="" target="_blank" className="w-full flex-grow">
                  <button className="group relative inline-flex items-center justify-center px-4 py-8 max-sm:py-6 w-full rounded-2xl border-solid border-2 border-purple-200 hover:bg-purple-200">
                    <div className="flex gap-2 items-center">
                      <img src={coin} className="h-7 max-sm:h-5" />
                      <p className="text-lg text-gray-600 font-semibold max-md:hidden">Buy $SHOUT</p>
                    </div>
                  </button>
                </a>
                <a href="" target="_blank" className="w-full flex-grow">
                  <button className="group relative inline-flex items-center justify-center px-4 py-8 max-sm:py-6 w-full rounded-2xl border-solid border-2 border-purple-200 hover:bg-purple-200">
                    <div className="flex gap-2 items-center">
                      <img src={dexscreener} className="h-7 rounded-md max-sm:h-5" />
                      <p className="text-lg text-gray-600 font-semibold max-md:hidden">Dexscreener</p>
                    </div>
                  </button>
                </a>
              </div>
            </div>
            <div className="rounded-full w-full max-md:px-4 flex items-center gap-1 border-solid border-2 border-purple-200 hover:bg-purple-200 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText('pooooop')
                setIcon('check')
              }}>
              <div className="rounded-full flex-grow p-2 min-h-10 items-center justify-center flex ">
                <p className="break-all text-[black] font-semibold text-center max-md:hidden">
                  ADDRESSSSSS</p>
                <p className="break-all text-[black] font-semibold text-center hidden max-md:block">
                  HdHqKP....E4rF99</p>
              </div>
              <button
                type="button" aria-label="Copy to clipboard" className="group inline-flex items-center justify-center h-[40px] text-large mr-5 ">
                { icon === 'check' ?
                  <svg aria-hidden="true" fill="none" focusable="false" height="1em" width="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  :
                  <svg aria-hidden="true" fill="none" focusable="false" height="1em" width="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" >
                    <path d="M16 17.1c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9Z"></path>
                    <path d="M8 8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16"></path>
                  </svg>}

              </button>
            </div>

            <hr className="w-full mt-5 border-2 boder-solid border-purple-200 rounded-full" />
            <div className="flex flex-col">
              <p className="text-gray-600 max-w-[450px] text-center p-2 rounded-lg text-xl font-bold">
                How does this work?
              </p>
              <p className="text-gray-600 max-w-[450px] text-center p-2 rounded-lg text-md">
                1. Pay 0.01SOL and promote a memecoin to the tg community. <br />
                2. Every day: we take 45% of the fees and buy $SHOUT and burn it. <br />
                3. Every Sunday: We hold a giveaway for the top 3 promoters of SHOUT <br />- they'll win 10% of fees generated that week. <br />
              </p>
            </div>
            <br/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
