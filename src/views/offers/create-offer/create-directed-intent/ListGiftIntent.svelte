<script>
  import { createEventDispatcher } from 'svelte'
  import { formup } from 'svelte-formup'
  import * as yup from 'yup'

  import { ACTION_IDS_MARKETPLACE } from '@vf-ui/core'

  import FieldError from '@vf-ui/form-field-error'

  // props
  export let contextAgent

  // internal form state
  let selectedAction

  // form labels (:TODO: put into i18n framework)
  const ACTION_FORM_LABELS = {
    work: 'Do some work',
    'deliver-service': 'Provide a service',
    transfer: 'Gift something',
    'transfer-custody': 'Lend something',
  }

  // init logic
  const dispatch = createEventDispatcher()

  const measure = yup.object().shape({
    hasNumericalValue: yup.number(),
    hasUnit: yup.string(),
  })

  const location = yup.object().shape({
    name: yup.string().required(),
    note: yup.string(),
    mappableAddress: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
    alt: yup.number(),
  })

  const makeIntentSpec = (requestMode = false) => yup.object().shape({
    name: yup.string(),
    note: yup.string(),
    image: yup.string(),
    action: yup.string().oneOf(ACTION_IDS_MARKETPLACE).required(),
    // provider: requestMode ? yup.string() : yup.string().required(),
    // receiver: requestMode ? yup.string().required() : yup.string(),
    resourceClassifiedAs: yup.array().of(yup.string()).ensure(),
    resourceConformsTo: yup.string(),
    resourceInventoriedAs: yup.string(),
    resourceQuantity: measure.clone(),
    effortQuantity: measure.clone(),
    availableQuantity: measure.clone(),
    hasBeginning: yup.date(),
    hasEnd: yup.date(),
    hasPointInTime: yup.date(),
    due: yup.date(),
    atLocation: location.clone(),
    agreedIn: yup.string(),
    finished: yup.boolean(),
  })

  const { values, errors, dirty, validate, validity } = formup({
    schema: makeIntentSpec(),
    onSubmit (data, context) {
      dispatch('submit', { data, context })
    },
  })

  // reactive handlers to publish local state to parent components
  $: {
    if (selectedAction) {
      onChange()
    }
  }

  // event propagation for update
  function onChange () {
    const derivedIntent = {
      provider: contextAgent,
      action: selectedAction,
    }
    dispatch('change', derivedIntent)
  }
</script>

<form use:validate>
  <h3>What are you offering?</h3>

  <p use:validity>
    {#each ACTION_IDS_MARKETPLACE as action}
    <label>
      <input type=radio bind:group={selectedAction} value={action} />
      {ACTION_FORM_LABELS[action]}
    </label>
    {/each}
    <FieldError at="action" />
  </p>

  <h3>When is it available?</h3>

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

  <!-- :TODO: image input -->
</form>
