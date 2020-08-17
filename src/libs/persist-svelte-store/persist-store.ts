/**
 * Svelte store persistence helper
 *
 * Mainly for use with svelte-formup `values` stores.
 *
 * @package: ValueFlows UI
 * @since:   2020-08-17
 */

import debounce from 'debounce'

type MaybeState = string | null

export default function (persistState, values) {
  if (!window.localStorage) {
    return values
  }

  // load initial state from localStorage on load
  let tryState: MaybeState = null
  try {
    tryState = JSON.parse(localStorage.getItem(`${persistState}-values`) || '') || null
  } catch (e) {
    // assume a failure in JSON parsing due to blank value
  }
  if (tryState) {
    values.set(tryState)
  }
  values.subscribe(debounce($vals => {
    localStorage.setItem(`${persistState}-values`, JSON.stringify($vals))
  }, 300))

  return values
}
