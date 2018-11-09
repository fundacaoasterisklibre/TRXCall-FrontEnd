<template>

  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="80px"
           @handleSubmit.prevent="handleSubmit"
           v-loading="loading"
  >

    <div class="row">
      <el-form-item label="Número" prop="id">
        <el-input v-model="model.id"></el-input>
      </el-form-item>

      <el-form-item label="Senha">
        <el-input type="password" v-model="model.sip.secret" auto-complete="false"></el-input>
      </el-form-item>
    </div>
    <div class="row">
      <el-form-item label="Descrição" class="col-8" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="Vinculado">
        <el-select v-model="model.user" filterable placeholder="Selecione">
          <el-option
            v-for="item in resources.users"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="Siga-me">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Sempre">
              <el-select v-model="model.alwaysIn" filterable clearable placeholder="Selecione">
                <el-option
                  v-for="item in resources.forwards"
                  :key="item.value"
                  :label="item.description"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Ocupado">
              <el-select v-model="model.busyIn" filterable clearable placeholder="Selecione">
                <el-option
                  v-for="item in resources.forwards"
                  :key="item.value"
                  :label="item.description"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Discagem">
        <el-form-item label="Plano de discagem" label-width="150px">
          <el-select v-model="model.planRoute" filterable clearable placeholder="Selecione">
            <el-option
              v-for="item in resources.planRoutes"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-table
          :data="model.permissions"
          style="width: 100%">
          <el-table-column width="60" >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.permit"></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="groupTypeLabel"
            label="Grupo">
          </el-table-column>

        </el-table>
      </el-tab-pane>
    </el-tabs>
    <br/>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">Salvar</el-button>
      <el-button @click="handleBack()">Voltar</el-button>
    </el-form-item>
  </el-form>

</template>

<script src="./BranchForm.js"></script>
