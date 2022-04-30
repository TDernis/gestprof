<template>
  <v-app-bar
      v-if="isLoggedIn"
      color="white"
      elevation="0"
      class="mb-4"
  >
    <v-app-bar-title>
      GestProfs
    </v-app-bar-title>
    <v-btn
        text
        class="ml-4"
        @click="$router.push('/home')"
    >
      Accueil
    </v-btn>
    <v-btn
        v-if="user.user_type === 'admin'"
        text
        class="ml-1"
        @click="$router.push('/manage/students')"
    >
      Gestion etudiants
    </v-btn>
    <v-btn
        v-if="user.user_type === 'admin'"
        text
        class="ml-1"
        @click="$router.push('/manage/exams')"
    >
      Gestion examens
    </v-btn>
    <v-spacer />
    <v-btn
      depressed
      color="red"
      class="white--text"
      @click="logOff"
    >
      Se déconnecter
    </v-btn>
  </v-app-bar>
</template>

<script>
import UserDataService from "@/services/UserDataService";

export default {
  name: "AppBar",

  data () {
    return {
      userService: null,
      isLoggedIn: false,
      user: null
    }
  },

  async mounted () {
    this.userService = new UserDataService()
    const user_id = window.localStorage.getItem('userid')
    const token = window.localStorage.getItem('token')
    if(!user_id || !token)
      await this.$router.push('/login')
    const result = await this.userService.check({user_id, token})

    if(!result.data)
      await this.$router.push('/login')

    const userResult = await this.userService.getUser(user_id)
    this.user = userResult.data

    this.isLoggedIn = true
  },

  methods: {
    async logOff() {
      window.localStorage.clear()
      this.isLoggedIn = false
      await this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
