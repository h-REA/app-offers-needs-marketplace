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

// form labels (:TODO: put into i18n framework)
const ACTION_FORM_LABELS = {
  work: 'Do some work',
  'deliver-service': 'Provide a service',
  transfer: 'Gift something',
  'transfer-custody': 'Lend something',
}
const DATE_SELECTION_LABELS = {
  none: 'Any time',
  single: 'At precisely',
  range: 'Between',
}

// -- EVENT HANDLERS --

// pull dependent data for change event
function onSubmit (data, context) {
  const derivedIntent = Object.assign({
    provider: data.provider,
    action: data.action,
  },
  (data.dateMode === 'single' ? {
    hasPointInTime: data.hasPointInTime,
  } : {}),
  (data.dateMode === 'range' ? {
    hasBeginning: data.hasBeginning,
    hasEnd: data.hasEnd,
  } : {}))
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
  hasBeginning: yup.date().when('dateMode', {
    is: 'range',
    then: yup.date().required(),
    otherwise: yup.date(),
  }),
  hasEnd: yup.date().when('dateMode', {
    is: 'range',
    then: yup.date().required(),
    otherwise: yup.date(),
  }),
  hasPointInTime: yup.date().when('dateMode', {
    is: 'single',
    then: yup.date().required(),
    otherwise: yup.date(),
  }),
  due: yup.date(),
  // atLocation: location.clone(),
  // agreedIn: yup.string(),

  // not part of VF spec- internal form state
  dateMode: yup.string().oneOf(['none', 'single', 'range']).default('none'),
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

  <p use:validity>
    {#each ['none', 'single', 'range'] as mode}
    <label>
      <input type=radio bind:group={$values.dateMode} value={mode} />
      {DATE_SELECTION_LABELS[mode]}
    </label>
    {/each}
    <FieldError at="dateMode" />
  </p>

  {#if $values.dateMode !== 'none'}
  <p use:validity>
    {#if $values.dateMode === 'single'}
      <DateInput bind:value={$values.hasPointInTime} />
      <FieldError at="hasPointInTime" />
    {:else if $values.dateMode === 'range'}
      <DateInput bind:value={selectedTimeRange} selectRange={true}/>
      <FieldError at="hasBeginning" />
      <FieldError at="hasEnd" />
    {/if}
  </p>
  {/if}

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
