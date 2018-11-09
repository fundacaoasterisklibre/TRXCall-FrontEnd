import MailingService from 'src/shared/service/MailingService'
import MailingDTO from '../../../../../shared/dto/MailingDTO'

export default {
  name: 'mailing-form',
  data () {
    return {
      model: new MailingDTO(),
      select: {
        type: 'FILE',
        userID: null
      },
      dto: {
        mailing: 0,
        view: false,
        filename: '',
        info: {},
        data: {}
      },
      resources: {
        users: [],
        forwards: []
      },
      loading: true,
      rules: {
        description: [
          {required: true, message: 'Favor informar a descrição do mailing', trigger: 'blur'}
        ]
      }
    }
  },
  async created () {
    this.loading = true
    this.model = new MailingDTO()
    this.service = new MailingService(this.$resource)

    await this.service.resources()
      .then((data) => {

      })

    if (this.$route.params.id) {
      await this.service.info(this.$route.params.id)
        .then((data) => {
          this.parseForm(data)
        })
    }

    this.loading = false
  },
  methods: {
    success (response, file, fileList) {
      this.dto.mailing = this.model.id
      this.dto.info = response.dto
      this.dto.data = response.data
      this.dto.filename = response.filename
      this.dto.view = true
      debugger
    },
    handleSend () {
      this.service.sendUploadData(this.dto)
        .then((data) => {
          console.log(data)
        }, () => {
          console.log('a')
        })
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
            this.$router.push({name: 'mailing.list'})
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
          this.$router.push({name: 'mailing.list'})
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
      this.model = new MailingDTO(model)
    },
    parseServer (model) {
      return model
    }
  },

}
