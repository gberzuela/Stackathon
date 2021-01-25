import React from 'react'
import {connect} from 'react-redux'

const Accounts = props => {
  const {accounts} = props
  // console.log('Accounts component -->', accounts)
  // accounts.forEach((account) => console.log(account))
  return (
    <table>
      <thead>
        <tr>
          <th>Accounts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Balance</th>
        </tr>
        {accounts.length ? (
          accounts.map(account => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.balance ? account.balance : 0}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>No data. Try syncing.</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const mapState = ({bank: {accounts}}) => ({
  accounts
})

export default connect(mapState)(Accounts)
