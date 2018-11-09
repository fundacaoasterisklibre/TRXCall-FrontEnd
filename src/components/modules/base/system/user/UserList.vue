<template>
  <section>

    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="Pesquisar"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter()" icon="el-icon-search">Filtrar</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleOpenForm" icon="el-icon-circle-plus-outline">Adicionar</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleRemove()" v-show="this.selects.length!==0" icon="el-icon-delete">
            Apagar selecionados
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="table.items" highlight-current-row v-loading="loading" @selection-change="handleSelectsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="Nome" sortable></el-table-column>
      <el-table-column prop="id" label="Usuário" width="100" sortable></el-table-column>
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-dropdown  @command="handleCommand">
            <el-button size="small" icon="el-icon-setting"></el-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{'event':'edit', 'row': scope.row}">Editar</el-dropdown-item>
              <el-dropdown-item :command="{'event':'password', 'row': scope.row}">Alterar senha</el-dropdown-item>
              <el-dropdown-item :command="{'event':'remove', 'row': scope.row}" divided>Excluir</el-dropdown-item>
            </el-dropdown-menu>


          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" class="row justify-end">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="table.currentPageNumber"
        :page-sizes="pageSizes"
        :page-size="table.numItemsPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.totalItemCount">
      </el-pagination>
    </div>

    <el-dialog :title="'Alterar senha de '+ rowChange.name" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="rowChange">
        <el-form-item label="Senha" >
          <el-input type="password" v-model="rowChange.password" auto-complete="off"></el-input>
        </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancelar</el-button>
    <el-button type="primary" @click="handleChangePassword(rowChange)">Confirmar</el-button>
  </span>
    </el-dialog>

  </section>


</template>

<script src="./UserList.js"></script>
