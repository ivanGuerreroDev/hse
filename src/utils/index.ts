import Config from 'react-native-config';

export const getUserPool = async (Rut: string) => {
  try {
    let result = await fetch(Config.Userpool, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({strUserPool: Rut}),
    });
    let res = await result.json();
    return res;
  } catch (err) {
    return null;
  }
};

export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
