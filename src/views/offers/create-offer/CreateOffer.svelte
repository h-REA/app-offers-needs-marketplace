<script>
import * as yup from 'yup'
import { formup } from 'svelte-formup'

import BindContextAgent from '@vf-ui/bind-context-agent'

import FieldError from '@vf-ui/form-field-error'

import ListOfferIntent from '@vf-ui/offer-intent-create-form/ListOfferIntent.svelte'
import ListRequestIntent from '@vf-ui/offer-intent-create-form/ListRequestIntent.svelte'

// (validated) primary intent object held after successful child form submission
let primaryIntent
// (validated) reciprocal intent object, for listings which expect an exchange
let reciprocalIntent

// bindings to child form control submission / validation actions
let validateOfferIntent
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
      case 'gift': await validateOfferIntent(); break
      case 'need': await validateRequestIntent(); break
      case 'offer':
      case 'request':
        await validateOfferIntent()
        await validateRequestIntent()
        // ensure there is at least 1 valid reciprocal intent
        if (!reciprocalIntent) {
          return
        }
        break
      default: break
    }
    // all actions must ensure the presence of a primary intent
    if (!primaryIntent) {
      return
    }
    console.log('onSubmit', { data, context, primaryIntent, reciprocalIntent })
  },
})
$values.listingType = 'gift'

function updatePrimaryIntent (event) {
  primaryIntent = event.detail
}

function updateReciprocalIntent (event) {
  reciprocalIntent = event.detail
}

const setOfferIntentValidation = (ctx) => (validateOfferIntent = ctx.detail.submit)
const setRequestIntentValidation = (ctx) => (validateRequestIntent = ctx.detail.submit)

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

  <hr />

  <BindContextAgent let:contextAgent>
    {#if $values.listingType === 'gift'}
      <ListOfferIntent {contextAgent} on:validated={updatePrimaryIntent} on:initForm={setOfferIntentValidation} />
    {:else if $values.listingType === 'need'}
      <ListRequestIntent {contextAgent} on:validated={updatePrimaryIntent} on:initForm={setRequestIntentValidation} />
    {:else if $values.listingType === 'offer'}
      <ListOfferIntent {contextAgent} on:validated={updatePrimaryIntent} on:initForm={setOfferIntentValidation} />
      <hr />
      <ListRequestIntent {contextAgent} on:validated={updateReciprocalIntent} on:initForm={setRequestIntentValidation}
        formTitle="What do you want in return?"
        ACTION_FORM_LABELS={{
          transfer: 'Sell or trade for something else',
          'transfer-custody': 'Borrow something in return',
          work: 'Help doing some work',
          'deliver-service': 'Delivery of a special service',
        }}
        />
    {:else if $values.listingType === 'request'}
      <ListRequestIntent {contextAgent} on:validated={updatePrimaryIntent} on:initForm={setRequestIntentValidation} />
      <hr />
      <ListOfferIntent {contextAgent} on:validated={updateReciprocalIntent} on:initForm={setOfferIntentValidation}
        formTitle="What are you offering in return?"
        ACTION_FORM_LABELS={{
          transfer: 'Payment or trade',
          'transfer-custody': 'Loan of equipment',
          work: 'Help doing some work',
          'deliver-service': 'Special services',
        }}
        />
    {:else}
      <!-- Invalid listingType: this should never happen! -->
    {/if}
  </BindContextAgent>

  <hr />

  <p>
    <button type="submit">Publish listing</button>
    <button type="reset">Reset</button>
  </p>
</form>

<style>
p, form {
  text-align: left;
}
hr {
  border: 0;
  border-top: 1px solid #DDD;
}
</style>
