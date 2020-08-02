<script>
import Datepicker from 'praecox-datepicker'
import ClickOutside from 'svelte-click-outside'
import { format } from 'fecha'

export let selectRange = false
export let placeholder = 'Select a date...'
export let dateFormat = 'MMM Do, YYYY'

let result
let showDatePicker = false
let pickerDone = false

// :TODO: make this smarter when start/end periods match (eg. remove year on second value if same year as start)
function getDisplayResult () {
  if (!result || (Array.isArray(result) && !result.length)) {
    return ''
  }
  if (selectRange) {
    if (result[0].start === result[1].end) {
      return format(new Date(result[0].start), dateFormat)
    } else {
      return format(new Date(result[0].start), dateFormat) + ' - ' + format(new Date(result[1].end), dateFormat)
    }
  } else {
    return format(new Date(result), dateFormat)
  }
}

function togglePicker () {
  showDatePicker = !showDatePicker
}

function closePicker () {
  showDatePicker = false
}

// keep input updated with currently selected value(s)
$: formattedResult = result ? getDisplayResult() : ''

// trigger hide of picker when done button is clicked
$: {
  if (pickerDone) {
    pickerDone = false
    showDatePicker = false
  }
}
</script>

<div class="datepicker-wrap">
  <ClickOutside on:clickoutside={closePicker}>
    <input type="text" readonly {placeholder} on:click={togglePicker} bind:value={formattedResult} />
    {#if showDatePicker}
      <div class="picker-overlay">
        <Datepicker
          nowDate={new Date()}
          pickerRule={selectRange ? 'rangeChoice' : 'singleChoice'}
          bind:pickerResult={result}
          bind:pickerDone />
      </div>
    {/if}
  </ClickOutside>
</div>

<style>
  .datepicker-wrap {
    display: inline-block;
    position: relative;
    overflow: visible;
    height: 2em;
  }
  .picker-overlay {
    position: absolute;
    top: 2em;
  }
</style>
