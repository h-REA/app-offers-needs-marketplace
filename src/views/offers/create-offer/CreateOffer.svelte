<script>
import * as yup from 'yup'
import { formup } from 'svelte-formup'

import BindContextAgent from '@vf-ui/bind-context-agent'

import FieldError from '@vf-ui/form-field-error'

import ListGiftIntent from '@vf-ui/offer-intent-create-form/ListGiftIntent.svelte'

// (validated) primary intent object held after successful child form submission
let primaryIntent

// bindings to child form control submission / validation actions
let validateGiftIntent

const { values, errors, dirty, validate, validity } = formup({
  schema: yup.object().shape({
    name: yup.string(),
    note: yup.string(),
  }),
  async onSubmit (data, context) {
    // trigger child form validation
    primaryIntent = null
    await validateGiftIntent()
    if (!primaryIntent) {
      return
    }
    console.log('onSubmit', { data, context, primaryIntent })
  },
})

function updatePrimaryIntent (event) {
  primaryIntent = event.detail
}
</script>

<form use:validate>
  <p use:validity>
    <label for="name">Name your offer</label>
    <input id="name" bind:value="{$values.name}" type="text" />
    <FieldError at="name" />
  </p>

  <p use:validity>
    <label for="note">Notes</label>
    <textarea id="note" bind:value="{$values.note}" />
    <FieldError at="note" />
  </p>

  <BindContextAgent let:contextAgent>
    <ListGiftIntent {contextAgent} on:validated={updatePrimaryIntent} bind:validate={validateGiftIntent} />
  </BindContextAgent>

  <!-- <label><input type="checkbox" on:click={onToggleRequestFields} /> Request an exchange -->

  <!-- {#if requestVisible}
  <section>
    <header>Request details</header>
      <IntentCreateForm reciprocal={true} />
  </section>
  {/if} -->

  <p>
    <button type="submit">Publish offer</button>
    <button type="reset">reset</button>
  </p>
</form>
