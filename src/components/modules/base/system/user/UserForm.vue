<template>
  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="80px"
           @handleSubmit.prevent="handleSubmit"
           style="margin:20px"
           v-loading="loading"
  >
    <el-row>
      <!-- <el-form-item label="Número" prop="id">
        <el-input v-model="model.id"></el-input>
      </el-form-item>  -->
      <el-form-item label="Nome" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
    </el-row>
    <div class="row">
      <el-form-item label="Usuário"prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>

      <el-form-item label="Senha"  prop="password" v-if="!model.id">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
    </div>
      <el-tabs type="border-card">
      <el-tab-pane label="Opções">
        <div class="row sm-gutter">
          <div class="col-6">
            <el-form-item label="Departamento" prop="department">
              <el-select v-model="model.department" placeholder="Selecionar">
                <el-option
                  v-for="item in resources.departments"
                  :key="item.id"
                  :label="item.name"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-6">
            <el-form-item label="Perfil de acesso" prop="userAccessProfile">
              <el-select v-model="model.accessProfile" placeholder="Selecionar">
                <el-option
                  v-for="item in resources.accessProfiles"
                  :key="item.value"
                  :label="item.label"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
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

<script src="./UserForm.js"></script>
