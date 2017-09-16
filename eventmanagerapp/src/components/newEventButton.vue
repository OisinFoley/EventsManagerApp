<template>
<div>
  <router-link class="btn btn-warning col-xs-1 col-sm-1 col-md-1 col-lg-offset-5 col-lg-2" v-if="isLoggedIn()" to="/newEvent"><b>+ New Event</b>
  </router-link>
</div>
</template>

<script>
import { isLoggedIn } from '../../utils/auth';

export default {
  name: 'new-event',
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>
