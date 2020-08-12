<script>
import * as yup from 'yup'
import { formup } from 'svelte-formup'

import BindContextAgent from '@vf-ui/bind-context-agent'

import FieldError from '@vf-ui/form-field-error'

import ListOfferIntent from '@vf-ui/offer-intent-create-form/ListOfferIntent.svelte'
import ListRequestIntent from '@vf-ui/offer-intent-create-form/ListRequestIntent.svelte'

// (validated) primary intent object held after successful child form submission
let primaryIntent

// bindings to child form control submission / validation actions
let validateGiftIntent
let validateRequestIntent

// top-level sub-states of the listing form
const listingTypes = ['gift', 'need', 'offer', 'request']

const { values, errors, dirty, validate, validity } = formup({
  schema: yup.object().shape({
    name: yup.string(),
    note: yup.string(),

    // not VF fields, internal form state only
    listingType: yup.string().oneOf(listingTypes),
  }),
  async onSubmit (data, context) {
    // trigger child form validation
    primaryIntent = null
    switch (data.listingType) {
      case 'gift': await validateGiftIntent(); break
      case 'need': await validateRequestIntent(); break
      default: break
    }
    if (!primaryIntent) {
      return
    }
    console.log('onSubmit', { data, context, primaryIntent })
  },
})
$values.listingType = 'gift'

function updatePrimaryIntent (event) {
  primaryIntent = event.detail
}

// form labels (:TODO: move to i18n layer)
const LISTING_TYPE_LABELS = {
  gift: 'Gift something',
  need: 'Ask for something',
  offer: 'Make an offer',
  request: 'Request an exchange',
}
</script>

<form use:validate>
  <h3>What will you do today?</h3>

  <p use:validity>
    {#each listingTypes as lType}
    <label>
      <input type=radio bind:group={$values.listingType} value={lType} />
      {LISTING_TYPE_LABELS[lType]}
    </label>
    {/each}
    <FieldError at="action" />
  </p>

  <p use:validity>
    <label for="name">Name your listing</label>
    <input id="name" bind:value="{$values.name}" type="text" />
    <FieldError at="name" />
  </p>

  <p use:validity>
    <label for="note">Provide a description</label>
    <textarea id="note" bind:value="{$values.note}" placeholder="be as detailed as you like..." />
    <FieldError at="note" />
  </p>

  <BindContextAgent let:contextAgent>
    {#if $values.listingType === 'gift'}
      <ListOfferIntent {contextAgent} on:validated={updatePrimaryIntent} bind:validate={validateGiftIntent} />
    {:else if $values.listingType === 'need'}
      <ListRequestIntent {contextAgent} on:validated={updatePrimaryIntent} bind:validate={validateRequestIntent} />
    {:else if $values.listingType === 'offer'}
    {:else if $values.listingType === 'request'}
    {:else}
    {/if}
  </BindContextAgent>

  <p>
    <button type="submit">Publish listing</button>
    <button type="reset">Reset</button>
  </p>
</form>

<style>
p, form {
  text-align: left;
}
</style>
