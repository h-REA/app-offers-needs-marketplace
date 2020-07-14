<script lang="typescript">
  import { getClient, query } from 'svelte-apollo'
  import { readListingTimeline } from './queries.ts'

  const client = getClient()
console.warn(client)
  const proposals = query(client, { query: readListingTimeline })
</script>

<div class="timeline">
{#await $proposals}
  Loading...
{:then result}
  {console.log('RES', result)}
  <ul>
    {#each result.data.proposals as proposal}
      <li>{proposal.name}</li>
    {/each}
  </ul>
{:catch error}
  Error: {error}
{/await}
</div>
