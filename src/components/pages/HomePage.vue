<template>
  <v-col>
    <v-row>
      <span class="text-h6">
        Résultats
      </span>
      <v-flex xs12>
        <v-data-table
            class="fill-width"
            :headers="markHeaders"
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
                {{ getMark(item) }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-row>
  </v-col>
</template>

<script>
import MarkDataService from "@/services/MarkDataService";
import ExamDataService from "@/services/ExamDataService";
import UserDataService from "@/services/UserDataService";

export default {
  name: "HomePage",

  data () {
    return {
      markHeaders: [
        {
          text: 'Nom de l\'examen',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Note', value: 'note' }
      ],
      markService: null,
      examService: null,
      studentService: null,
      exams: [],
      marks: [],
      userId: null
    }
  },

  async mounted () {
    this.markService = new MarkDataService()
    this.examService = new ExamDataService()
    this.studentService = new UserDataService()

    this.userId = window.localStorage.getItem('userid')

    const examsResult = await this.examService.getAllExams()
    this.exams = examsResult.data

    const marksResult = await this.markService.get(this.userId)
    this.marks = marksResult.data

  },

  methods: {
    getMark(exam) {
      return this.marks.filter(mark => mark.exam_id === exam.id)[0].mark
    }
  }
}
</script>

<style scoped>

</style>
