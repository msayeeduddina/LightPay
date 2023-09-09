import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import '../../App.css';
import './StartScreen.css';

const StartScreen = () => {
  const [splashScreen, setSplashScreen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setSplashScreen(false), 8000);
  }, []);

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/signup/');
  };

  return (
    <>
      {splashScreen === false ? (
        <div id="App-Container-1">
          <div id="App-Container-2">
            <div className="wrap-startScreen">
              <img
                className="welcome-img"
                src="/images/koin.gif"
                alt="welcome icon"
              />
              <button
                className="start-btn getStarted-btn"
                onClick={handleSignup}
              >
                Get Started
              </button>

              <button className="start-btn importWallet-btn">
                Import Wallet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

export default StartScreen;
