<script lang="typescript">
  import Router from 'routve'
  import { getClient, query } from 'svelte-apollo'
  import { readOpenOffers } from './queries.ts'

  import OffersNav from './offers-nav'

  const client = getClient()
  // const offers = query(client, { query: readOpenOffers })
</script>

<section>
  <OffersNav />

  <Router basePath="/offers" />

  <div class="timeline">
    todo
  </div>
</section>
