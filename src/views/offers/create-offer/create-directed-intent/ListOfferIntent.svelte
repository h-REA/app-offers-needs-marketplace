<script>
import ListIntentForm from './ListDirectedIntent.svelte'
</script>

<ListIntentForm
  contextAgentType="provider"
  formTitle="What are you offering?"
  temporalFormTitle="When is it available?"
  ACTION_FORM_LABELS={{
    transfer: 'Give something',
    'transfer-custody': 'Lend something',
    work: 'Do some work',
    'deliver-service': 'Provide a specialised service',
  }}
  {...$$props}
  />
