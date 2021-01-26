import React from 'react'
import {connect} from 'react-redux'
import {PieChart, Pie, Tooltip, Cell} from 'recharts'

const Graphs = ({transactions}) => {
  const colors = [
    '#60D394',
    '#C490D1',
    '#8C1C13',
    '#FCDDBC',
    '#6CBEED',
    '#EF959D'
  ]

  const food = transactions.reduce(
    (result, item) => {
      if (
        item.category.indexOf('Food and Beverage') > -1 ||
        item.category.indexOf('Food and Drink') > -1
      ) {
        result.value += Number(item.amount)
      }
      return result
    },
    {name: 'Food and Drink', value: 0}
  )

  const shops = transactions.reduce(
    (result, item) => {
      if (item.category.indexOf('Shops') > -1)
        result.value += Number(item.amount)
      return result
    },
    {name: 'Shops', value: 0}
  )

  const loans = transactions.reduce(
    (result, item) => {
      if (item.category.indexOf('Loans and Mortgages') > -1)
        result.value += Number(item.amount)
      return result
    },
    {name: 'Loans and Mortgages', value: 0}
  )

  const travel = transactions.reduce(
    (result, item) => {
      if (item.category.indexOf('Travel') > -1)
        result.value += Number(item.amount)
      return result
    },
    {name: 'Travel', value: 0}
  )

  const recreation = transactions.reduce(
    (result, item) => {
      if (item.category.indexOf('Recreation') > -1)
        result.value += Number(item.amount)
      return result
    },
    {name: 'Recreation', value: 0}
  )

  const automotive = transactions.reduce(
    (result, item) => {
      if (item.category.indexOf('Automotive') > -1)
        result.value += Number(item.amount)
      return result
    },
    {name: 'Automotive', value: 0}
  )

  console.log('Food data -->', {...food, value: food.value.toFixed(2)})
  console.log('Shops data -->', {...shops, value: shops.value.toFixed(2)})
  console.log('Loans data -->', {...loans, value: loans.value.toFixed(2)})
  console.log('Travel data -->', {...travel, value: travel.value.toFixed(2)})
  console.log('Recreation data -->', {
    ...recreation,
    value: recreation.value.toFixed(2)
  })
  console.log('Automotive data -->', {
    ...automotive,
    value: automotive.value.toFixed(2)
  })

  const data = [
    {...food, value: Number(food.value.toFixed(2))},
    {...shops, value: Number(shops.value.toFixed(2))},
    {...loans, value: Number(loans.value.toFixed(2))},
    {...travel, value: Number(travel.value.toFixed(2))},
    {
      ...recreation,
      value: Number(recreation.value.toFixed(2))
    },
    {
      ...automotive,
      value: Number(automotive.value.toFixed(2))
    }
  ]

  console.log('Data -->', data)

  return (
    <div>
      {!data.length ? (
        <></>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  )
}

const mapState = ({bank: {transactions}}) => ({
  transactions
})

export default connect(mapState)(Graphs)
