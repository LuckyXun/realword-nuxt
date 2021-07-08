<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(value, key, idx) in errors" :key="idx">
              {{ key + " " + value }}
            </li>
          </ul>

          <form @submit.prevent="submit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                required
                placeholder="Your Name"
                v-if="!isLogin"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                type="email"
                required
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user.js";
const jsCookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "notAuthenticated",
  name: "LoginIndex",
  asyncData() {},
  data() {
    return {
      user: {
        username: "",
        email: "111@11.c",
        password: "11111111",
      },
      errors: {},
    };
  },
  computed: {
    isLogin() {
      return this.$route.path === "/login";
    },
  },
  methods: {
    async submit() {
      try {
       
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        console.log(data);
        this.$store.commit("setUser", data.user);
        jsCookie && jsCookie.set("user", data.user);
        this.$router.push("/");
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>

<style></style>
