import { MdArrowBack } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import "./ReceiveSend.css";
import '../../App.css'

interface LocationState {
  coinAddress: string;
  coinName: string;
  coinSymbol: string;
  coinBalance: string;
  coinBalanceUSD: string;
}

const ReceiveSend = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { coinAddress, coinName, coinSymbol, coinBalance, coinBalanceUSD } =
    state;

  return (
    <section id="App-Container-1">
      <div id="App-Container-2">
        <div className="wrap-sr-container">
          <div className="nav-icon-container">
              <MdArrowBack
                fontSize="2em"
                cursor="pointer"
                onClick={() => navigate(-1)}
              ></MdArrowBack>
            <div className="receiveSend-nav">
                <FaHandHoldingUsd fontSize="1.5em"></FaHandHoldingUsd> 
              <div
                id="nav-link"
                onClick={() =>
                  navigate("/wallet-qr", {
                    state: {
                      coinAddress,
                    },
                  })
                }
              >
                <p className="make-request">Make Request</p>
              </div>
            </div>
          </div>
          <section className="receiveSend-main">
            <p className="receiveSend-coinName">{coinName}</p>
            <div className="receiveSend-bal-sym">
              <h2 className="receiveSend-coinBalance">{coinBalance}</h2>
              <p className="receiveSend-coinSymbol">{coinSymbol}</p>
            </div>
            <h5>${coinBalanceUSD}</h5>
          </section>
          <section className="send-receive-icon">
            <div className="receive-icon-and-title">
              <div
                className="receive"
                onClick={() =>
                  navigate("/wallet-qr", {
                    state: {
                      coinAddress,
                    },
                  })
                }
              >
                <MdArrowCircleDown fontSize="2.5rem"></MdArrowCircleDown>
              </div>
              <div className=" receive-title">
                <p>Receive</p>
              </div>
            </div>
            <div className="send-icon-and-title">
              <div
                className="send"
                onClick={() =>
                  navigate("/auth/send", {
                    state: {
                      coinAddress,
                    },
                  })
                }
              >
                <MdArrowCircleUp fontSize="2.5rem"></MdArrowCircleUp>
              </div>
              <div className="send-title">
                <p>Send</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
export default ReceiveSend;
