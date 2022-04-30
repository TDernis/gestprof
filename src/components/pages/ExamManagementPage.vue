<template>
  <v-col>
    <v-row>
      <v-btn
          depressed
          color="primary"
          @click="openDialog"
      >
        Ajouter un examen
      </v-btn>
    </v-row>
    <v-row class="mt-8 justify-center">
      <v-flex xs12>
        <v-data-table
            class="fill-width"
            :loading="loading"
            :headers="examHeaders"
            :items="exams"
        >
          <template
              slot="item"
              slot-scope="{ index, item }"
          >
            <tr :key="index">
              <td>
                {{ item.name }}
              </td>
              <td>
                <v-btn
                    depressed
                    color="red"
                    class="white--text"
                    @click="removeExam(item)"
                >
                  Supprimer
                </v-btn>
                <v-btn
                    depressed
                    color="primary"
                    @click="openMarksDialog(item)">
                  Noter
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
          Ajouter un examen
        </v-card-title>
        <v-card-text>
          Ajoutez un examen pour attribuer des notes
        </v-card-text>
        <v-card-text>
          <v-text-field
              v-model="input.name"
              :rules="[rules.required]"
              label="Nom de l'examen"
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
              @click="addExam"
          >
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="showMarksDialog"
        max-width="650"
    >
      <exam-marks
          v-if="showMarksDialog"
          :exam="selectedExam"
          @close="closeMarksDialog"
      />
    </v-dialog>
  </v-col>
</template>

<script>
import ExamDataService from "@/services/ExamDataService";
import ExamMarks from "@/components/ExamMarks";

export default {
  name: "ExamManagementPage",
  components: {ExamMarks},
  computed: {
    isFormValid () {
      return !!this.input.name && this.input.name.length > 0
    }
  },

  data () {
    return {
      examHeaders: [
        {
          text: 'Nom de l\'examen',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Actions', value: 'actions' }
      ],
      exams: [],
      loading: false,
      input: {
        name: ''
      },
      showDialog: false,
      rules: {
        required: value => !!value || 'Ce champ est requis.'
      },
      examService: null,
      selectedExam: null,
      showMarksDialog: false
    }
  },

  async mounted() {
    this.examService = new ExamDataService()
    await this.refreshExams()
  },

  methods: {
    async refreshExams() {
      this.loading = true
      const result = await this.examService.getAllExams()
      this.exams = result.data
      this.loading = false
    },

    async addExam() {
      this.loading = true
      await this.examService.addExam({
        name: this.input.name
      })
      await this.refreshExams()
      this.loading = false
      this.showDialog = false
    },

    closeDialog() {
      this.showDialog = false
    },

    openDialog () {
      this.showDialog = true
    },

    async removeExam(exam) {
      this.loading = true
      await this.examService.removeExam({ exam_id: exam.id })
      await this.refreshExams()
      this.loading = false
    },

    openMarksDialog(exam) {
      this.selectedExam = exam
      this.showMarksDialog = true
    },

    closeMarksDialog() {
      this.showMarksDialog = false
    }
  }
}
</script>

<style scoped>

</style>
