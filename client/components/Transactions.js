import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import '../style/Table.css'

const Transactions = props => {
  const {filtered, handleFilter} = props

  return (
    <div>
      <p className="transaction-clicker" onClick={() => handleFilter()}>
        Transactions
      </p>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
          {filtered.length ? (
            filtered.map((transaction, idx) => (
              <tr key={transaction.id} className={idx % 2 ? 'grey' : ''}>
                <td>{transaction.name}</td>
                <td>{transaction.category.join(', ')}</td>
                <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
                <td>${transaction.amount}</td>
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

const mapState = ({bank: {filtered}}) => ({
  filtered
})

export default connect(mapState)(Transactions)
