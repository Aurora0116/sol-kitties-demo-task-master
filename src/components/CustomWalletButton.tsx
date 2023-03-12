import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function CustomWalletButton() {
  const { visible, setVisible } = useWalletModal();
  const wallet = useWallet();
  return wallet.publicKey ? (
    <button
      className="custom-wallet-button"
      type="button"
      onClick={() => setVisible(false)}
    >
      <div className="wallet-wrap">
        <div className="connect-info">
          {/* eslint-disable-next-line */}
          <img src="/img/wallet-logo.png" alt="login" />
          <span>
            {wallet.publicKey.toBase58().slice(0, 4)}...
            {wallet.publicKey.toBase58().slice(-3)}
          </span>
        </div>
      </div>
    </button>
  ) : (
    <button
      className="custom-wallet-button"
      type="button"
      onClick={() => setVisible(true)}
    >
      <div className="wallet-wrap">
        <div className="connect-info">
          {/* eslint-disable-next-line */}
          <img src="/img/wallet-logo.png" alt="login" />
          <span>
            Connect
            <br /> Wallet
          </span>
        </div>
      </div>
    </button>
  );
}
