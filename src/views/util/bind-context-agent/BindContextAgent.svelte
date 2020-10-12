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
import { query } from 'svelte-apollo'

import { queryMyAgent } from './queries.ts'

const agent = query(queryMyAgent)
</script>

{#if $agent.loading}
  <!-- :TODO: need to pull this from a caching store so it's already available before render -->
{:else if $agent.error}
  <!-- :TODO: nicer error message -->
  Agent loading failed: {$agent.error.message}
{:else}
  <slot contextAgent={$agent.data.myAgent.id}></slot>
{/if}
