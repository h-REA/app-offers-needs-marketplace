<script lang="typescript">
  import Router from 'routve'
  import { setClient } from 'svelte-apollo'

  import initGraphQLClient from './graphql-client'
  import routerConfig from './router-config'

  // init and manage GraphQL client connection
  let client = null
  let loading = true
  let error = null

  async function initConnection() {
    try {
      client = await initGraphQLClient()
    } catch (e) {
      error = e
    }
    loading = false
    error = null
  }

  initConnection()

  // :SHONK: workaround to set the context outside of init action
  $: {
    if (client) {
      setClient(client)
    }
  }
</script>

<main>
  {#if loading}
    <h1>Loading...</h1>
  {:else if error}
    <h1>Cannot connect to Holochain</h1>
    <p>{error.message}</p>
  {:else}
    <Router routerConfig={routerConfig} />
  {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
