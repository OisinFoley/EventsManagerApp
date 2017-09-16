<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> The List of Upcoming Events</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleGoogleLogin()">Login with Google</button>
        <router-link class="btn btn-warning log" to="/login" v-show="!isLoggedIn()">Login Standard </router-link>
        <router-link class="btn btn-success log" to="/registration" v-show="!isLoggedIn()">Registration </router-link>
      </li>
    </ul>
  </nav>

</template>

<script>
import { isLoggedIn, loginWithGoogle, logout } from '../../utils/auth';

export default {
  name: 'app-nav',
  methods: {
    handleGoogleLogin() {
      loginWithGoogle();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>
