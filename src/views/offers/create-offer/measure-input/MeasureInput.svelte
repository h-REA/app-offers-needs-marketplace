<script>
/**
 * Form control for inputting measurements as "unit + value"
 *
 * @package  ValueFlows UI
 * @since    2020-08-02
 */

export let numericalValue
export let unit

$: normalizedValue = { numericalValue, unit }
</script>

<div>
  <input type="number" bind:value={numericalValue} />
  <select bind:value={unit}>
    <option value=""></option>
    <option value="kg">kg</option>
    <!-- :TODO: pull from backend -->
  </select>
</div>
