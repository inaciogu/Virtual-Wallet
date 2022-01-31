import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Lottie from 'react-lottie';
import { sendUserInfo } from '../actions';
import animationData from '../animation.json';
import '../App.css';

// eslint-disable-next-line max-lines-per-function
function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [animationState, setAnimationState] = useState({
    isStopped: false, isPaused: false,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const pauseTime = 2200;

  setInterval(() => {
    setAnimationState({ ...animationState, isPaused: true });
  }, pauseTime);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  function onSubmitForm() {
    dispatch(sendUserInfo(email));
    history.push('/carteira');
  }

  function isEmailValid(userEmail) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(userEmail) === true;
  }
  const MININUM_NUMBER = 6;
  return (
    <div className="container">
      <div className="login">
        <div>
          <h1>VIRTUAL WALLET</h1>
          <Lottie
            options={ defaultOptions }
            height={ 150 }
            width={ 200 }
            isStopped={ animationState.isStopped }
            isPaused={ animationState.isPaused }
          />
        </div>
        <form>
          <div>
            <TextField
              variant="outlined"
              label="E-mail"
              data-testid="email-input"
              id="input-email"
              name="email"
              type="text"
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Senha"
              data-testid="password-input"
              type="password"
              name="senha"
              id="input-password"
              onChange={ ({ target }) => setSenha(target.value) }
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={ !isEmailValid(email) || senha.length < MININUM_NUMBER }
              type="button"
              onClick={ onSubmitForm }
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
