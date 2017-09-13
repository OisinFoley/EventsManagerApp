<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Secret Events</h3>
    <hr/>

    <div class="col-sm-4" v-for="event in privateEvents">
      <div class="panel panel-danger">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ event.title }} </h3>
        </div>
        <div class="panel-body">
          <p><span class="badge alert-info"> Begins: </span> {{ event.startdate }} </p>
          <p><span class="badge alert-danger"> Location: </span><strong> {{ event.location }} </strong></p>
        </div>
      </div>
    </div>

    <div class="col-sm-12">
      <div class="jumbotron text-center">
        <h2>View Public Events</h2>
        <router-link class="btn btn-lg btn-success" to="/"> Public Events </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import { isLoggedIn } from '../../utils/auth';
import { getPrivateEvents } from '../../utils/events-api';

export default {
  name: 'privateEvents',
  components: {
    AppNav,
  },
  data() {
    return {
      privateEvents: '',
    };
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    getPrivateEvents() {
      getPrivateEvents().then((battles) => {
        this.privateEvents = battles;
      });
    },
  },
  mounted() {
    this.getPrivateEvents();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
