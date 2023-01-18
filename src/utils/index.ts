import axios from 'axios';
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

export const getCredentials = async () => {
  try {
    let {data} = await axios.get(Config.Credentials).catch(error=>{
      console.log(error)
      throw error;
    });
    console.log("@@ response data credentials: ")
    let responseStr = JSON.stringify(response.data)
    console.log(response.status)
    console.log(typeof response , ' ', responseStr?.slice(responseStr.length - 100, responseStr.length))
    return data;
  } catch (err) {
    console.error(err)
    return null;
  }
};

export const capitalize = (value: any, type: number) => {
  if (typeof value !== 'string' || isNaN(type)) return value;
  switch (type) {
      case 1:
          return value.trim().toUpperCase();
      case 2:
          return value.trim().charAt(0).toUpperCase() + value.slice(1);
      case 3:
          return value.trim()
              .split(" ")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
              .join(" ");
      default:
          return value;
  };
};
