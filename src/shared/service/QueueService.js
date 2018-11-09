import _BaseService from './_BaseService'

export default class QueueService extends _BaseService {
  constructor (_resource) {
    super(_resource, 'queue')
  }
}
