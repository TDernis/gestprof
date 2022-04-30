<template>
  <v-col class="fill-height align-center">
    <v-row class="justify-center">
      <v-flex xs6>
        <v-card
            elevation="0"
            class="pa-6"
        >
          <v-card-title class="text-h5">
            Bienvenue !
          </v-card-title>
          <v-card-text>
            Veuillez vous identifier
          </v-card-text>
          <v-card-text
              v-if="showError"
              class="red--text"
          >
            Le nom d'utilisateur ou le mot de passe est incorrect
          </v-card-text>
          <v-card-text>
            <v-text-field
                v-model="input.username"
                :rules="[rules.required]"
                label="Nom d'utilisateur"
            />
            <v-text-field
                v-model="input.password"
                :rules="[rules.required]"
                label="Mot de passe"
                type="password"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
                depressed
                color="primary"
                @click="login"
            >
              Se connecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>
  </v-col>
</template>

<script>
import UserDataService from "@/services/UserDataService";

export default {
  name: "LoginPage",

  data () {
    return {
      userService: null,
      showError: false,
      input: {
        username: '',
        password: ''
      },
      rules: {
        required: value => !!value || 'Ce champ est requis.'
      },
    }
  },

  mounted() {
    this.userService = new UserDataService()
  },

  methods: {
    async login () {
      let result = {}
      try {
        result = await this.userService.authenticate({
          username: this.input.username,
          password: this.input.password
        })
        window.localStorage.setItem('token', result.data.token)
        window.localStorage.setItem('userid', result.data.id)
        this.$emit('hasLoggedIn')
        await this.$router.push('/home')
      } catch(e) {
        this.showError = true
      }
    }
  }
}
</script>

<style scoped>

</style>
