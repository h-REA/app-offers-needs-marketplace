<script>
  import { getFormupContext } from 'svelte-formup'

  export let at

  const { invalid } = getFormupContext()

  let error

  $: error = $invalid.get(at)
</script>

{#if error}
<span class="error" aria-live="polite">
  <slot {error}>{error.message}</slot>
</span>
{/if}

<style>
.error {
  color: #D00;
  background: #FEE;
  padding: 0.3em 0.5em;
}
</style>
