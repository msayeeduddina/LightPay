import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import './VerifyEmail.css';
import verifyGif from './verifyAnim.gif';
import errorGif from './errorAnim.gif';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const params = new URLSearchParams(useLocation().search);

  useEffect(() => {
    handleVerification();
  }, []);

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/signin/');
  };

  const handleVerification = () => {
    Axios.post(
      `http://localhost:3001/auth/verify-email/${params.get('verifyToken')}`
    )
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          setMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setMessage('Error' + error.message);
        }
      });
  };

  return (
    <div id="App-Container-1">
      <div id="App-Container-2">
        <div className="wrap-signin">
          {message === 'Account verified successfully.' ? (
            <div className="img-container-verify">
              <br></br>
              <div>
                <img
                  className="img-verify"
                  src={verifyGif}
                  alt="Account verified icon"
                />
              </div>
              <br></br>
              <br></br>
              <p className="email-msg">{message}</p>
              <button
                className="signin-btn-verify"
                type="submit"
                onClick={handleSignin}
              >
                Proceed to Sign In
              </button>
            </div>
          ) : null}

          {message === 'Invalid verification link.' ? (
            <div className="img-container-verify">
              <br></br>
              <img
                className="img-verify"
                src={errorGif}
                alt="Error occurred icon"
              />
              <hr></hr>
              <br></br>
              <br></br>
              <p className="email-msg">{message}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
