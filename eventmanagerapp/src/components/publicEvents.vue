<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Daily Events</h3>
      <new-event-button></new-event-button>
      <row/>
    <hr/>
    <hr/>

    <div class="col-sm-3" v-for="(event, index) in publicEvents">

      <div class="panel panel-default">


          <router-link  to="/editEvent">
            <button :disabled="!isLoggedIn()" id="dac76271-96fd-439f-b1df-56d71fad9641" class="btn btn-info col-lg-2">
              <img class="img-responsive" src="http://www.freeiconspng.com/uploads/edit-pen-write-icon--2.png"></img>
            </button>
          </router-link>
          <div class="panel-heading">
            <h3 class="panel-title"> {{ event.title }}</h3>
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
import NewEventButton from './newEventButton';
import { isLoggedIn } from '../../utils/auth';
import { getPublicEvents } from '../../utils/events-api';
import row from './row';

export default {
  name: 'publicEvents',
  components: {
    AppNav,
    NewEventButton,
    row,
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
      getPublicEvents().then((events) => {
        console.log(JSON.stringify(events));
        this.publicEvents = events;
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
