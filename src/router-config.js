/**
 * App routing configuration
 *
 * @package  Holo-REA offers & needs marketplace UI
 * @since:   2020-07-14
 */

import Timeline from '@vf-ui/timeline-page'

import Offers from '@vf-ui/offers-page'
import CreateOffer from '@vf-ui/offer-create-form'

export default {
  basePath: '',
  routes: {
    '/': {
      component: Timeline,
    },
    '/offers': {
      component: Offers,
      children: {
        '/new': {
          component: CreateOffer,
        },
      },
    },
  },
}
