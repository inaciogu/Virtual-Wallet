import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button,
  Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { deleteExpenses } from '../actions';

function ExpenseTable() {
  const expensesWallet = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const { format } = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Tag</TableCell>
            <TableCell align="center">Método</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Moeda</TableCell>
            <TableCell align="center">Cambio</TableCell>
            <TableCell align="center">Valor convertido</TableCell>
            <TableCell align="center">Moeda de conversão</TableCell>
            <TableCell align="center">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expensesWallet.map((expense) => (
            <TableRow key={ expense.id }>
              <TableCell align="center">{expense.description}</TableCell>
              <TableCell align="center">{expense.tag}</TableCell>
              <TableCell align="center">{expense.method}</TableCell>
              <TableCell
                align="center"
              >
                {`${expense.value} ${expense.currency}`}

              </TableCell>
              <TableCell align="center">{expense.currency}</TableCell>
              <TableCell align="center">.</TableCell>
              <TableCell align="center">
                {format(expense.value * expense.exchangeRates[expense.currency].ask)}
              </TableCell>
              <TableCell align="center">Real</TableCell>
              <TableCell align="center">
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={ () => dispatch(deleteExpenses(expense.id)) }
                  type="button"
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseTable;
