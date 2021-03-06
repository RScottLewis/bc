import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
  BankWaitIndicator,
  BankWrapper,
  Hr,
  LinkOptionsWrapper,
  LinkViaDesktop,
  ModalNavWithCloseIcon,
  ScanWithPhone,
  Section
} from '../../../../components'
import { OwnProps, Props as _P, SuccessStateType } from '.'

type Props = OwnProps & SuccessStateType & _P

const Success = (props: Props) => {
  const media = props.account?.attributes?.media
  const logo = (media && media.length && media[0].source) || ''
  return (
    <BankWrapper>
      <ModalNavWithCloseIcon {...props}>
        <FormattedMessage id='copy.connect_to_your_bank' defaultMessage='Connect to your bank' />
      </ModalNavWithCloseIcon>
      <LinkOptionsWrapper>
        <ScanWithPhone
          logo={logo as string}
          qrCode={props.account?.attributes?.qrcodeUrl as string}
        >
          {props.isFlow ? (
            <FormattedMessage
              id='modals.brokerage.pay_via_mobile'
              defaultMessage='Pay via mobile'
            />
          ) : (
            <FormattedMessage
              id='modals.brokerage.link_via_mobile'
              defaultMessage='Link via mobile'
            />
          )}
        </ScanWithPhone>
        <Hr />
        <Section>
          <LinkViaDesktop authUrl={props.account?.attributes?.authorisationUrl as string}>
            {props.isFlow ? (
              <FormattedMessage
                id='modals.brokerage.pay_via_desktop'
                defaultMessage='Pay via desktop'
              />
            ) : (
              <FormattedMessage
                id='modals.brokerage.link_via_desktop'
                defaultMessage='Link via desktop'
              />
            )}
          </LinkViaDesktop>
          <BankWaitIndicator qrCode={props.account?.attributes?.qrcodeUrl as string} />
        </Section>
      </LinkOptionsWrapper>
    </BankWrapper>
  )
}

export default Success
