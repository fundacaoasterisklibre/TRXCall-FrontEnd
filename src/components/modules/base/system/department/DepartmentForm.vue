<template>
  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="80px"
           @handleSubmit.prevent="handleSubmit"
           style="margin:20px;width:60%"
           v-loading="loading"
  >
    <div class="row">
      <!-- <el-form-item label="Número" prop="id">
        <el-input v-model="model.id"></el-input>
      </el-form-item>  -->

      <el-form-item label="Nome" class="col-6"  prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item> 
    </div>
   
   <!-- <el-tabs type="border-card">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Tentativa" prop="maxTry">
              <el-input-number v-model="model.maxTry" controls-position="right" @change="handleChange" :min="0" :max="9">
                <el-option
                  v-for="item in resources.maxTry"
                  :key="item.value"
                  :label="item.maxTry"
                  :value="item">
                </el-option>
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Tempo" prop="timeout">
              <el-input-number v-model="model.timeout" controls-position="right" @change="handleChange" :min="0" :max="9">
                <el-option
                 v-for="item in resources.timeout"
                  :key="item.value"
                  :label="item.timeout"
                  :value="item">
                </el-option>
              </el-input-number>
            </el-form-item>
          </el-col>

        </el-row>
      </el-tab-pane>
    </el-tabs> -->

    <br/>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">Salvar</el-button>
      <el-button @click="handleBack()">Voltar</el-button>
    </el-form-item>
  </el-form>

</template>

<script src="./DepartmentForm.js"></script>
