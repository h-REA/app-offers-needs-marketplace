/**
 * App routing configuration
 *
 * @package  Holo-REA offers & needs marketplace UI
 * @since:   2020-07-14
 */

import Timeline from "./timeline/Timeline.svelte"
import Offers from "./offers/Offers.svelte"
import CreateOffer from "./offers/create-offer/CreateOffer.svelte"

export default {
  basePath: "",
  routes: {
    "/": {
      component: Timeline,
    },
    "/offers": {
      component: Offers,
      children: {
        "/new" : {
          component: CreateOffer
        },
      }
    },
  },
}
