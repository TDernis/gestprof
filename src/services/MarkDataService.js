import http from '../modules/http-common'

export default class MarkDataService {
  create(data) {
    return http.post('/mark/create', data)
  }

  remove(data) {
    return http.post('/mark/remove', data)
  }

  get(data) {
    return http.get('/mark/get/' + data)
  }
}
