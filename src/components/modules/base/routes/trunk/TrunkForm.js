import TrunkService from 'src/shared/service/TrunkService'
import TrunkDTO from '../../../../../shared/dto/TrunkDTO'
import TrunkRegisterTypeDTO from '../../../../../shared/dto/TrunkRegisterTypeDTO'
import TrunkDialTypeDTO from '../../../../../shared/dto/TrunkDialTypeDTO'

export default {
  name: 'trunk-form',
  data () {
    return {
      model: new TrunkDTO(),
      typeTrunk: null,
      select: {
        userID: null
      },
      resources: {
        registerTypes: []
      },
      loading: true,
      rules: {
        name: [
          {required: true, message: 'Favor informar o nome do ramal', trigger: 'blur'}
        ]
      }
    }
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
            this.$router.push({name: 'trunk.list'})
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
          this.$router.push({name: 'trunk.list'})
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
      this.model = new TrunkDTO(model)
    },
    parseServer (model) {
      return model
    }
  },
  async created () {
    this.loading = true
    this.model = new TrunkDTO()
    this.service = new TrunkService(this.$resource)

    await this.service.resources()
      .then((data) => {
        this.resources.registerTypes = []
        data.registerTypes.forEach((data) => {
          let trunkRegisterTypeDTO = new TrunkRegisterTypeDTO(data)
          this.resources.registerTypes.push(trunkRegisterTypeDTO)
        })

        this.resources.dialTypes = []
        data.dialTypes.forEach((data) => {
          let trunkDialTypeDTO = new TrunkDialTypeDTO(data)
          this.resources.dialTypes.push(trunkDialTypeDTO)
        })
      })
    if (this.$route.params.id) {
      await this.service.info(this.$route.params.id)
        .then((data) => {
          this.parseForm(data)
        })
    }

    this.loading = false
  }
}
