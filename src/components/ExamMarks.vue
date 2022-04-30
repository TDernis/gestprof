<template>
  <v-card>
    <v-card-title>Noter les élèves sur "{{ exam.name }}"</v-card-title>
    <v-card-text>
      <v-data-table
          class="fill-width"
          :loading="loading"
          :headers="markHeaders"
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
              {{ getMark(item) }}
            </td>
            <td>
              <v-btn
                  depressed
                  color="green"
                  class="white--text"
                  @click="openEditDialog(item)"
              >
                Editer
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
          text
          @click="closeDialog"
      >
        Fermer
      </v-btn>
    </v-card-actions>
    <v-dialog
        v-model="showEditDialog"
        v-if="showEditDialog"
        max-width="650">
      <v-card>
        <v-card-title>
          Noter "{{ selectedStudent.firstname + ' ' + selectedStudent.lastname }}"
        </v-card-title>
        <v-card-text>
          <v-text-field
              v-model="note"
              label="note"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
              depressed
              color="primary"
              @click="closeEditDialog"
          >
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import MarkDataService from "@/services/MarkDataService";
import UserDataService from "@/services/UserDataService";
import ExamDataService from "@/services/ExamDataService";

export default {
  name: "ExamMarks",

  props: {
    exam: {
      required: true,
      default: () => {}
    }
  },

  data () {
    return {
      markHeaders: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'firstname',
        },
        { text: 'Prénom', value: 'lastname' },
        { text: 'Note', value: 'note' },
        { text: 'Actions', value: 'actions' }
      ],
      markService: null,
      examService: null,
      studentService: null,
      students: [],
      marks: [],
      note: '',
      loading: false,
      selectedStudent: null,
      showEditDialog: false
    }
  },

  computed: {

  },

  async mounted() {
    this.markService = new MarkDataService()
    this.examService = new ExamDataService()
    this.studentService = new UserDataService()

    const studentsResult = await this.studentService.getAllStudents()
    this.students = studentsResult.data

    await this.refreshMarks()

  },

  methods: {
    closeDialog() {
      this.$emit('close')
    },

    getMark(student) {
      const marks = this.marks.filter(mark => mark.user_id === student.id).map(mark => mark.mark)
      if(marks.length === 0) {
        return '-'
      }
      return marks[0]
    },

    async refreshMarks () {
      const marksResult = await this.examService.getMarks(this.exam.id)
      this.marks = marksResult.data
    },

    openEditDialog(student) {
      this.selectedStudent = student
      this.showEditDialog = true
    },

    async closeEditDialog() {
      await this.markService.create({
        exam_id: this.exam.id,
        user_id: this.selectedStudent.id,
        mark: this.note
      })
      await this.refreshMarks()
      this.showEditDialog = false
    }
  }
}
</script>

<style scoped>

</style>
