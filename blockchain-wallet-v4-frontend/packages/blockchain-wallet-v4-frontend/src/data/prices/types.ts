import { CoinType, RemoteDataType, WalletFiatType } from '@core/types'

// TODO: type this!
export type PricesStateType = {
  current: RemoteDataType<any, any>
  previousDay: RemoteDataType<any, any>
}

export type CoinPricesRequestType = {
  coins?: Array<CoinType>
  fiatCurrency?: WalletFiatType
  timestamp?: number
}
