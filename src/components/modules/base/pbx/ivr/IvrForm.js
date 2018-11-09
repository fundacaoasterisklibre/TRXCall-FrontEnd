import IvrService from 'src/shared/service/IvrService'
import IvrDTO from '../../../../../shared/dto/IvrDTO'
import ForwardService from 'src/shared/service/ForwardService'
import ForwardDTO from '../../../../../shared/dto/ForwardDTO'
import IvrOptionsDTO from '../../../../../shared/dto/IvrOptionsDTO'

export default {
  name: 'ivr-form',
  data () {
    return {
      model: new IvrDTO(),
      urlUpload: null,
      audioList: {
        audioWelcome: [],
        audioRead: []
      },
      select: {
        options: {
          options: null,
          goto: null
        },
        userID: null
      },
      resources: {
        users: [],
        forwards: []
      },
      loading: true,
      rules: {
        id: [
          {required: true, message: 'Favor informar o número do ramal', trigger: 'blur'},
          {min: 2, message: 'O tamanho tem que ser maior que 2', trigger: 'blur'}
        ],
        name: [
          {required: true, message: 'Favor informar o nome do ramal', trigger: 'blur'},
        ]
      }
    }
  },
  async created () {
    this.loading = true
    this.model = new IvrDTO()
    this.service = new IvrService(this.$resource)
    let forwardService = new ForwardService(this.$resource)

    if (PROD && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      this.urlUpload = 'http://' + window.location.hostname + ':8081/api/ivr.uploadAudio'
    }
    else {
      this.urlUpload = 'http://192.168.16.250/api/ivr.uploadAudio'
    }

    await this.service.resources()
      .then((data) => {
        // TODO
      })

    await forwardService.list()
      .then((data) => {
        this.resources.forwards = []
        data.forEach((info) => {
          let forwardDTO = new ForwardDTO(info)
          this.resources.forwards.push(forwardDTO)
        })
      })

    if (this.$route.params.id) {
      await this.service.info(this.$route.params.id)
        .then((data) => {
          this.parseForm(data)

          if (data.audioRead) {
            this.audioList.audioRead = [{
              name: data.audioRead,
              property: 'audioRead',
              status: 'finished'
            }]
          }

          if (data.audioWelcome) {
            this.audioList.audioWelcome = [{
              name: data.audioWelcome,
              property: 'audioWelcome',
              status: 'finished'
            }]
          }
        })
    }
    this.loading = false
  },
  methods: {
    handleSubmit () {
      this.$refs['model'].validate((valid) => {
        if (valid) this.save()
        else {
          this.$notify.warning({
            title: 'Falha',
            message: 'Favor verificar os campos em vermelho.'
          })
          return false
        }
      })
    },

    handleAddTable () {
      let selectOption = this.select.options

      for (let i = 0; i < this.model.options.length; i++) {
        let opt = this.model.options[i]
        if (opt.option === selectOption.option) {
          this.$message({
            message: 'Esta máscara já foi adicionada',
            type: 'warning'
          })

          return
        }
      }

      let ivrOption = new IvrOptionsDTO()
      ivrOption.option = selectOption.option
      ivrOption.goto = selectOption.goto

      this.model.addOption(ivrOption)

      this.select.options = {
        option: null,
        goto: null
      }
    },

    handleRemoveTable (model) {
      for (let i = 0; i < this.model.options.length; i++) {
        if (this.model.options[i].option === model.option) {
          this.model.options.splice(i, 1)
          break
        }
      }
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    uploadOnSuccess (response, file, fileList) {
      console.log(fileList)
      this.model[response.property] = response.property + '___' + file.name
      this.model[response.property + 'Changed'] = response.file

      this.audioList[response.property] = []
      this.audioList[response.property].push({
        name: file.name,
        property: response.property,
        status: 'finished'
      })
    },
    handleRemoveAudio (property) {
      this.model[property] = null
      this.model[property + 'Changed'] = '__REMOVE__'
      this.audioList[property] = []
    },
    uploadOnRemove (file, fileList) {
      this.model[file.property] = null
      this.model[file.property + 'Changed'] = '__REMOVE__'
      this.audioList[file.property] = []
    },
    save () {
      this.loading = true
      debugger
      let model = this.parseServer(this.model).toJSON()
      if (this.$route.params.id) {
        this.service.update(model)
          .then((data) => {
            this.$notify.success({
              title: 'Sucesso',
              message: 'Alteração realizada com sucesso'
            })
            this.$router.push({name: 'ivr.list'})
          }, () => {
            this.loading = false
            this.$notify.warning({
              title: 'Falha',
              message: 'Falha ao alterar'
            })
          })
        return
      }
      this.service.create(model)
        .then((data) => {
          this.$notify.success({
            title: 'Sucesso',
            message: 'Inclusão realizada com sucesso'
          })
          this.$router.push({name: 'ivr.list'})
        }, () => {
          this.loading = false
          this.$notify.warning({
            title: 'Falha',
            message: 'Falha ao incluir'
          })
        })
    },
    handleBack () {
      this.$router.back()
    },
    parseForm (model) {
      this.model = new IvrDTO(model)
    },
    parseServer (model) {
      return model
    }
  }
}
