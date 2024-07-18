import { generate } from "random-words";

export default function avatarGenerator(text?: string) {
  return `https://api.multiavatar.com/${text || generate()}.png`;
}
