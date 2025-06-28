import { v4 as uuidv4 } from 'uuid';

export const generateShortCode = () => {
  return uuidv4().slice(0, 6);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isAlphanumeric = (str) => /^[a-zA-Z0-9]{4,10}$/.test(str);
