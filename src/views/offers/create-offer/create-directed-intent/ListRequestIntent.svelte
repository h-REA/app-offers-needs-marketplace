<script>
import ListIntentForm from './ListDirectedIntent.svelte'
</script>

<ListIntentForm {...$$props}
  contextAgentType="receiver"
  formTitle="I want to..."
  ACTION_FORM_LABELS={{
    transfer: 'Ask for something I need',
    'transfer-custody': 'Borrow something',
    work: 'Get help doing a task',
    'deliver-service': 'Request a specialised service',
  }}
  />
