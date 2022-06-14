import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Dialog, DialogTitle, Box } from '@material-ui/core';
import { fetchCurrenciesAPI, sendWalletExpenses } from '../actions';
import fetchCoins from '../api/coins';
import Select from './Select';

// eslint-disable-next-line max-lines-per-function
function Forms({ open, handleClose }) {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [id, setId] = useState(0);
  const [exchangeRates, setExchangeRates] = useState(null);

  const currencies = useSelector((state) => state.wallet.currencies);

  const content = { value, description, currency, method, tag, id, exchangeRates };

  useEffect(() => {
    dispatch(fetchCurrenciesAPI());
    const exchange = async () => {
      const moedas = await fetchCoins();
      setExchangeRates(moedas);
    };
    exchange();
  }, []);

  async function onSubmitForm() {
    dispatch(sendWalletExpenses(content));
    setId(id + 1);
  }

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <Box display="flex" flexDirection="column" p={ 3 } alignItems="center">
        <DialogTitle>Informe sua despesa</DialogTitle>
        <TextField
          fullWidth
          variant="outlined"
          label="Valor"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
          type="number"
          id="input-expense"
          name="value"
        />
        <Select
          tag={ tag }
          method={ method }
          currency={ currency }
          coins={ currencies }
          setTag={ ({ target }) => setTag(target.value) }
          setMethod={ ({ target }) => setMethod(target.value) }
          setCurrency={ ({ target }) => setCurrency(target.value) }
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Descrição"
          value={ description }
          id="input-description"
          name="description"
          type="text"
          onChange={ ({ target }) => setDescription(target.value) }
        />
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="space-evenly"
        >
          <Button
            style={ { margin: '20px', height: '60px' } }
            variant="contained"
            color="primary"
            onClick={ onSubmitForm }
            type="button"
          >
            Adicionar despesa
          </Button>
          <Button
            style={ { margin: '20px', height: '60px' } }
            variant="contained"
            color="secondary"
            onClick={ handleClose }
            type="button"
          >
            Fechar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

Forms.propTypes = {
  handleClose: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
};

export default Forms;
