<script>
  import { createEventDispatcher } from 'svelte'
  import { formup } from 'svelte-formup'
  import * as yup from 'yup'

  import { ACTION_IDS_MARKETPLACE } from '@vf-ui/core'

  import DateInput from '@vf-ui/form-input-date'
  import FieldError from '@vf-ui/form-field-error'

  // -- PROPS --

  export let contextAgent

  // -- BINDINGS --

  // direct access to form submission handler, to integrate in parent component submit handlers
  export let validate

  // -- INTERNAL STATE --

  let selectedTimeRange = []
  let singleDateSelection = true

  // form labels (:TODO: put into i18n framework)
  const ACTION_FORM_LABELS = {
    work: 'Do some work',
    'deliver-service': 'Provide a service',
    transfer: 'Gift something',
    'transfer-custody': 'Lend something',
  }

  // -- EVENT HANDLERS --

  function setSingleTime (single) {
    singleDateSelection = single
  }

  // pull dependent data for change event
  function onSubmit (data, context) {
    const derivedIntent = Object.assign({
      provider: data.provider,
      action: data.action,
    }, (singleDateSelection ? {
      hasPointInTime: data.hasPointInTime,
    } : {
      hasBeginning: data.hasBeginning,
      hasEnd: data.hasEnd,
    }))
    dispatch('validated', derivedIntent)
  }

  // -- INIT LOGIC --

  const dispatch = createEventDispatcher()

  // const measure = yup.object().shape({
  //   hasNumericalValue: yup.number(),
  //   hasUnit: yup.string(),
  // })

  // const location = yup.object().shape({
  //   name: yup.string().required(),
  //   note: yup.string(),
  //   mappableAddress: yup.string(),
  //   lat: yup.number(),
  //   lng: yup.number(),
  //   alt: yup.number(),
  // })

  const formSpec = yup.object().shape({
    provider: yup.string().required(),
    action: yup.string().oneOf(ACTION_IDS_MARKETPLACE).required(),
    name: yup.string(),
    note: yup.string(),
    // image: yup.string(),
    // resourceClassifiedAs: yup.array().of(yup.string()).ensure(),
    // resourceConformsTo: yup.string(),
    // resourceInventoriedAs: yup.string(),
    // resourceQuantity: measure.clone(),
    // effortQuantity: measure.clone(),
    // availableQuantity: measure.clone(),
    hasBeginning: yup.date(),
    hasEnd: yup.date(),
    hasPointInTime: yup.date(),
    due: yup.date(),
    // atLocation: location.clone(),
    // agreedIn: yup.string(),
  })

  const formCtx = formup({
    schema: formSpec,
    onSubmit,
  })
  const { values, errors, dirty, validate: validateForm, validity } = formCtx
  validate = formCtx.submit

  // reactive handlers to publish local state back into the form validator
  $: $values.provider = contextAgent
  $: {
    if (selectedTimeRange && selectedTimeRange.length === 2) {
      $values.hasBeginning = selectedTimeRange[0].start
      $values.hasEnd = selectedTimeRange[1].end
    }
  }
</script>

<form use:validateForm>
  <h3>What are you offering?</h3>

  <p use:validity>
    {#each ACTION_IDS_MARKETPLACE as action}
    <label>
      <input type=radio bind:group={$values.action} value={action} />
      {ACTION_FORM_LABELS[action]}
    </label>
    {/each}
    <FieldError at="action" />
  </p>

  <!-- :TODO: resource autocomplete -->

  <h3>When is it available?</h3>

  <p>
    <button class={singleDateSelection ? 'active' : ''} on:click|preventDefault={() => setSingleTime(true)}>at</button> |
    <button class={singleDateSelection ? '' : 'active'} on:click|preventDefault={() => setSingleTime(false)}>between</button>
  </p>

  <p use:validity>
    {#if singleDateSelection}
      <DateInput bind:value={$values.hasPointInTime} />
      <FieldError at="hasPointInTime" />
    {:else}
      <DateInput bind:value={selectedTimeRange} selectRange={true}/>
      <FieldError at="hasBeginning" />
      <FieldError at="hasEnd" />
    {/if}
  </p>

  <h3>Does this offer expire?</h3>

  <!-- <p use:validity>
    <label for="name">Title</label>
    <textarea id="name" bind:value="{$values.name}" />
    <FieldError at="name" />
  </p> -->

  <!-- <p use:validity>
    <label for="note">Notes</label>
    <textarea id="note" bind:value="{$values.note}" />
    <FieldError at="note" />
  </p> -->

  <!-- :TODO: image -->

  <!-- :TODO: attachments -->

  <!-- :TODO: location -->

  <!-- :TODO: agreement -->
</form>

<style>
  button.active {
    font-weight: bold;
  }
</style>
