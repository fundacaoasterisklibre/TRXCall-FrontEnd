<template>

  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="80px"
           @handleSubmit.prevent="handleSubmit"
           v-loading="loading">

    <div class="row">
      <el-form-item label="Número" prop="id">
        <el-input v-model="model.id"></el-input>
      </el-form-item>
      <el-form-item label="Nome" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="Configurações">

        <el-form-item label="Estratégia">
          <el-select v-model="model.strategy" filterable clearable="">
            <el-option
              v-for="item in resources.queueStrategy"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>

          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="Membros">
        <div class="row sm-gutter">
          <div class="col">
            <h6>Selecione o ramal</h6>
            <el-select v-model="select.branch" multiple filterable>
              <el-option
                v-for="item in resources.branches"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>

            </el-select>
            <el-button icon="el-icon-caret-bottom" @click="handleAddTable"
                       :disabled="select.branch == null"></el-button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-table
              :data="model.members"
              style="width: 100%">
              <el-table-column width="60">
                <template slot-scope="scope">
                  {{scope.$index + 1}}º {{scope.row.order}}
                </template>
              </el-table-column>
              <el-table-column
                prop="branch.name"
                label="Ramal">
              </el-table-column>
              <el-table-column
                label="Penalidade"
                width="100">
                <template slot-scope="scope">
                  <div class="row">
                    <div class="col">
                      <el-input-number v-model="scope.row.penalty" size="small" controls-position="right"
                                       style="width: 80px"></el-input-number>
                    </div>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="Pausado"
                width="100">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.paused">
                  </el-switch>
                </template>
              </el-table-column>


              <el-table-column width="100">
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

<script src="./QueueForm.js"></script>
