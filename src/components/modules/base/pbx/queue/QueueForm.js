import QueueService from 'src/shared/service/QueueService'
import QueueDTO from '../../../../../shared/dto/QueueDTO'
import BranchDTO from '../../../../../shared/dto/BranchDTO'
import QueueMemberDTO from '../../../../../shared/dto/QueueMemberDTO'
import QueueStrategyTypeDTO from '../../../../../shared/dto/QueueStrategyTypeDTO'

export default {
  name: 'queue-form',
  data () {
    return {
      model: new QueueDTO(),
      select: {
        userID: null
      },
      urlUpload: null,
      resources: {
        branches: [],
        queueStrategy: [],
        forwards: []
      },
      loading: true,
      rules: {
        id: [
          {required: true, message: 'Favor informar o número do ramal', trigger: 'blur'},
          {min: 3, message: 'O tamanho tem que ser maior que 3', trigger: 'blur'}
        ],
        name: [
          {required: true, message: 'Favor informar o nome do ramal', trigger: 'blur'},
        ]
      }
    }
  },
  async created () {
    this.loading = true
    this.model = new QueueDTO()
    this.service = new QueueService(this.$resource)
    this.urlUpload = 'http://192.168.16.250/api/ivr.uploadAudio'
    await this.service.resources()
      .then((data) => {
        this.resources.branches = []
        data.branches.forEach((data) => {
          let dto = new BranchDTO(data)
          this.resources.branches.push(dto)
        })

        this.resources.queueStrategy = []
        data.queueStrategy.forEach((data) => {
          let dto = new QueueStrategyTypeDTO(data)
          this.resources.queueStrategy.push(dto)
        })
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
    handleAddTable () {
      let list = this.select.branch
      list.forEach((model) => {
        let queueMemberDTO = new QueueMemberDTO()
        queueMemberDTO.branch = model
        this.model.addItems(queueMemberDTO)
        debugger

        for (let i = 0; i < this.resources.branches.length; i++) {
          if (this.resources.branches[i].id === model.id) {
            this.resources.branches.splice(i, 1)
            break
          }
        }
      })

      this.select.branch = []
    },
    handleRemoveTable (model) {
      for (let i = 0; i < this.model.items.length; i++) {
        if (this.model.items[i].id === model.id) {
          this.model.items.splice(i, 1)
          break
        }
      }
      this.trunks.push(model.trunk)
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
            this.$router.push({name: 'queue.list'})
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
          this.$router.push({name: 'queue.list'})
        }, () => {
          this.loading = false
          this.$notify.warning({
            title: 'Falha',
            message: 'Falha ao alterar'
          })
        })
    },
    handleBack () {
      this.$router.back()
    },
    parseForm (model) {
      this.model = new QueueDTO(model)
    },
    parseServer (model) {
      return model
    }
  },

}
