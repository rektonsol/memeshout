// netlify/functions/verifyTransaction.js
require('dotenv').config();

const createClient = require('@supabase/supabase-js').createClient;

const TelegramBot = require('node-telegram-bot-api');
const { Connection } = require("@solana/web3.js");
const BigNumber = require('bignumber.js');

const TG_TOKEN = process.env.TG_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const PRICE = process.env.REACT_APP_PRICE || 0.01;
const LAMPORTS_PER_SOL = 1_000_000_000;

exports.handler = async (event, context) => {
  try {
    const { signature } = JSON.parse(event.body);

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: signatureData } = await supabase.from('signatures').select('id')
      .eq('signature', signature).limit(1);

    if (signatureData.length > 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Transaction already exists" }) };
    }

    const connection = new Connection("https://api.devnet.solana.com", 'confirmed');

    // Fetch the transaction details using the signature
    const transaction = await connection.getTransaction(signature, { commitment: "confirmed" });
    if (!transaction) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Transaction not found' }) };
    }

    const meta = transaction.meta;
    const preBalance = new BigNumber(meta.preBalances[0] || 0)
    const postBalance = new BigNumber(meta.postBalances[0] || 0)
    const amountTransferred = preBalance.minus(postBalance);
    if (amountTransferred.lt(PRICE * LAMPORTS_PER_SOL)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Incorrect transfer amount' }) };
    }

    // Find the memo instruction
    const logs = transaction.meta.logMessages;
    const memoLogs = logs.filter(log => log.startsWith('Program log: Memo'));
    if (memoLogs.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Memo not found' }) };
    }

    const match = memoLogs[0].match(/"([^"]+)"/);
    const content = match[1];

    // add API code to post content to TG
    const bot = new TelegramBot(TG_TOKEN);
    await bot.sendMessage(CHAT_ID, content);

    const price = amountTransferred / LAMPORTS_PER_SOL;
    await supabase.from('signatures').insert([{ signature, price, content }]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Transaction verified",
        signature,
        amountTransferred: amountTransferred / LAMPORTS_PER_SOL,
        content,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    };
  }
};
