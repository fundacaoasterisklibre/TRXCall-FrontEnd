import PlanRouteService from 'src/shared/service/PlanRouteService'
import PlanRouteDTO from '../../../../../shared/dto/PlanRouteDTO'
import TrunkDTO from '../../../../../shared/dto/TrunkDTO'
import PlanRouteItemDTO from '../../../../../shared/dto/PlanRouteItemDTO'
import GroupDialplanDTO from '../../../../../shared/dto/GroupDialplanDTO'

export default {
  name: 'planroute-form',
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`
        })
      }
      return data
    }

    return {
      model: new PlanRouteDTO(),
      data: generateData(),
      value1: [1, 4],
      select: {
        userID: null,
        trunk: {}
      },
      resources: {
        users: [],
        groups: {},
        tabs: []
      },
      loading: true,
      trunks: [],
      rules: {
        name: [
          {required: true, message: 'Favor informar o nome do ramal', trigger: 'blur'}
        ]
      }
    }
  },
  async created () {
    let _this = this
    this.loading = true
    this.model = new PlanRouteDTO()
    this.service = new PlanRouteService(this.$resource)

    await this.service.resources()
      .then((data) => {
        this.resources.trunks = []
        data.trunks.forEach((trunk) => {
          let trunkDTO = new TrunkDTO(trunk)
          this.resources.trunks.push(trunkDTO)
        })

        this.resources.groups = {}
        data.groups.forEach((group) => {
          let groupDTO = new GroupDialplanDTO(group)
          this.resources.groups[group.value] = groupDTO
          this.resources.tabs.push(this.resources.groups[group.value])
        })
      })

    if (this.$route.params.id) {
      await this.service.info(this.$route.params.id)
        .then((data) => {
          this.parseForm(data)
        })
    }

    this.model.items.forEach((item) => {
      this.resources.groups[item.groupType]['items'].push(item)
    })

    Object.keys(this.resources.groups).map((key, index) => {
      _this.select.trunk[key] = []
      _this.resources.trunks.forEach((value) => {
        _this.resources.groups[key]['trunks'].push(value)
      })

      for (let c = 0; c < _this.resources.groups[key]['items'].length; c++) {
        let model = _this.resources.groups[key]['items'][c]
        for (let i = 0; i < _this.resources.groups[key]['trunks'].length; i++) {
          if (_this.resources.groups[key]['trunks'][i].id === model.trunk.id) {
            _this.resources.groups[key]['trunks'].splice(i, 1)
            break
          }
        }
      }
    })
    this.loading = false
  },
  methods: {
    handleMove (row, scope, method) {
      let groupType = row.groupType
      let oldIndex = scope.$index
      let newIndex = method === 'UP' ? oldIndex - 1 : oldIndex + 1
      if (newIndex >= this.resources.groups[groupType]['items'].length) {
        var k = newIndex - this.resources.groups[groupType]['items'].length
        while ((k--) + 1) {
          this.resources.groups[groupType]['items'].push(undefined)
        }
      }
      this.resources.groups[groupType]['items'].splice(newIndex, 0, this.resources.groups[groupType]['items'].splice(oldIndex, 1)[0])
      this.resources.groups[groupType]['items'][oldIndex].order = oldIndex
      this.resources.groups[groupType]['items'][newIndex].order = newIndex
      console.log(this.resources.groups[groupType]['items'])
    },
    handleAddTable (groupType) {
      let list = this.select.trunk[groupType]
      list.forEach((model) => {
        let planRouteItem = new PlanRouteItemDTO()
        planRouteItem.trunk = model
        planRouteItem.order = this.resources.groups[groupType]['items'].length
        planRouteItem.groupType = groupType
        this.resources.groups[groupType]['items'].push(planRouteItem)
        for (let i = 0; i < this.resources.groups[groupType]['trunks'].length; i++) {
          if (this.resources.groups[groupType]['trunks'][i].id === model.id) {
            this.resources.groups[groupType]['trunks'].splice(i, 1)
            break
          }
        }
      })

      this.select.trunk[groupType] = []
    },
    handleRemoveTable (row) {
      let groupType = row.groupType
      debugger
      for (let i = 0; i < this.resources.groups[groupType]['items'].length; i++) {
        if (this.resources.groups[groupType]['items'][i].trunk.id === row.trunk.id) {
          this.resources.groups[groupType]['items'].splice(i, 1)
          break
        }
      }
      for (let i = 0; i < this.resources.groups[groupType]['items'].length; i++) {
        this.resources.groups[groupType]['items'][i].order = i
      }
      this.resources.groups[groupType].trunks.push(row.trunk)
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
      let _this = this
      this.loading = true
      this.model.clearAllItems()

      Object.keys(this.resources.groups).map((key, index) => {
        _this.model.items = _this.resources.groups[key].items
      })

      let model = this.parseServer(this.model).toJSON()
      if (this.$route.params.id) {
        this.service.update(model)
          .then((data) => {
            this.$notify.success({
              title: 'Sucesso',
              message: 'Alteração realizada com sucesso'
            })
            this.$router.push({name: 'planroute.list'})
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
          this.$router.push({name: 'planroute.list'})
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
      this.model = new PlanRouteDTO(model)
    },
    parseServer (model) {
      return model
    }
  }
}
