import React from 'react';
import '../../App.css';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div id="App-Container-1">
      <div id="App-Container-2">
        <div className="wrap-splashScreen">
          <img
            className="splash-img"
            src="/images/hand.gif"
            alt="Hand tossing a coin"
          />
          <p className="light">Light<span className="pay">Pay</span></p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
