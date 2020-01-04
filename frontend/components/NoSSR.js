export default function NoSSR({ children }) {
  return typeof window !== `undefined` ? children : null;
}
