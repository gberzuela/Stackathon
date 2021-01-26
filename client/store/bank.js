import axios from 'axios'
import moment from 'moment'

const GET_BANK = 'GET_BANK'
const FILTER = 'FILTER'

const getBank = (accounts, transactions) => ({
  type: GET_BANK,
  accounts,
  transactions
})

export const filterTransactions = accountId => ({
  type: FILTER,
  accountId
})

export const fetchBank = () => async dispatch => {
  try {
    let {data: {accounts, transactions}} = await axios.get('/api/users/bank')

    transactions = transactions.sort((a, b) => moment(b.date) - moment(a.date))

    dispatch(getBank(accounts, transactions))
  } catch (error) {
    console.error(error)
  }
}

export default (
  state = {accounts: [], transactions: [], filtered: []},
  action
) => {
  switch (action.type) {
    case GET_BANK:
      return {
        accounts: action.accounts,
        transactions: action.transactions,
        filtered: action.transactions
      }
    case FILTER: {
      const setFiltered = state.transactions.filter(
        transaction => transaction.accountId === action.accountId
      )
      return {...state, filtered: setFiltered}
    }
    default:
      return state
  }
}
