import CryptoPay from '../';

const apitest = async () => {
  const callbackSecret = process.env.CALLBACK_SECRET || '';
  const apiKey = process.env.API_KEY || '';
  const apiSecret = process.env.API_SECRET || '';
  const cryptoPay = new CryptoPay(apiSecret, apiKey, callbackSecret);

  try {
    const res = await cryptoPay.rates().all();
    // eslint-disable-next-line no-console
    console.log(res?.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
};

apitest();
