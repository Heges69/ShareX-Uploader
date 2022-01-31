import { randomBytes } from "crypto";
const b62 = (() => {
  const alphabet: string = 'abcdefghijklmnopqrestuvwxyz';
  return [
    ...alphabet,
    ...alphabet.toUpperCase(),
    ...Array(10).fill(0).map((_, i) => i)
  ]
})();
export default (size: number) => [...randomBytes(size)].map(byte => b62[+byte % 62]).join('');