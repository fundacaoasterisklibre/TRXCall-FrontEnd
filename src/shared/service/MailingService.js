import _BaseService from './_BaseService'

export default class MailingService extends _BaseService {
  constructor (_resource) {
    super(_resource, 'mailing')
  }

  sendUploadData (_model) {
    return this._resource
      .save({
        action: 'upload.create',
        'XDEBUG_SESSION_START': 12654
      }, _model)
      .then((res) => res.body)
  }
}
