<template>
  <div>
    <v-app-bar
      hide-on-scroll
      app
      light
      color="white"
      elevate-on-scroll
      height="70"
    >
      <!-- title #00CCCC -->
      <nuxt-link style="text-decoration:none;color:unset;" to="/">
        <h3 class="primary--text">AcumenConnect</h3>
      </nuxt-link>
      <!-- 
        *** 💻 DESKTOP VIEW ITEMS ***
      -->
      <v-spacer></v-spacer>
      <!-- Dark theme button if you need -->
      <v-btn text color="primary">Home</v-btn>
      <v-btn text color="primary">Explore</v-btn>
      <!-- Auth Template -->
      <template v-if="$auth.loggedIn">
        <userMenu />
      </template>
      <v-btn dark color="#00acee" class="glow rounded-lg" to="/login" v-else>
        <v-icon>login</v-icon>&nbsp;Get Started
      </v-btn>
    </v-app-bar>
    <!-- 🔥 MAIN RENDER [ADDED MIN HEIGHT TO PREVENT LARGE LAYOUT SHIFTS] -->
    <v-main style="min-height: 100vh">
      <nuxt />
    </v-main>
    <desktopFooter />
    <navDrawer v-model="drawer" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import navDrawer from "../components/LayoutComponents/navDrawer.vue";
export default {
  name: "desktopView",
  prefetch: false,
  data: () => ({
    drawer: false,
  }),
  components: {
    navDrawer,
    userMenu: () => import("../components/LayoutComponents/userMenu.vue"),
    desktopFooter: () =>
      import("../components/LayoutComponents/footer.vue"),
  }, //components
};
</script>

<style lang="scss">
.glow{
  box-shadow: 0px 10px 20px -10px #00acee !important;
}
</style>