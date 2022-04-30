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
            Avant de commencer, veuillez créer un compte
          </v-card-text>
          <v-card-text>
            <v-text-field
                v-model="input.firstname"
                :rules="[rules.required]"
                label="Nom"
            />
            <v-text-field
                v-model="input.lastname"
                :rules="[rules.required]"
                label="Prenom"
            />
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
                @click="register"
            >
              Valider
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
  name: "SetupPage",

  data () {
    return {
      userService: null,
      input: {
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      },
      rules: {
        required: value => !!value || 'Ce champ est requis.'
      },
    }
  },

  mounted () {
    this.userService = new UserDataService()
  },

  methods: {
    async register () {
      try {
        await this.userService.register({
          firstname: this.input.firstname,
          lastname: this.input.lastname,
          username: this.input.username,
          password: this.input.password,
          user_type: 'admin'
        })
        let response = await this.userService.authenticate( {
          username: this.input.username,
          password: this.input.password
        })
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('userid', response.data.id)
        await this.$router.push('/home')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>

</style>
