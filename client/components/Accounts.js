import React from 'react'
import {connect} from 'react-redux'

import '../style/Table.css'

const Accounts = props => {
  const {accounts} = props

  return (
    <div>
      <p>Accounts</p>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Balance</th>
          </tr>
          {accounts.length ? (
            accounts.map((account, idx) => (
              <tr
                key={account.id}
                className={`account-selection ${idx % 2 ? 'grey' : ''}`}
              >
                <td>
                  {account.officialName ? account.officialName : account.name}
                </td>
                <td>${account.balance ? account.balance : '0.00'}</td>
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
