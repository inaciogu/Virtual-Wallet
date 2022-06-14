import React from 'react';
import { TextField, MenuItem, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

function Select({ setTag, setMethod, setCurrency, tag, method, currency, coins }) {
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      p={ 3 }
    >
      <TextField
        select
        SelectProps={ { MenuProps: { style: { maxHeight: 300 } } } }
        label="Moeda"
        value={ currency }
        onChange={ setCurrency }
        id="input-coin"
      >
        {coins.map((coin) => (
          <MenuItem value={ coin } key={ coin }>
            {coin}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Método"
        select
        value={ method }
        onChange={ setMethod }
      >
        <MenuItem value="Dinheiro">Dinheiro</MenuItem>
        <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
        <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
      </TextField>
      <TextField
        select
        label="Tag"
        value={ tag }
        onChange={ setTag }
      >
        <MenuItem value="Lazer">Lazer</MenuItem>
        <MenuItem value="Alimentação">Alimentação</MenuItem>
        <MenuItem value="Trabalho">Trabalho</MenuItem>
        <MenuItem value="Transporte">Transporte</MenuItem>
        <MenuItem value="Saúde">Saúde</MenuItem>
      </TextField>
    </Box>
  );
}

Select.propTypes = {
  tag: PropTypes.string.isRequired,
  setMethod: PropTypes.func.isRequired,
  setTag: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  coins: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Select;
