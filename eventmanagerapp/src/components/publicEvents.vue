<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Daily Events</h3>
    <hr/>

    <div class="col-sm-4" v-for="event in publicEvents">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ event.title }} </h3>
        </div>
        <div class="panel-body">
          <p><span class="badge alert-info"> Begins:: </span> {{ event.startdate }} </p>
          <p><span class="badge alert-danger"> Location: </span><strong> {{ event.location }} </strong></p>
        </div>
      </div>
      <hr>
    </div>

    <div class="col-sm-12">
      <div class="jumbotron text-center" v-if="isLoggedIn()">
        <h2>View Private Events</h2>
        <router-link class="btn btn-lg btn-success" to="/private-events">Private Events </router-link>
      </div>
      <div class="jumbotron text-center" v-else>
        <h2>Gain Access to Private Events by Logging In</h2>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import { isLoggedIn } from '../../utils/auth';
import { getPublicEvents } from '../../utils/events-api';

export default {
  name: 'publicEvents',
  components: {
    AppNav,
  },
  data() {
    return {
      publicEvents: '',
    };
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    getPublicEvents() {
      getPublicEvents().then((battles) => {
        this.publicEvents = battles;
      });
    },
  },
  mounted() {
    this.getPublicEvents();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
