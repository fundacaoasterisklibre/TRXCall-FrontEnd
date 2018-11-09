import _BaseService from './_BaseService'

export default class IncomingService extends _BaseService {
  constructor (_resource) {
    super(_resource, 'incoming')
  }
}
