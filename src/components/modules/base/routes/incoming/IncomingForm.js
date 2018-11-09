import IncomingService from 'src/shared/service/IncomingService'
import ForwardService from 'src/shared/service/ForwardService'
import IncomingDTO from '../../../../../shared/dto/IncomingDTO'
import ForwardDTO from '../../../../../shared/dto/ForwardDTO'

export default {
  name: 'incoming-form',
  data () {
    return {
      model: new IncomingDTO(),
      disabledValue: false,
      select: {
        userID: null
      },
      resources: {
        users: [],
        forwards: []
      },
      loading: true,
      rules: {
        name: [
          {required: true, message: 'Favor informar o nome do ramal', trigger: 'blur'}
        ],
        from: [
          {required: true, message: 'Favor informar o nome do ramal', trigger: 'blur'}
        ],
        to: [
          {required: true, validator: this.checkForward, trigger: 'change'}
        ]
      }
    }
  },
  async created () {
    this.loading = true
    this.model = new IncomingDTO()
    this.service = new IncomingService(this.$resource)
    let forwardService = new ForwardService(this.$resource)

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
        })
    }

    this.disabledValue = (this.model.from === '*')
    this.loading = false
  },
  methods: {
    checkForward (rule, value, callback) {
      if (value.reference === null) {
        return callback(new Error('Favor informar o direcionamento'))
      }
      return callback()
    },
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
    save () {
      this.loading = true

      let model = this.parseServer(this.model).toJSON()
      if (this.$route.params.id) {
        this.service.update(model)
          .then((data) => {
            this.$notify.success({
              title: 'Sucesso',
              message: 'Alteração realizada com sucesso'
            })
            this.$router.push({name: 'incoming.list'})
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
          this.$router.push({name: 'incoming.list'})
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
      this.model = new IncomingDTO(model)
    },
    parseServer (model) {
      return model
    }
  }
}
