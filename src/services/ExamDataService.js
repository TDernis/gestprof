import http from '../modules/http-common'

export default class ExamDataService {
  getAllExams() {
    return http.get('exam/get')
  }

  addExam(data) {
    return http.post('exam/create', data)
  }

  removeExam(data) {
    return http.post('exam/remove', data)
  }

  getMarks(data) {
    return http.get('exam/getmarks/' + data)
  }
}
