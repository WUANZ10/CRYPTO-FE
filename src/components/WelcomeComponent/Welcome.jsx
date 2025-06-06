import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TransactionContext } from "../../context/TransactionContext";
import "./welcome.css";

export default function Welcome() {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const { isAuthenticated, username } = useSelector((state) => state.auth);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-left">
          <div className="slogan-spotlight">
            <h1 className="slogan-title">
              {isAuthenticated
                ? `Welcome back, ${username}!`
                : "Wiki Indices Unleashed!"}
            </h1>
            <div className="slogan-description">
              <p className="paragraph-main-1">
                {isAuthenticated ? "Ready to trade today?" : "[/ˈwikē], noun"}
              </p>
              <p className="paragraph-main-2">
                {isAuthenticated
                  ? "Your exclusive rewards are waiting!"
                  : "Trade indices with zero fees!"}
              </p>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="welcome-register-btn">
              <Link to="/register">Sign Up for Rewards</Link>
              <img
                src="/images/piggy-68ee34a44ef142d586e121df51cbc026.avif"
                alt="Welcome Image"
              />
            </div>
          )}

          {isAuthenticated && !currentAccount && (
            <div className="welcome-register-btn">
              <Link to="#" onClick={connectWallet}>
                Connect your wallet
              </Link>
              <img
                src="/images/piggy-68ee34a44ef142d586e121df51cbc026.avif"
                alt="Welcome Image\"
              />
            </div>
          )}

          <div className="cta-socials">
            <div className="cta-main">
              <p>Join the waiting list</p>
            </div>
            <div className="socials-layout">
              <Link to="#">
                <img
                  src="/images/679cb9d9d7565e087f99bb62_x.svg"
                  alt="socials-img"
                />
              </Link>
              <Link to="#">
                <img
                  src="/images/679cb9d9d7565e087f99bb61_tg.svg"
                  alt="socials-img"
                />
              </Link>
              <Link to="#">
                <img
                  src="/images/679cb9d9d7565e087f99bb5f_in.svg"
                  alt="socials-img"
                />
              </Link>
              <Link to="#">
                <img
                  src="/images/679cb9d9d7565e087f99bb5e_inst.svg"
                  alt="socials-img"
                />
              </Link>
              <Link to="#">
                <img
                  src="/images/679cb9d9d7565e087f99bb60_git.svg"
                  alt="socials-img"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="welcome-right">
          <div className="video-spotlight">
            <Link to="#">
              <video autoPlay loop muted playsInline className="feature-video">
                <source src="/videos/7a6c20610af011f0b58c5efff9f511af.mp4" />
              </video>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
