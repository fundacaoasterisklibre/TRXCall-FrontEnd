import BranchService from 'src/shared/service/BranchService'
import ForwardService from 'src/shared/service/ForwardService'
import ForwardDTO from '../../../../../shared/dto/ForwardDTO'
import BranchDTO from '../../../../../shared/dto/BranchDTO'
import UserDTO from '../../../../../shared/dto/UserDTO'
import PlanRouteDTO from '../../../../../shared/dto/PlanRouteDTO'
import BranchPermissionDTO from '../../../../../shared/dto/BranchPermissionDTO'
import GroupDialplanDTO from '../../../../../shared/dto/GroupDialplanDTO'

export default {
  name: 'branch-form',
  data () {
    return {
      model: new BranchDTO(),
      select: {
        userID: null
      },
      resources: {
        users: [],
        forwards: [],
        permissions: []
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
    let _this = this
    let forwardService = new ForwardService(this.$resource)
    this.loading = true
    this.model = new BranchDTO()
    this.service = new BranchService(this.$resource)

    await this.service.resources()
      .then((data) => {
        this.resources.users = []
        data.users.forEach((data) => {
          let userDTO = new UserDTO(data)
          this.resources.users.push(userDTO)
        })

        this.resources.planRoutes = []
        data.planRoutes.forEach((data) => {
          let planRouteDTO = new PlanRouteDTO(data)
          this.resources.planRoutes.push(planRouteDTO)
        })

        this.resources.permissions = []
        data.permissions.forEach((data) => {
          let groupDTO = new GroupDialplanDTO(data)
          this.resources.permissions.push(groupDTO)
        })
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
        })
    }

    _this.resources.permissions.forEach((permission) => {
      for (let i = 0; i < _this.model.permissions.length; i++) {
        if (permission.value === _this.model.permissions[i].groupType) {
          _this.model.permissions[i].groupTypeLabel = permission.label
          return
        }
      }

      let branchPermissionDTO = new BranchPermissionDTO()
      branchPermissionDTO.groupType = permission.value
      branchPermissionDTO.groupTypeLabel = permission.label
      _this.model.permissions.push(branchPermissionDTO)
    })
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
            this.$router.push({name: 'branch.list'})
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
          this.$router.push({name: 'branch.list'})
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
      this.model = new BranchDTO(model)
    },
    parseServer (model) {
      return model
    }
  }
}
