import gql from 'graphql-tag'

import OffersQueries from '../queries'

export const createIntent = gql`
  mutation($intent: IntentCreateParams) {
    createIntent(intent: $intent) {
      intent {
        ...OffersIntent
      }
    }
  }
  ${OffersQueries.fragments.intent}
`
