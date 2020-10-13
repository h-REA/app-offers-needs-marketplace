/**
 * Yup form validation schemas for different parts of marketplace Intent logic
 *
 * @package: ValueFlows offers & needs marketplace
 * @since:   2020-08-12
 */

import * as yup from 'yup'

import { ACTION_IDS_MARKETPLACE } from '@vf-ui/core'

enum IntentFormType { provider, receiver }

const measure = yup.object().shape({
  hasNumericalValue: yup.number(),
  hasUnit: yup.string(),
}).default(undefined)

// const location = yup.object().shape({
//   name: yup.string().required(),
//   note: yup.string(),
//   mappableAddress: yup.string(),
//   lat: yup.number(),
//   lng: yup.number(),
//   alt: yup.number(),
// })

export const buildFormSpec = (ft: IntentFormType) => yup.object().shape({
  [ft]: yup.string().required(),
  action: yup.string().oneOf(ACTION_IDS_MARKETPLACE).required(),
  name: yup.string(),
  note: yup.string(),
  // image: yup.string(),
  // resourceClassifiedAs: yup.array().of(yup.string()).ensure(),
  resourceConformsTo: yup.string(),
  // resourceInventoriedAs: yup.string(),
  resourceQuantity: measure.clone(),
  // effortQuantity: measure.clone(),
  // availableQuantity: measure.clone(),
  hasBeginning: yup.date().when('dateMode', {
    is: 'range',
    then: yup.date().required(),
    otherwise: yup.date(),
  }),
  hasEnd: yup.date().when('dateMode', {
    is: 'range',
    then: yup.date().required(),
    otherwise: yup.date(),
  }),
  hasPointInTime: yup.date().when('dateMode', {
    is: 'single',
    then: yup.date().required(),
    otherwise: yup.date(),
  }),
  due: yup.date(),
  // atLocation: location.clone(),
  // agreedIn: yup.string(),

  // not part of VF spec- internal form state
  dateMode: yup.string().oneOf(['none', 'single', 'before', 'range', 'after']),
})

export const buildSubmitHandler = (ft: IntentFormType, dispatch: Function) =>
  (data, context) => {
    const derivedIntent = Object.assign({
      [ft]: data[ft],
      action: data.action,
      resourceQuantity: data.resourceQuantity,
    },
    (data.dateMode === 'single' ? {
      hasPointInTime: data.hasPointInTime,
    } : {}),
    (data.dateMode === 'range' ? {
      hasBeginning: data.hasBeginning,
      hasEnd: data.hasEnd,
    } : {}))

    dispatch('validated', derivedIntent)
  }
