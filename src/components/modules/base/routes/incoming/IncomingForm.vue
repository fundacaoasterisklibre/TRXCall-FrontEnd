<template>

  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="100px"
           @handleSubmit.prevent="handleSubmit"
           style="margin:20px;width:60%"
           v-loading="loading"
  >

    <div class="row">
      <el-form-item label="Descrição" prop="name" >
        <el-input v-model="model.name" :disabled="disabledValue" ></el-input>
      </el-form-item>
    </div>

    <div class="row">
      <el-form-item label="Mascara" prop="from" >
        <el-input v-model="model.from" :disabled="disabledValue" ></el-input>
      </el-form-item>
    </div>
    <div class="row">
      <el-form-item label="Redirecionar" prop="to">
        <el-select v-model="model.to" filterable clearable  placeholder="Selecione">
          <el-option
            v-for="item in resources.forwards"
            :key="item.value"
            :label="item.description"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </div>

    <br/>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">Salvar</el-button>
      <el-button @click="handleBack()">Voltar</el-button>
    </el-form-item>
  </el-form>

</template>

<script src="./IncomingForm.js"></script>
