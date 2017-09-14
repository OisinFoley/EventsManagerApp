import Vue from 'vue';
import Router from 'vue-router';
import PrivateEvents from '@/components/privateEvents';
import PublicEvents from '@/components/publicEvents';
import Registration from '@/components/registration';
import Callback from '@/components/callback';
import { requireAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PublicEvents',
      component: PublicEvents,
    },
    {
      path: '/private-events',
      name: 'PrivateEvents',
      beforeEnter: requireAuth,
      component: PrivateEvents,
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
    },
    {
      path: '/callback',
      component: Callback,
    },
  ],
});
