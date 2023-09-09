import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdArrowBack } from 'react-icons/md';
import '../../App.css'
import './WalletDetails.css';
import { coins } from '../../components/coinList';
import { useNavigate } from 'react-router-dom';

const WalletDetails = () => {
  const [userWallet, setUserWallet] = useState([]);
  const [coinName, setCoinName] = useState('BNB');
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userToken') as string);
    const url = 'http://localhost:3001/wallets/';

    const getUserWallet = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const json = await response.data[0].address;
        // console.log(response.data);
        setUserWallet(response.data);
        setCoinName(response.data[1].coin);
      } catch (error) {
        console.log(error);
      }
    };
    getUserWallet();
  }, []);

  const coinIcon = coins.filter((coin: any) => coin.symbol === coinName)[0]
    .icon;

  return (
    <section id="App-Container-1">
      <div id="App-Container-2">
        <div className="wrap-wallet">
          <div>
            <MdArrowBack
              fontSize="2em"
              cursor="pointer"
              onClick={() => navigate(-1)}
            ></MdArrowBack>
          </div>
          <form action="#" className="wallet-form validate-form">
            <span className="wallet-title">Send</span>

            <div className="from">
              <label>From</label>

              <div className="from_container">
                <select className="select">
                  {userWallet.map((wallet: any, index) => {
                    return (
                      <option key={index}>
                        {' '}
                        {wallet.coin + ': ' + wallet.address}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <label className="to" htmlFor="recipient">
              To
            </label>
            <input
              className="input"
              name="recipient"
              placeholder="Recipient Address"
            />
            <label className="to" htmlFor="amount">
              Amount
            </label>
            <input
              className="input"
              name="amount"
              type="number"
              placeholder="Amount"
            />
            <button className="continue-btn" type="submit" disabled={true}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WalletDetails;
