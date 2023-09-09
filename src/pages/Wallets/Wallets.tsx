import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BottomNavBar } from '../../components/bottomNavBar/BottomNavBar';
import { coins } from '../../components/coinList';
import '../../App.css'
import './Wallets.css';

const add = <FontAwesomeIcon icon={faCirclePlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

const Wallets = () => {
  const [userWallet, setUserWallet] = useState<any[]>([]);
  // const [walletBalances, setWalletBalances] = useState<any[]>([]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = React.useState('');
  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchedWallets = userWallet.filter((wallet) => {
    const coinName = coins.filter((coin) => coin.symbol === wallet.coin)[0]
      .name;
    return (
      wallet.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coinName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    const wallets = JSON.parse(
      localStorage.getItem('walletsWithBal') as string
    );
    if (wallets) {
      setUserWallet(wallets);
    }

    // Add a request interceptor
    const token = JSON.parse(localStorage.getItem('userToken') as string);
    axios.interceptors.request.use(function (config: AxiosRequestConfig) {
      if (config.headers === undefined) {
        config.headers = {};
      }

      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });

    const getWallets = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/wallets/userwallet'
        );
        setUserWallet(response.data);
        console.log(response.data);
      } catch (error: any) {
        console.log(error);
        // if (error.response.status === 400) {
        //   console.log("Session expired, Login!");
        //   navigate("/signin/");
        // }
      }
    };

    const getWalletsBalances = async () => {
      const walletsWithBal = [];
      for (let i = 0; i < userWallet.length; i++) {
        const coin = userWallet[i].coin;
        try {
          const walletBalance = await axios.get(
            `http://localhost:3001/wallets/${coin}/balance`
          );
          walletsWithBal.push({
            address: userWallet[i].address,
            coin,
            balance: walletBalance.data.balance,
          });
        } catch (error: any) {
          console.log(error);
          // if (error.response.status === 400) {
          //   console.log("Session expired, Login!");
          //   navigate("/signin/");
          // }
        }
      }
      console.log('All Balances', walletsWithBal);
      setUserWallet(walletsWithBal);
    };

    // axios
    //   .get("https://api.coinstats.app/public/v1/coins")
    //   .then((response) => {
    //     // console.log(response.data.coins);
    //     setCoinList(response.data.coins);
    //   }).catch((err: any) => {
    //     console.log(err);
    //   if (error.response.status === 400) {
    // console.log("Session expired, Login!");
    // navigate("/signin/");
    // }
    //   })

    getWallets();
    // getWalletsBalances();
  }, []);

  return (
    <div id="App-Container-1">
      <div id="App-Container-2">
        <div className="wrap-wallet-screen">
          <div className="add">
            <i> {add} </i>
            <span className="add-wallet">Add Wallet</span>
          </div>

          <span className="wallet-title-main">Wallets</span>

          <div
            className="wrap-input-wallet"
            data-validate="enter wallet address"
          >
            <i className="search"> {search} </i>
            <input
              className="input-wallet"
              type="text"
              name="search-wallet"
              placeholder="Search wallet"
              id="wallet"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>

          <div className="wrap-wallet-currency">
            {searchedWallets.map((wallet, index) => {
              const coinIcon = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].icon;
              const coinName = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].name;
              const coinSymbol = wallet.coin;
              const coinAddress = wallet.address;
              const coinBalance = Number(wallet.balance.toFixed(5));
              const coinPrice = coins.filter(
                (coin) => coin.symbol === wallet.coin
              )[0].price;
              const coinBalanceUSD = (
                Number(coinBalance) * Number(coinPrice)
              ).toFixed(2);

              return (
                <div key={index}>
                  <div
                    className="wallet-coins"
                    onClick={() =>
                      navigate('/auth/wallet-deets/', {
                        state: {
                          coinAddress,
                          coinName,
                          coinSymbol,
                          coinBalance,
                          coinBalanceUSD,
                        },
                      })
                    }
                  >
                    <img className="wallet-crypto-icon" src={coinIcon} alt="crypto coins" />
                    <div className="wallet-crypto">
                      <h6 className="wallet-eth">{coinName}</h6>
                      <h6 className="wallet-symbol">
                        {coinSymbol +
                          ': ' +
                          coinAddress.slice(0, 7) +
                          '...' +
                          coinAddress.slice(-4)}
                      </h6>
                    </div>
                    <div>
                      <div className="user-wallet-bal">
                        <span className="wallet-bal">{coinBalance}</span>
                        <span className="wallet-bal-usd">${coinBalanceUSD}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
        </div>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Wallets;
