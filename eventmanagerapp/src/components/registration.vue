<template>
  <div class="container ">

    <form>

    <!-- NAME VALIDATION SETUP -->
    <div>
      <label >Username:</label>
      <input class="form-control" type="text" name="username" placeholder="please enter desired username" v-model="User.username"  required>
      <!-- required displays err popup on submit but we want our own angular behaviour -->
      <!-- only display if the form has been modified and there's a requirement error -->
      <!-- <p ng-show="(!regForm.username.$pristine && regForm.username.$error.required) || (regForm.$submitted && regForm.username.$error.required)" ng-class="{'errorMsg':regForm}">Name required
      </p>-->
      <!-- we will get error message in all scenarios except those pertinent to length if we don't include the $error.minlength etc -->
      <!-- <ul ng-show="(!regForm.username.$pristine && regForm.username.$error.pattern) || (!regForm.username.$pristine && regForm.username.$error.minlength) || (!regForm.username.$pristine && regForm.username.$error.maxlength)" ng-class="{'errorMsg':regForm}">
        <li>Must have a space between first and last name.</li>
        <li>Must not have any special characters.</li>
        <li>Must not contain numbers.</li>
        <li>Must be between 3 and 20 characters long.</li>
      </ul> -->
    </div>
    <br>
    <label >Email:</label>
    <div>
      <input class="form-control" type="text" name="email" placeholder="please enter an email" v-model="User.email" required>
    </div>
    <br>
    <label >Fullname:</label>
    <div>
      <input class="form-control" type="text" name="fullname" placeholder="please enter fullname" v-model="User.fullname" required>
    </div>
    <br>
    <label >Password:</label>
    <div>
      <input class="form-control" type="password" name="password" placeholder="please enter a password" v-model="User.password" required>
    </div>

  <router-link to="/users">
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI">Submit</button>

  </router-link>
      <button class="btn btn-large btn-block btn-success full-width">Go User</button>
    </form>

  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      User: { username: '', fullname: '', password: '', email: '' },

    }
  }, methods: {
    addToAPI() {

      let newUser = {
        username: this.User.username,
        email: this.User.email,
        fullname: this.User.fullname,
        password: this.User.password
      }
      console.log(newUser);
      axios.post('http://localhost:3333/api/users', newUser)
        .then((response) => {
          console.log(response.data.message);
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
