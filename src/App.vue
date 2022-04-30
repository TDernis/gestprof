<template>
  <v-app>
    <v-main class="background">
      <v-container>
        <AppBar v-if="refreshBar"/>
        <router-view
          @hasLoggedIn="doRefreshBar"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserDataService from "@/services/UserDataService";
import AppBar from "@/components/AppBar";

export default {
  name: 'App',

  components: {
    AppBar
  },

  data: () => ({
    userCount: 0,
    refreshBar: false
  }),

  async mounted() {
    let userDataService = new UserDataService()
    const userCount = await userDataService.count()
    this.userCount = userCount.data
    if (this.userCount === 0) {
      await this.$router.push('/setup')
    }
    this.doRefreshBar()
  },

  methods: {
    doRefreshBar() {
      this.refreshBar = false
      setTimeout(() => {
        this.refreshBar = true
      }, 1000)
    }
  }
};
</script>
<style lang="scss">
  .background {
    background-color: rgb(235, 235, 235);
  }
</style>
