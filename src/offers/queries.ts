import gql from 'graphql-tag'

// :TODO: reuse query fragments

export const fragments = {
  proposal: gql`
    fragment OffersProposal on Proposal {
      id
      name
      note
      created
      hasBeginning
      hasEnd
      unitBased
    }
  `,
  intent: gql`
    fragment OffersIntent on Intent {
      id
      name
      note
      action
      inputOf
      outputOf
      provider
      receiver
      resourceClassifiedAs
      resourceConformsTo {
        id
        name
        note
        image
      }
    }
  `,
}

export const readOpenOffers = gql`
  query {
    intents {
      ...OffersIntent
    }
  }
  ${fragments.intent}
`
