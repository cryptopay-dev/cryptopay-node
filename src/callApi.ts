import CryptoPay from '.';

const apitest = async () => {
  const callbackSecret = process.env.CALLBACK_SECRET || '';
  const apiKey = process.env.API_KEY || '';
  const apiSecret = process.env.API_SECRET || '';
  const cryptoPay = new CryptoPay(apiSecret, apiKey, callbackSecret);
  try {
    const res = await cryptoPay.ratesApi().ratesAll();
    console.log({ res });
  } catch (error) {
    console.log({ error });
  }
};

apitest();
