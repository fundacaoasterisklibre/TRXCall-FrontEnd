import Vue from 'vue'

export default class RepoService {
  constructor () {
    Object.assign(this, Vue.$resource)
    Object.freeze(this)
  }

  find (_id) {
    return this._resource
      .get({_id})
      .then(res => res.json())
  }

  findAll () {
    return this._resource
      .query()
      .then((res) => res.json(), () => {
        throw new Error('Não foi possível obter as fotos')
      })
  }

  create (_model) {
    return this._resource
      .save(_model)
  }

  update (id, _model) {
    return this._resource
      .update({id: id}, _model)
  }

  remove (_id) {
    return this._resource
      .delete({_id})
      .then(null, () => {
        throw new Error('Não foi possível remover a foto')
      })
  }
}
