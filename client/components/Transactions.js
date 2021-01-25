import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

const Transactions = props => {
  const {transactions} = props
  console.log('Transactions component -->', transactions)
  return (
    <table>
      <thead>
        <tr>
          <th>Transactions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
        {transactions.length ? (
          transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.category.join(', ')}</td>
              <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
              <td>{transaction.amount}</td>
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

const mapState = ({bank: {transactions}}) => ({
  transactions
})

export default connect(mapState)(Transactions)
