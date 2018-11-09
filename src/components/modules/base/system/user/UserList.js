import UserService from 'src/shared/service/UserService'

export default {
  name: 'user-list',
  created () {
    this.service = new UserService(this.$resource)
    this.handleFilter()
  },
  data () {
    return {
      table: {
        currentPageNumber: 1,
        numItemsPerPage: 50,
        totalItemCount: 0,
        items: []
      },
      dialogFormVisible: false,
      pageSizes: [1, 50, 100, 200],
      filters: {
        name: ''
      },
      rowChange: {
        id: null,
        name: null,
        password: ''
      },
      selects: [],
      loading: true
    }
  },
  methods: {
    handleCommand (command) {
      switch (command.event) {
        case 'edit':
          this.handleOpenForm(command.row)
          break
        case 'password':
          this.handlePassword(command.row)
          break
        case 'remove':
          this.handleRemove(command.row)
          break
      }
    },
    handleOpenForm (row) {
      let params = {}
      if (row !== undefined) {
        params = {id: row.id}
      }
      this.$router.push({name: 'user.form', params})
    },
    handlePassword (row) {
      this.rowChange = {
        id: row.id,
        name: row.name,
        password: ''
      }
      this.dialogFormVisible = true
    },
    handleChangePassword (row) {
      this.service.changePassword(row).then(() => {
        this.$notify.success({
          title: 'Sucesso',
          message: 'Senha alterada com sucesso!'
        })
        this.dialogFormVisible = false
      })
    },
    handleSelectsChange: function (selects) {
      this.selects = selects
    },
    handleRemove (row) {
      let _self = this
      this.$confirm(
        'Deseja realmente apagar os itens selecionados?',
        'Confirmação',
        {
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
          type: 'warning'
        }
      ).then(() => {
        let loading = this.$loading({
          lock: true
        })
        let removeList = []

        if (row !== undefined) {
          removeList.push(row)
        }
        else {
          removeList = _self.selects
        }
        removeList.forEach((row) => {
          _self.removeItem(row)
        })
        loading.close()
      })
    },
    handleSizeChange (val) {
      this.table.numItemsPerPage = val
      this.handleFilter()
    },
    handleCurrentChange (val) {
      this.table.currentPageNumber = val
      this.handleFilter()
    },
    handleFilter () {
      this.loading = true
      return this.service.list({
        numItemsPerPage: this.table.numItemsPerPage,
        currentPageNumber: this.table.currentPageNumber,
        filter: this.filters.name
      })
        .then((data) => {
          this.table = data
          this.loading = false
          return data
        })
    },
    removeItem (row) {
      this.service.delete(row.id)
        .then(() => {
          this.data.splice(row.index, 1)
          this.$notify.success({
            title: 'Sucesso',
            message: 'Itens removido com sucesso'
          })
        })
        .catch(() => {
          this.$notify.error({
            title: 'Erro',
            message: 'Falha ao excluir'
          })
        })
    }
  }
}
