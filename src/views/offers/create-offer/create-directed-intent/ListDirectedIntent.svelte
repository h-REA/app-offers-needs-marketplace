<script>
/**
 * Form control for adding a "directed" intent, where the `contextAgent`
 * is either the `provider` or `receiver` of the intent being cast.
 *
 * @package  ValueFlows UI
 * @since    2020-08-12
 */
import { createEventDispatcher } from 'svelte'
import { formup } from 'svelte-formup'

import { ACTION_IDS_MARKETPLACE } from '@vf-ui/core'
import { buildFormSpec, buildSubmitHandler } from './schemas.ts'

import DateInput from '@vf-ui/form-input-date'
import MeasureInput from '@vf-ui/form-input-measure'
import FieldError from '@vf-ui/form-field-error'

// -- PROPS --

export let contextAgent
export let contextAgentType = 'provider' // or 'receiver'
export let formTitle
export let temporalFormTitle

// form labels (:TODO: put into i18n framework)
// action labels are configurable since they depend on the context agent type...
export let ACTION_FORM_LABELS = {
  transfer: 'Transfer a resource',
  'transfer-custody': 'Lend a resource',
  work: 'Do some work',
  'deliver-service': 'Provide a specialised service',
}
// ...as for dates, you may just want to change them.
export let DATE_SELECTION_LABELS = {
  none: 'Any time',
  single: 'At precisely',
  before: 'Before',
  range: 'Between',
  after: 'Any time after',
}

// -- BINDINGS --

// direct access to form submission handler, to integrate in parent component submit handlers
export let validate

// -- INTERNAL STATE --

let selectedTimeRange = []

// -- EVENT HANDLERS --

const dispatch = createEventDispatcher()
const onSubmit = buildSubmitHandler(contextAgentType, dispatch)

// -- INIT LOGIC --

const formCtx = formup({
  schema: buildFormSpec(contextAgentType),
  onSubmit,
})
const { values, errors, dirty, validate: validateForm, validity } = formCtx

// pull submit action from form for parent controls to trigger programatically
validate = formCtx.submit

// initialise form state
$values.dateMode = 'none'
// initialise default values
$values.action = 'transfer'
$values.resourceQuantity = { hasNumericalValue: 1 }

// reactive handlers to publish local state back into the form validator
$: $values.provider = contextAgent
$: {
  if (selectedTimeRange && selectedTimeRange.length === 2) {
    $values.hasBeginning = selectedTimeRange[0].start
    $values.hasEnd = selectedTimeRange[1].end
  }
}

const DATE_INPUT_TYPES = ['none', 'single', 'before', 'range', 'after']
</script>

<form use:validateForm>
  <h3>{formTitle}</h3>

  <p use:validity>
    {#each ACTION_IDS_MARKETPLACE as action}
    <label>
      <input type=radio bind:group={$values.action} value={action} />
      {ACTION_FORM_LABELS[action]}
    </label>
    {/each}
    <FieldError at="action" />
  </p>

  <p use:validity>
    <!-- :TODO: resource autocomplete -->
    <input type="text" bind:value={$values.resourceConformsTo} />
    <FieldError at="resourceConformsTo" />
  </p>

  {#if $values.action === 'transfer' || $values.action === 'transfer-custody'}
    <h3>How many?</h3>
  {:else}
    <h3>For how long?</h3>
    <!-- :TODO: should "deliver-service" give the option for time-based & unitless measures? What about other unit types? -->
  {/if}
  <p use:validity>
    <MeasureInput bind:normalizedValue={$values.resourceQuantity} />
    <small>(leave blank if you don't know yet)</small>
    <FieldError at="resourceQuantity" />
  </p>

  {#if $values.action === 'transfer-custody'}
    <h3>For how long?</h3>
    <p use:validity>
      <MeasureInput bind:normalizedValue={$values.effortQuantity} />
      <small>(Leave blank for no limit)</small>
      <FieldError at="resourceQuantity" />
    </p>
  {/if}

  <h3>{temporalFormTitle}</h3>

  <p use:validity>
    {#each DATE_INPUT_TYPES as mode}
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
    {:else if $values.dateMode === 'after'}
      <DateInput bind:value={$values.hasBeginning} />
      <FieldError at="hasBeginning" />
    {:else if $values.dateMode === 'before'}
      <DateInput bind:value={$values.hasEnd} />
      <FieldError at="hasEnd" />
    {:else if $values.dateMode === 'range'}
      <DateInput bind:value={selectedTimeRange} selectRange={true}/>
      <FieldError at="hasBeginning" />
      <FieldError at="hasEnd" />
    {/if}
  </p>
  {/if}

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
  small {
    color: #888;
    font-style: italic;
  }
</style>
