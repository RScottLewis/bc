import Remote from '../../../remote'
import * as AT from './actionTypes'
import { CoinsActionTypes, CoinsState } from './types'

const INITIAL_STATE: CoinsState = {
  balances: {},
  btcTicker: Remote.NotAsked,
  rates: Remote.NotAsked,
  transactions: {},
  transactions_at_bound: {}
}

export const coinsReducer = (state = INITIAL_STATE, action: CoinsActionTypes): CoinsState => {
  switch (action.type) {
    case AT.FETCH_COIN_DATA_FAILURE:
      return {
        ...state,
        balances: { ...state.balances, [action.payload.coin]: Remote.Failure(action.payload.error) }
      }
    case AT.FETCH_COIN_DATA_LOADING:
      return {
        ...state,
        balances: { ...state.balances, [action.payload.coin]: Remote.Loading }
      }
    case AT.FETCH_COIN_DATA_SUCCESS:
      return {
        ...state,
        balances: {
          ...state.balances,
          [action.payload.coin]: Remote.Success(action.payload.balance)
        }
      }
    case AT.FETCH_COINS_RATES_FAILURE:
      return {
        ...state,
        rates: Remote.Failure(action.payload.error)
      }
    case AT.FETCH_COINS_RATES_LOADING:
      return {
        ...state,
        rates: Remote.Loading
      }
    case AT.FETCH_COINS_RATES_SUCCESS:
      return {
        ...state,
        rates: Remote.Success(action.payload.rates)
      }
    case AT.FETCH_COINS_TRANSACTIONS_FAILURE:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.coin]: [Remote.Failure(action.payload)]
        }
      }
    case AT.FETCH_BTC_TICKER_FAILURE:
      return {
        ...state,
        btcTicker: Remote.Failure(action.payload.error)
      }
    case AT.FETCH_BTC_TICKER_LOADING:
      return {
        ...state,
        btcTicker: Remote.Loading
      }
    case AT.FETCH_BTC_TICKER_SUCCESS:
      return {
        ...state,
        btcTicker: Remote.Success(action.payload.rates)
      }
    case AT.FETCH_COINS_TRANSACTIONS_LOADING:
      const { reset } = action.payload
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.coin]: reset
            ? [Remote.Loading]
            : [...state.transactions[action.payload.coin], Remote.Loading]
        }
      }
    case AT.FETCH_COINS_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.coin]: [
            ...state.transactions[action.payload.coin].filter(
              (tx, i) => i !== state.transactions[action.payload.coin].length - 1
            ),
            Remote.Success(action.payload.transactions)
          ]
        }
      }
    case AT.COINS_TRANSACTIONS_AT_BOUND: {
      return {
        ...state,
        transactions_at_bound: {
          ...state.transactions_at_bound,
          [action.payload.coin]: action.payload.atBounds
        }
      }
    }
    default: {
      return state
    }
  }
}

export default coinsReducer
