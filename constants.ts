import { VictoryTheme } from 'victory'
const NOMICS_API_BASE_URL = 'https://api.nomics.com/v1'
const NOMICS_API_KEY = process.env.NOMICS_API_KEY
const COIN_MARKET_CAP_API_BASE_URL = 'https://pro-api.coinmarketcap.com/v1'
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY
const COIN_MARKET_CAP_AUTH_HEADER = 'X-CMC_PRO_API_KEY'

const VICTORY_LINE_CHART_THEME: typeof VictoryTheme.grayscale = {
  axis: {
    style: {
      tickLabels: {
        font: 'sans-serif',
        stroke: '#ccc',
        fontWeight: 300,
        padding: 20
      },
      grid: {
        fill: 'none',
        stroke: 'none',
        pointerEvents: 'painted'
      },
    }
  },
  line: {
    style: {
      data: {
        stroke: '#ccc',
        strokeWidth: '2px'
      }
    }
  }
}

export {
  NOMICS_API_BASE_URL,
  NOMICS_API_KEY,
  COIN_MARKET_CAP_API_BASE_URL,
  COIN_MARKET_CAP_API_KEY,
  COIN_MARKET_CAP_AUTH_HEADER,
  VICTORY_LINE_CHART_THEME
}
