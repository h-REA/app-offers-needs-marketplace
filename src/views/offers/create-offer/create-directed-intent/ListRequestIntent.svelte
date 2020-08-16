<script>
import ListIntentForm from './ListDirectedIntent.svelte'
</script>

<ListIntentForm
  contextAgentType="receiver"
  formTitle="I want to..."
  temporalFormTitle="When do you need it?"
  ACTION_FORM_LABELS={{
    transfer: 'Ask for something I need',
    'transfer-custody': 'Borrow something',
    work: 'Get help doing a task',
    'deliver-service': 'Request a specialised service',
  }}
  {...$$props}
  on:validated
  on:initForm
  on:unloadForm
  />
