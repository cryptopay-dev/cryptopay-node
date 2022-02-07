import Cryptopay from '../';

const apitest = async () => {
  const callbackSecret = process.env.CALLBACK_SECRET || '';
  const apiKey = process.env.API_KEY || '';
  const apiSecret = process.env.API_SECRET || '';
  const cryptopay = new Cryptopay(apiSecret, apiKey, callbackSecret);

  try {
    const res = await cryptopay.rates().all();
    // eslint-disable-next-line no-console
    console.log(res?.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
};

apitest();
