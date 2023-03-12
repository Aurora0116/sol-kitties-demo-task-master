import Link from "next/link";
import { useState } from "react";
import { CloseIcon, DiscordIcon, MenuIcon, TwitterIcon } from "./svgIcons";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">
            {/* eslint-disable-next-line */}
            <img src="/img/logo.png" alt="" />
            <span>SOL KITTIES</span>
          </div>
        </div>
        <div className="header-center">
          <ul>
            <li>
              <Link href="#verify">
                <a>verify</a>
              </Link>
            </li>
            <li>
              <Link href="#staking">
                <a>staking</a>
              </Link>
            </li>
            <li>
              <Link href="#raffles">
                <a>raffles</a>
              </Link>
            </li>
            <li>
              <Link href="#roladmap">
                <a>roladmap</a>
              </Link>
            </li>
            <li>
              <Link href="#faq">
                <a>faq</a>
              </Link>
            </li>
            <li>
              <Link href="#whitepaper">
                <a>whitepaper</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-right">
          {/* eslint-disable-next-line */}
          <img src="/img/1y_v2.png" alt="" />
        </div>
      </div>
    </header>
  );
}
