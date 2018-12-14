import Vue from 'vue'
import Router from 'vue-router'

import Reserver from '@/components/page/Reserver'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Reserver',
      component: Reserver
    }
  ]
})
