export default function avatarGenerator(text?: string) {
  return `https://api.multiavatar.com/${text || "random"}`;
}
