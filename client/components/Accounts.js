import React from 'react'
import {connect} from 'react-redux'

import '../style/Table.css'

const Accounts = props => {
  const {accounts} = props
  // console.log('Accounts component -->', accounts)
  // accounts.forEach((account) => console.log(account))
  return (
    <div>
      Accounts
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Balance</th>
          </tr>
          {accounts.length ? (
            accounts.map((account, idx) => (
              <tr key={account.id} className={idx % 2 ? 'grey' : ''}>
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
    </div>
  )
}

const mapState = ({bank: {accounts}}) => ({
  accounts
})

export default connect(mapState)(Accounts)
