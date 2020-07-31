<script>
/**
 * HoC which reads the active agent ID and provides it to child
 * components via `contextAgent` prop.
 *
 * Usage:
 *
 *   <BindContextAgent let:contextAgent>
 *     <SomethingThatNeedsAgent {contextAgent} {...props} />
 *   </BindContextAgent>
 *
 * @package  ValueFlows UI
 * @since    2020-07-31
 */
import { getClient, query } from 'svelte-apollo'

import { queryMyAgent } from './queries.ts'

const client = getClient()
const agent = query(client, { query: queryMyAgent })

let loading = true
let contextAgent
let error

agent.subscribe(promise => {
  promise
    /* eslint no-return-assign: 0 */
    .then(val => contextAgent = val.data.myAgent.id)
    .catch(e => error = e)
    .finally(() => loading = false)
})
</script>

{#if loading}
  <!-- :TODO: need to pull this from a caching store so it's already available before render -->
{:else if error}
  <!-- :TODO: nicer error message -->
  Agent loading failed: {error}
{:else}
  <slot {contextAgent}></slot>
{/if}
