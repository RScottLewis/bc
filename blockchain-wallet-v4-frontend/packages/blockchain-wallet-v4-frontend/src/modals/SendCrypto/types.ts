import { BuildTxFeeType } from '@core/network/api/coin/types'
import { SwapAccountType } from 'data/types'

export type SendFormType = {
  amount: string
  coin: string
  fee: BuildTxFeeType
  fix: 'CRYPTO' | 'FIAT'
  selectedAccount: SwapAccountType
  to: string
}
