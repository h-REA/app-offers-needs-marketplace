import gql from 'graphql-tag'

export const queryMyAgent = gql`
  query {
    myAgent {
      id
    }
  }
`
