import { customAlphabet } from "nanoid/async";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const nanoid = customAlphabet(alphabet, 7);
