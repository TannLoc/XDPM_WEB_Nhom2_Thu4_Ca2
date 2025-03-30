import { GlobalStateProvider } from "./GlobalState";

const GlobalState = ({ children }: { children: React.ReactNode }) => {
  return <GlobalStateProvider>{children}</GlobalStateProvider>;
};

export default GlobalState;
