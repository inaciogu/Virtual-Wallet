import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Forms from '../components/Forms';
import ExpenseTable from '../components/ExpenseTable';

function Wallet() {
  const [open, setOpen] = useState(false);
  const expenses = useSelector((state) => state.wallet.expenses);

  function handleExpenses() {
    const expense = expenses.reduce((acc, cur) => {
      acc += cur.exchangeRates[cur.currency].ask * cur.value;
      return acc;
    }, 0);
    return expense;
  }

  const email = useSelector((state) => state.user.email);
  return (
    <div>
      <header>
        <h1>Virtual Wallet</h1>
        <span data-testid="email-field">{`Bem vindo(a) ${email}`}</span>
        <div
          data-testid="total-field"
        >
          {`Despesas: ${handleExpenses()}`}
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
      <main className="main">
        <Forms open={ open } handleClose={ () => setOpen(false) } />
        <Button
          style={ { marginBottom: '2rem' } }
          variant="contained"
          color="primary"
          onClick={ () => setOpen(true) }
        >
          Adicionar uma despesa
        </Button>
        <ExpenseTable />
      </main>
    </div>
  );
}

export default Wallet;
