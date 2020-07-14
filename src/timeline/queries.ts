import gql from 'graphql-tag'

// :TODO: reuse query fragments

export const readListingTimeline = gql`{
  proposals {
    id
    note
    name
    hasBeginning
    hasEnd
    created
    inScopeOf
    publishes {
      id
      reciprocal
      publishes {
        id
        note
        name
        action
        provider
        receiver
        resourceClassifiedAs
        resourceConformsTo {
          id
          name
          note
        }
        resourceInventoriedAs {
          id
          name
          note
        }
        resourceQuantity {
          hasNumericalValue
          hasUnit {
            id
            label
            symbol
          }
        }
        effortQuantity {
          hasNumericalValue
          hasUnit {
            id
            label
            symbol
          }
        }
      }
    }
    publishedTo {
      id
      proposedTo {
        id
        name
        image
      }
    }
  }
}`
