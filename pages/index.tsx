import moment from 'moment'

import {
  COIN_MARKET_CAP_API_BASE_URL,
  COIN_MARKET_CAP_AUTH_HEADER,
  COIN_MARKET_CAP_API_KEY,
  NOMICS_API_BASE_URL,
  NOMICS_API_KEY
} from '../constants'

function Home({ currencies, chartData }) {
  console.log('currencies: ', currencies)
  console.log('chartData: ', chartData)

  return (
    <div>
      <h2>hello, world</h2>
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
