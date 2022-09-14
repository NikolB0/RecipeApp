<template>
    <div class="signup pt-3">
      <h1>This is a signup page</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">
            <form @submit.prevent="signup">
              <div class="form-group">
                <label form="email"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter e-mail address"
                />
              </div>
              <div class="form-group">
                <label form="password">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  id="Password"
                  placeholder="Password"
                />
                <small id="password" class="form-text text-muted">
                  Your password should be at least 6 characters long.
                </small>
                <div class="form-group">
                  <label form="repeatPassword">Repeat password</label>
                  <input
                    type="password"
                    v-model="passwordRepeat"
                    class="form-control"
                    id="repeatPassword"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
              <button type="button" @click="signup" class="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { firebase } from "@/firebase";
  
  export default {
    name: "signup",
    data() {
      return {
        email: "",
        password: "",
        passwordRepeat: "",
      };
    },
    methods: {
      signup() {
        if ((this.password = this.passwordRepeat)) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(function() {
              console.log("Uspješna registracija");
            })
            .catch(function(error) {
              console.error("Došlo je do pogreške", error);
            });
          console.log("Nastavak");
        } else {
          alert("Lozinke se ne podudaraju!");
        }
      },
    },
  };
  </script>
  