import axios from 'axios'

const GET_BANK = 'GET_BANK'

const getBank = (accounts, transaction) => ({
  type: GET_BANK,
  accounts,
  transaction
})

export const fetchBank = () => async dispatch => {
  try {
    const {data: {accounts, transactions}} = await axios.get('/api/users/bank')
    dispatch(getBank(accounts, transactions))
  } catch (error) {
    console.error(error)
  }
}

export default (state = {accounts: [], transactions: []}, action) => {
  switch (action.type) {
    case GET_BANK:
      return {accounts: action.accounts, transactions: action.transactions}
    default:
      return state
  }
}
