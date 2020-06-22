import React, { useState } from 'react'
import moment from 'moment'

import {
  VictoryChart,
  VictoryLine,
  VictoryAxis
} from 'victory'

import {
  COIN_MARKET_CAP_API_BASE_URL,
  COIN_MARKET_CAP_AUTH_HEADER,
  COIN_MARKET_CAP_API_KEY,
  NOMICS_API_BASE_URL,
  NOMICS_API_KEY,
  VICTORY_LINE_CHART_THEME
} from '../constants'

function Home({ currencies, chartData }) {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const generateChartInput = () => {
    const selectedCurrencyChartData = chartData.find(chartDataEntry =>
      chartDataEntry.currency === selectedCurrency.symbol
    )

    const { prices, timestamps } = selectedCurrencyChartData

    const chartInput = prices.map((price, index) => {
      const date = timestamps[index]
      return {
        date,
        price: Number(price)
      }
    })

    return chartInput
  }

  const getXAxisLabel = date => (
    moment(date).format('MMM YY')
  )

  const data = generateChartInput()
  return (
    <div style={{ maxWidth: 768 }}>
      <VictoryChart
        width={768}
        height={500}
        theme={VICTORY_LINE_CHART_THEME}
        domainPadding={{ y: 50 }}
        padding={100}
      >
        <VictoryLine
          data={data}
          interpolation="natural"
          x="date"
          y="price"
          animate={{
            duration: 2000,
            onLoad: { duration: 750 }
          }}
        />
        <VictoryAxis
          tickValues={data.map(dataPoint => dataPoint.date)}
          tickFormat={getXAxisLabel}
          tickCount={6}
        />
        <VictoryAxis dependentAxis />
      </VictoryChart>

      <style jsx global>
        {`
          html {
            background: #171717;
          }
        `}
      </style>
    </div>
  )
}

Home.getInitialProps = async () => {
  const topCurrenciesUrl = (
    `${COIN_MARKET_CAP_API_BASE_URL}/` +
    `cryptocurrency/listings/latest?limit=25`
  )

  const topCurrenciesRequestConfig = {
    headers: {
      [COIN_MARKET_CAP_AUTH_HEADER]: COIN_MARKET_CAP_API_KEY
    }
  }

  const topCurrenciesResponse = await (
    fetch(topCurrenciesUrl, topCurrenciesRequestConfig)
      .then(response => response.json())
  )

  const topCurrencies = topCurrenciesResponse.data

  const topCurrencyIds = topCurrencies.map(currency =>
    currency.symbol
  )

  const chartDataStart = (
    moment().subtract(1, 'y')
      .toISOString()
  )

  const currenciesChartDataUrl = (
    `${NOMICS_API_BASE_URL}/currencies/sparkline?` +
    `key=${NOMICS_API_KEY}&` +
    `ids=${topCurrencyIds.join(',')}&` +
    `start=${encodeURIComponent(chartDataStart)}`
  )

  const currenciesChartData = await (
    fetch(currenciesChartDataUrl)
      .then(response => response.json())
  )

  return {
    currencies: topCurrencies,
    chartData: currenciesChartData
  }
}

export default Home
