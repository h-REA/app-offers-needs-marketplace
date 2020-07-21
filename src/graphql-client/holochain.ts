/**
 * GraphQL client interface for Holochain connection
 *
 * :TODO: sniff active DNA configuration from conductor
 *
 * @package  Holo-REA GraphQL client
 * @since    2020-07-14
 */

import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache } from 'apollo-cache-inmemory'

import bindSchema from '@valueflows/vf-graphql-holochain'

async function initGraphQLClient() {
  const schema = bindSchema(/* modules, DNA id bindings */)

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema })
  });
}

export default initGraphQLClient;
