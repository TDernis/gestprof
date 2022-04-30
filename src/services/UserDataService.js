import http from '../modules/http-common'

export default class UserDataService {
  count() {
    return http.get('user/count')
  }

  register(data) {
    return http.post('user/register', data)
  }

  authenticate(data) {
    return http.post('user/authenticate', data)
  }

  check(data) {
    return http.post('user/check', data)
  }

  getAllStudents() {
    return http.get('user/get/students')
  }

  removeStudent(data) {
    return http.post('user/remove', data)
  }

  getUser(data) {
    return http.get('user/getUser/' + data)
  }
}
