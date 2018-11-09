import UserService from 'src/shared/service/UserService'
import UserDTO from '../../../../../shared/dto/UserDTO'
import DepartmentDTO from '../../../../../shared/dto/DepartmentDTO'
import UserAccessProfileDTO from '../../../../../shared/dto/UserAccessProfileDTO'

export default {
  name: 'user-form',
  data () {
    return {
      model: new UserDTO(),
      select: {
        userID: null
      },
      resources: {
        accessProfiles: [],
        departments: []
      },
      loading: true,
      rules: {
        id: [
          {required: true, message: 'Favor informar o número do ramal', trigger: 'blur'},
          {min: 3, message: 'O tamanho tem que ser maior que 3', trigger: 'blur'}
        ],
        name: [
          {required: true, message: 'Favor informar o nome do ramal', trigger: 'blur'}
        ]
      }
    }
  },
  async created () {
    this.loading = true
    this.model = new UserDTO()
    this.service = new UserService(this.$resource)

    await this.service.resources()
      .then((data) => {
        this.resources.departments = []
        data.departments.forEach((data) => {
          let dto = new DepartmentDTO(data)
          this.resources.departments.push(dto)
        })

        this.resources.accessProfiles = []
        data.accessProfile.forEach((data) => {
          let dto = new UserAccessProfileDTO(data)
          this.resources.accessProfiles.push(dto)
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
            this.$router.push({name: 'user.list'})
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
          this.$router.push({name: 'user.list'})
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
      this.model = new UserDTO(model)
    },
    parseServer (model) {
      return model
    }
  }
}
