import axios from 'axios'

const GET_LINK_TOKEN = 'GET_LINK_TOKEN'

const setLinkToken = token => ({
  type: GET_LINK_TOKEN,
  token
})

export const fetchLinkToken = () => async dispatch => {
  try {
    const {data} = await axios.post('/api/plaid/create_link_token')
    dispatch(setLinkToken(data))
  } catch (error) {
    console.error(error)
  }
}

export default (state = '', action) => {
  switch (action.type) {
    case GET_LINK_TOKEN:
      return action.token
    default:
      return state
  }
}
