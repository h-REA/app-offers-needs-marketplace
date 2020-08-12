<script>
/**
 * Form control for inputting measurements as "unit + value"
 *
 * @package  ValueFlows UI
 * @since    2020-08-02
 */

export let numericalValue = ''
export let unit = ''
export let normalizedValue

/* eslint no-undefined: 0 */
$: normalizedValue = { hasNumericalValue: numericalValue === '' ? undefined : numericalValue, hasUnit: unit === '' ? undefined : unit }
</script>

<div>
  <input type="number" bind:value={numericalValue} />
  <select bind:value={unit}>
    <option value=""></option>
    <option value="kg">kg</option>
    <option value="hrs">hrs</option>
    <!-- :TODO: pull from backend -->
  </select>
</div>
