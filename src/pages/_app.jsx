import "../styles/style.scss";
import Wallet from "../components/wallet/Wallet";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import PageLoading from "../components/PageLoading";
import { useState } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

function RaffleApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  return (
    <Wallet>
      <WalletModalProvider>
        <Header />
        <Component
          {...pageProps}
          startLoading={() => setLoading(true)}
          closeLoading={() => setLoading(false)}
        />
        <ToastContainer style={{ fontSize: 14 }} />
        <PageLoading loading={loading} />
      </WalletModalProvider>
    </Wallet>
  );
}

export default RaffleApp;
