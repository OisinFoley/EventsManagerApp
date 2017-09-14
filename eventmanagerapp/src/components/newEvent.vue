<template>
  <div class="container ">

<div>
<back-button></back-button>
<div class="row"></div>

</div>
<h2>We're going to add an Event!</h2>
    <form>

      <div>
        <label >Event Title:</label>
        <input class="form-control" type="text" name="title" placeholder="Name of the Event" v-model="Event.title"  required>
      </div>
      <row/>

      <label >Location:</label>
        <div>
          <input class="form-control" type="text" name="location" placeholder="Type a location" v-model="Event.location" required>
        </div>
      <row/>

      <label >Description:</label>
      <div>
        <input class="form-control" type="text" name="description" placeholder="Describe the event" v-model="Event.description" required>
      </div>
      <row/>

      <label >Start Date:</label>
      <div>
        <input class="form-control" type="text" name="startDate" placeholder="Event starts at.." v-model="Event.startDate" required>
      </div>
      <row/>

      <label >End Date:</label>
      <div>
        <input class="form-control" type="text" name="endDate" placeholder="Enter ends at.." v-model="Event.endDate" required>
      </div>
      <row/>

      <router-link to="/addEvent">
          <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addEventAPI">Add Event</button>
      </router-link>
    </form>

  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import backButton from './backButton';
import row from './row';

export default {
  name: 'hello',
  components: {
    backButton,
    row,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      Event: { title: '', location: '', description: '', startDate: '', endDate: '' },
    }
  }, methods: {
    addEventAPI() {

      let newEvent = {
        title: this.Event.title,
        location: this.Event.location,
        description: this.Event.description,
        startDate: this.Event.startDate,
        endDate: this.Event.endDate
      }
      console.log(newEvent);
      axios.post('http://localhost:3333/api/addEvent', newEvent)
        .then((response) => {
          console.log(JSON.stringify(response));
          //console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);

        });

    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  color:darkgreen;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
