<script>
/**
 * Date input with popup calendar picker & range functionality
 *
 * Usage:
 *   <DateInput bind:value={someValueInParentComponent} />
 *
 * Todo:
 * - backspace key to clear values
 * - time inputs
 * - think of a nicer way to toggle between single date & range mode
 * - probably need to think about ranges in day mode (ie. a day selection encompasses the whole day)
 *
 * @package  ValueFlows UI
 * @since    2020-08-03
 */
import Datepicker from 'praecox-datepicker'
import ClickOutside from 'svelte-click-outside'
import { format } from 'fecha'

export let selectRange = false
export let placeholder = 'Select a date...'
export let dateFormat = 'MMM Do, YYYY'

export let value // public API binding for accessing the input value

let showDatePicker = false
let pickerResult
let pickerDone = false
let formattedResult

function togglePicker () {
  showDatePicker = !showDatePicker
}

function closePicker () {
  showDatePicker = false
}

// coerce values to Date objects
function getDateValue (pickerVal) {
  if (isEmptyValue(pickerVal)) {
    return undefined
  }
  if (selectRange) {
    return [new Date(pickerVal[0].start), new Date(pickerVal[1].end)]
  } else {
    return new Date(pickerVal)
  }
}

// :TODO: make this smarter when start/end periods match (eg. remove year on second value if same year as start)
function getDisplayResult (val) {
  if (isEmptyValue(val)) {
    return ''
  }
  if (selectRange) {
    if (value[0] === value[1]) {
      return format(value[0], dateFormat)
    } else {
      return format(value[0], dateFormat) + ' - ' + format(value[1], dateFormat)
    }
  } else {
    return format(value, dateFormat)
  }
}

$: {
  if (pickerResult) {
    // sync value to Date / Array version of selection
    value = getDateValue(pickerResult)
    // keep input updated with currently selected value(s)
    formattedResult = getDisplayResult(value)
  }
  // trigger hide of picker when done button is clicked
  if (pickerDone) {
    pickerDone = false
    showDatePicker = false
  }
}

// internals
function isEmptyValue (val) {
  return !val || (Array.isArray(val) && !val.length)
}
</script>

<div class="datepicker-wrap">
  <ClickOutside on:clickoutside={closePicker}>
    <input type="text" {placeholder} on:click={togglePicker} bind:value={formattedResult} />
    {#if showDatePicker}
      <div class="picker-overlay">
        <Datepicker
          nowDate={new Date()}
          pickerRule={selectRange ? 'rangeChoice' : 'singleChoice'}
          bind:pickerResult
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
