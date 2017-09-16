<template>
  <div class="container ">
  <div>
    <back-button></back-button>
    <row></row>
  </div>

    <form>
      <div>
        <label >Username:</label>
        <input class="form-control" type="text" name="username" placeholder="Enter username" v-model="User.username"  required>
      </div>
      <br>
      <!-- <label >Email:</label> -->
      <!--
        <div>
          <input class="form-control" type="text" name="email" placeholder="Enter an email" v-model="User.email" required>
        </div>
      -->
      <br>
      <label >Password:</label>
      <div>
        <input class="form-control" type="password" name="password" placeholder="please enter a password" v-model="User.password" required>
      </div>

      <row/>
      <router-link to="/users">
        <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="loginAPI">Submit Login</button>
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
      User: { username: '', password: '' },
    }
  }, methods: {
    loginAPI() {

      let newUser = {
        username: this.User.username,
        password: this.User.password
      }
      console.log("NewUser value is : %s", JSON.stringify(newUser));
      axios.post('http://localhost:3333/api/login', newUser)
        .then((response) => {
          console.log(JSON.stringify(response));
          localStorage.setItem('token', response.data.token);
          //console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          router.push('/login');
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
