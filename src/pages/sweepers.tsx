import { Grid } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect, useMemo } from "react";
import { buyTicket, getGlobalState } from "../contexts/transactions";
import EndTimeCountdown from "../components/EndTimeCountdown";
import FAQ from "../components/FAQ";

export default function SweepersPage() {
  const [ticketsAmount, setTicketsAmount] = useState(1);
  const wallet = useWallet();
  const [buyLoading, setBuyLoading] = useState(false);
  const [totalTickets, setTotalTickets] = useState(0);
  const [sweepTime, setSweepTime] = useState(new Date().getTime());

  const [pageLoading, setPageLoading] = useState(false);

  const [ticketPrice, setTicketPrice] = useState(0.15);
  const [forceRender, setForceRender] = useState(false);

  const getGlobalData = async () => {
    setPageLoading(true);
    const globalData = await getGlobalState();
    if (globalData) {
      setTicketPrice(globalData.ticketPrice.toNumber() / LAMPORTS_PER_SOL);
      setTotalTickets(globalData.totalBoughtTickets.toNumber());
      getEndTime(globalData.endTimestamp.toNumber() * 1000);
      setForceRender(!forceRender);
    }
    setPageLoading(false);
  };

  const getEndTime = (time: number) => {
    setSweepTime(new Date(time).getTime());
    setForceRender(!forceRender);
  };

  const onBuyTickets = async () => {
    try {
      await buyTicket(
        wallet,
        ticketsAmount,
        () => setBuyLoading(true),
        () => setBuyLoading(false),
        () => getGlobalData()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onInc = () => {
    const amount = ticketsAmount;
    if (amount < 10) {
      setTicketsAmount(amount + 1);
    }
  };

  const onDec = () => {
    const amount = ticketsAmount;
    if (amount > 1) {
      setTicketsAmount(amount - 1);
    }
  };

  useEffect(() => {
    getGlobalData();
    // eslint-disable-next-line
  }, [wallet.connected, wallet.publicKey]);

  return !pageLoading ? (
    <div className="sweeper-page">
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div className="page-header">
          {/* eslint-disable-next-line */}
          <img src="/img/sweepers_title.png" className="page-title" />
          <div className="page-wallet">
            {/* <button onClick={() => setVisible(true)}>wallet conect</button> */}
            {/* <CustomWalletButton /> */}
            <WalletMultiButton />
          </div>
        </div>
        <div className="prize-border-line">
          <Grid container>
            <Grid item md={6} sm={12}>
              <div className="sweeping-in">
                {/* eslint-disable-next-line */}
                <img
                  src="/img/money_dude.png"
                  alt=""
                  className="sweeping-in-bg"
                />
              </div>
              <div className="left-btn-div">
                <label>Sweeping In</label>
                <p></p>
                <p>
                  <EndTimeCountdown
                    endTime={new Date(sweepTime)}
                    endAction={() => getGlobalData()}
                  />
                </p>
              </div>
            </Grid>
            <Grid item md={6} sm={12}>
              <div className="lucky-winner-prize">
                <div className="with-login-prize-data">
                  <div className="lottery-right-rays">
                    <p>
                      Tickets Sold: <span>{totalTickets}</span>
                    </p>
                    {/* eslint-disable-next-line */}
                    <img
                      src="/img/tickets.gif"
                      className="ticket-gif"
                      alt="ticket"
                    />
                    {/* eslint-disable-next-line */}
                    <img
                      src="/img/price_label.png"
                      className="price-label"
                      alt="price label"
                    />
                  </div>
                  <div className="price-time-div">
                    <div>
                      <span>Price</span>
                      <button className="price-btn-inner">
                        ◎ {ticketPrice.toLocaleString()}
                      </button>
                    </div>
                    <div>
                      <div className="" style={{ marginTop: 28 }}>
                        {/* <button
                          className="wallet-adapter-button timer-btn buy-tickets"
                          type="button"
                          >
                          Connect
                        </button> */}
                        {wallet.publicKey ? (
                          <button
                            className="wallet-adapter-button timer-btn buy-tickets"
                            type="button"
                            style={{ marginTop: 0 }}
                            onClick={() => onBuyTickets()}
                          >
                            {buyLoading ? <>Buying...</> : <>Buy Tickets</>}
                          </button>
                        ) : (
                          <WalletMultiButton />
                        )}
                      </div>
                    </div>
                    <div>
                      <span>Amount</span>
                      <div className="kitty-number-main">
                        <button
                          className="left-number-btn"
                          onClick={() => onInc()}
                        >
                          +
                        </button>
                        <input
                          type="number"
                          className="kitty-number"
                          min={1}
                          max={10}
                          value={ticketsAmount}
                          readOnly
                        />
                        <button
                          className="right-number-btn"
                          onClick={() => onDec()}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="max-ticket">Kitties Family Sweeps Together</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Grid container>
        <Grid item md={12}>
          <div id="faq">
            <div className="main-layout">
              <div className="main-container">
                <h1 className="roadmap-title mt-0">FAQ</h1>
                <FAQ />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    <></>
  );
}
