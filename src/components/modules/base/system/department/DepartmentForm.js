import DepartmentService from 'src/shared/service/DepartmentService'
import DepartmentDTO from '../../../../../shared/dto/DepartmentDTO'

export default {
  name: 'department-form',
  data () {
    return {
      model: new DepartmentDTO(),
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
          {required: true, message: 'Favor informar o nome do departamento', trigger: 'blur'}
        ]
      }
    }
  },
  async created () {
    this.loading = true
    this.model = new DepartmentDTO()
    this.service = new DepartmentService(this.$resource)

    await this.service.resources()
      .then((data) => {
        // TODO
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
            this.$router.push({name: 'department.list'})
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
          this.$router.push({name: 'department.list'})
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
      this.model = new DepartmentDTO(model)
    },
    parseServer (model) {
      return model
    }
  }
}
