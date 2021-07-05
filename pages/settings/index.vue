<!--
 * @Author: XunL
 * @Date: 2021-06-23 02:30:27
 * @LastEditTime: 2021-07-06 02:01:14
 * @Description: file content
-->
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="info.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="info.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="info.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="info.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="info.password"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.prevent="submit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updateUser } from "@/api/user";
const jsCookie = require("js-cookie");

export default {
  middleware: "authenticated",
  data() {
    return {
      info: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.info = Object.assign({}, this.user);
  },
  methods: {
    async submit() {
      const { data } = await updateUser(this.info);
      this.$store.commit("setUser", data.user);
      jsCookie && jsCookie.set("user", data.user);
      this.$router.push("/");
    },
    async logout() {
      jsCookie.set("user", "");
      this.$store.commit("setUser", "");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
