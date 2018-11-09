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
      <el-table-column prop="id" label="Descrição" width="150" sortable></el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleOpenForm(scope.row)" icon="el-icon-edit"></el-button>
          <el-button size="small" type="danger" @click="handleRemove(scope.row)" icon="el-icon-delete"></el-button>
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

  </section>
</template>

<script src="./DepartmentList.js"></script>
