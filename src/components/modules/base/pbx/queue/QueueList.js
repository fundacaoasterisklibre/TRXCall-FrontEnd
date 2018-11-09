import QueueService from 'src/shared/service/QueueService'

export default {
  name: 'queue-list',
  created () {
    this.service = new QueueService(this.$resource)
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
      pageSizes: [1, 50, 100, 200],
      filters: {
        name: ''
      },
      selects: [],
      loading: true
    }
  },
  methods: {
    handleOpenForm (row) {
      let params = {}
      if (row !== undefined) {
        params = {id: row.id}
      }
      this.$router.push({name: 'queue.form', params})
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
          this.handleFilter()
          this.$notify.success({
            title: 'Sucesso',
            message: 'Itens removido com sucesso'
          })
        })
        .catch(() => {
          this.$notify.error({
            title: 'Erro',
            message: 'Falha ao exluir'
          })
        })
    }
  }
}
