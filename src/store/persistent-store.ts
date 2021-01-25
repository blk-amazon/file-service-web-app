import { isObject } from 'lodash';

export const Store = {
  setItem: (key: string, value: string | object) => {
    if (isObject(value)) {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } else {
      localStorage.setItem(key, value);
    }
  },
  getItem: (key: string) => {
    const value = localStorage.getItem(key);
    // const jsonValue = (value !== null) ? JSON.parse(value) : null;
    // return (jsonValue !== null && isObject(jsonValue)) ? jsonValue : value;
    return value;
  },
  removeItem:  (key: string) => {
    localStorage.removeItem(key);
  }
}

export const SecureStore = {
  setItem: async (key: string, value: any) => {

  },
  getItem: async (key: any) => {
    
  }
}