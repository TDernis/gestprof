<template>
  <v-col>
    <v-row>
      <v-btn
          depressed
          color="primary"
          @click="openDialog"
      >
        Ajouter un étudiant
      </v-btn>
    </v-row>
    <v-row class="mt-8 justify-center">
      <v-flex xs12>
        <v-data-table
            class="fill-width"
            :loading="loading"
            :headers="headers"
            :items="students"
        >
          <template
              slot="item"
              slot-scope="{ index, item }"
          >
            <tr :key="index">
              <td>
                {{ item.firstname }}
              </td>
              <td>
                {{ item.lastname }}
              </td>
              <td>
                {{ item.username }}
              </td>
              <td>
                <v-btn
                    depressed
                    color="red"
                    class="white--text"
                    @click="removeStudent(item)"
                >
                  Supprimer
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-row>
    <v-dialog
        v-model="showDialog"
        max-width="650"
    >
      <v-card>
        <v-card-title>
          Ajouter un étudiant
        </v-card-title>
        <v-card-text>
          Ajoutez un étudiant et créez-lui un accès
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
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
              text
              @click="closeDialog"
          >
            Annuler
          </v-btn>
          <v-btn
              depressed
              :disabled="!isFormValid || loading"
              :loading="loading"
              color="primary"
              @click="addStudent"
          >
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import UserDataService from "@/services/UserDataService";

export default {
  name: "StudentManagementPage",

  data() {
    return {
      headers: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'firstname',
        },
        { text: 'Prenom', value: 'lastname' },
        { text: 'Nom d\'utilisateur', value: 'username' },
        { text: 'Actions', value: 'actions' }
      ],
      students: [],
      loading: false,
      input: {
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      },
      showDialog: false,
      rules: {
        required: value => !!value || 'Ce champ est requis.'
      },
      userService: null
    }
  },

  computed: {
    isFormValid() {
      return !!this.input.firstname &&
          !!this.input.lastname &&
          !!this.input.username &&
          !!this.input.password &&
          this.input.firstname.length > 0 &&
          this.input.lastname.length > 0 &&
          this.input.username.length > 0 &&
          this.input.password.length > 0
    }
  },

  async mounted () {
    this.userService = new UserDataService()
    await this.refreshStudents()
  },

  methods: {
    closeDialog() {
      this.showDialog = false
    },

    async addStudent() {
      this.loading = true
      await this.userService.register({
        firstname: this.input.firstname,
        lastname: this.input.lastname,
        username: this.input.username,
        password: this.input.password,
        user_type: 'student'
      })
      await this.refreshStudents()
      this.loading = false
      this.showDialog = false
    },

    async refreshStudents() {
      this.loading = true
      const result = await this.userService.getAllStudents()
      this.students = result.data
      this.loading = false
    },

    openDialog() {
      this.showDialog = true
    },

    async removeStudent(student) {
      this.loading = true
      await this.userService.removeStudent({ id: student.id })
      await this.refreshStudents()
      this.loading = false
    }

  }
}
</script>

<style scoped>

</style>
