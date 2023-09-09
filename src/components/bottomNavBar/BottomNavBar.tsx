import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaGift } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { RiHome7Fill, RiWallet3Fill } from 'react-icons/ri';
import './BottomNavBar.css';

export const BottomNavBar = () => {
  const navigate = useNavigate();

  return (
    <footer className="dash-footer">
      <div className="home" onClick={() => navigate('/auth/dashboard/')}>
        <IconContext.Provider value={{ className: 'home1' }}>
          <RiHome7Fill />
        </IconContext.Provider>
        <p>Home</p>
      </div>
      <div
        className="nav-transaction"
        onClick={() => navigate('/auth/transactions/')}
      >
        <IconContext.Provider value={{ className: 'nav-transaction1' }}>
          <GrTransaction />
        </IconContext.Provider>
        <p>Transactions</p>
      </div>
      <div className="gift">
        <IconContext.Provider value={{ className: 'gift1' }}>
          <FaGift />
        </IconContext.Provider>
        <p>Gift Cards</p>
      </div>
      <div className="wallet" onClick={() => navigate('/wallets/')}>
        <IconContext.Provider value={{ className: 'wallet1' }}>
          <RiWallet3Fill />
        </IconContext.Provider>
        <p>Wallets</p>
      </div>
    </footer>
  );
};
