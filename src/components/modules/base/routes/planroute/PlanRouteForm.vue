<template>

  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="100px"
           @handleSubmit.prevent="handleSubmit"
           v-loading="loading"
  >

    <div class="row">
      <el-form-item label="Descrição" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane :label="group.label" v-for="group in resources.tabs" :key="group.value">
        <div class="row sm-gutter">
          <div class="col-4">
              <h6>Selecione o tronco</h6>
              <el-select v-model="select.trunk[group.value]" multiple filterable  >
                <el-option
                  v-for="item in group.trunks"
                  :key="item.id"
                  :label="item.name"
                  :value="item">
                </el-option>

              </el-select>
              <el-button icon="el-icon-caret-right" @click="handleAddTable(group.value)" :disabled="select.trunk[group.value] == null"></el-button>
          </div>
          <div class="col-8">
            <el-table
              :data="group.items"
              style="width: 100%">
              <el-table-column width="60">
                <template slot-scope="scope">
                  {{scope.$index + 1}}º
                </template>
              </el-table-column>
              <el-table-column
                prop="trunk.name"
                label="Tronco">
              </el-table-column>
              <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" icon="el-icon-caret-bottom" @click="handleMove(scope.row, scope, 'DOWN')"
                             :disabled="!(scope.$index < group.items.length - 1 && group.items.length > 1)"></el-button>
                </template>
              </el-table-column>

              <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" icon="el-icon-caret-top" @click="handleMove(scope.row, scope, 'UP')"
                             :disabled="!(scope.$index > 0 && group.items.length > 1)"></el-button>
                </template>
              </el-table-column>


              <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" type="danger" @click="handleRemoveTable(scope.row)"
                             icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>


      </el-tab-pane>
    </el-tabs>

    <br/>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">Salvar</el-button>
      <el-button @click="handleBack()">Voltar</el-button>
    </el-form-item>
  </el-form>

</template>

<script src="./PlanRouteForm.js"></script>
