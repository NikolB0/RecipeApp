<template>
  <div class="background">
  <div class="login pt-3">
    <h1 style="font-family: 'Lucida Bright'; margin-top: 10rem; margin-bottom: 1rem;">Login</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <input
                type="email"
                v-model="username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email" 
              /> <!-- placeholder="Phone number, username, or email"-->
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="button" @click="login()" class="btn btn-primary" style="margin:8px;">
              Submit
            </button>
            <!-- YOU DON'T HAVE AN ACCOUNT? SIGN UP -->
            <p class="new-account">
              Don't have an account?
              <a href="/signup"> Sign up </a>
            </p>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { firebase } from '@/firebase';

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      console.log("login..." + this.username);

      firebase
          .auth()
          .signInWithEmailAndPassword(this.username, this.password)
          .then((result) => {
              console.log('Uspješna prijava', result); 
          })
          .catch(function(e) {        // e = error
              console.error('Greška', e);
          });
    },
  },
}
</script>

<style scoped>
.btn {
  text-align: right;
  background-color: rgb(159, 159, 159);
  border-color: grey;
}

.btn:hover {  
  background-color:#dd6824 !important;
  border-color: grey !important;
}
</style>