import gql from 'graphql-tag'

import OffersQueries from '../queries'

// :TODO: reuse query fragments

export const createProposal = gql`
  mutation($proposal: ProposalCreateParams) {
    createProposal(proposal: $proposal) {
      proposal {
        ...OffersProposal
      }
    }
  }
  ${OffersQueries.fragments.proposal}
`

export const createProposedIntent = gql`
mutation($proposal: ID!, $intent: ID!, $reciprocal: Boolean) {
  proposeIntent(publishedIn: $proposal, publishes: $intent, reciprocal: $reciprocal) {
    proposedIntent {
      id
      publishedIn
      publishes
      reciprocal
    }
  }
}`

export const createProposedTo = gql`
mutation($proposal: ID!, $agent: ID!) {
  proposeTo(proposed: $proposal, proposedTo: $agent) {
    proposedTo {
      id
      proposed
      proposedTo
    }
  }
}`
