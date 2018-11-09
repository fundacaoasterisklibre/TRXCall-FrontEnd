class _BaseService {
  constructor (_resource, _name) {
    this._resource = _resource(_name + '.{action}')
  }

  list (filter) {
    return this._resource
      .query({
        action: 'list',
        ...filter
      })
      .then((res) => res.body)
  }

  info (id) {
    return this._resource
      .get({
        action: 'info',
        id: id
      })
      .then((res) => res.body)
  }

  create (object) {
    return this._resource
      .save({
        action: 'create',
        'XDEBUG_SESSION_START': 12654
      }, object)
      .then(
        (res) => {
          return res.body
        }
      )
  }

  update (object) {
    return this._resource
      .update({
        action: 'update',
        id: object.id,
        'XDEBUG_SESSION_START': 12654
      }, object)
      .then((res) => res.body)
  }

  delete (id) {
    return this._resource
      .delete({
        action: 'delete',
        'id': id
      }, {})
      .then((res) => res.body)
  }

  resources () {
    return this._resource
      .query({
        action: 'resources'
      })
      .then((res) => res.body)
  }
}

export default _BaseService
