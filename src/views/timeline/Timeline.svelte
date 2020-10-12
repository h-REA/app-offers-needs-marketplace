<script>
  import { query } from 'svelte-apollo'
  import { readListingTimeline } from './queries.ts'

  const proposals = query(readListingTimeline)
</script>

<div class="timeline">
{#if $proposals.loading}
  Loading...
{:else if $proposals.error}
  Error: {$proposals.error.message}
{:else}
  <ul>
    {#each $proposals.data.proposals as proposal}
      <li>{proposal.name}</li>
    {/each}
  </ul>
{/if}
</div>
