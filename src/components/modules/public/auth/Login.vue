<template>
  <el-row style="height: 100vh; text-align: center" type="flex" justify="space-between" align="middle">
    <el-col :span="2"></el-col>
    <el-col :span="20" style="width: 350px; ">
      <el-card>
        <div style="text-align: center">
          [[BUSINESS LOGO]]
          <br/>
          <br/>
        </div>
        <el-form ref="model"
                 :model="model"
                 :rules="rules"
                 label-width="80px"
                 @submit.native.prevent="handleSubmit"
                 v-loading="loading"
        >
          <el-form-item label="Usuário" prop="username">
            <el-input placeholder="Usuário" v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="Senha" prop="secret">
            <el-input type="password" placeholder="Senha" v-model="model.secret"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">Entrar</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <!--<el-row style="height: 100vh; text-align: center" type="flex" justify="space-between">-->
  <!--<el-col :span="2"></el-col>-->
  <!--<el-col :span="20" style="width: 350px; ">-->
  <!--<h1>Login</h1>-->
  <!--<el-card>-->
  <!--<div style="text-align: center">-->
  <!--[[LOGO]]-->
  <!--<br/>-->
  <!--<br/>-->
  <!--</div>-->
  <!--<el-form ref="model"-->
  <!--:model="model"-->
  <!--:rules="rules"-->
  <!--label-width="80px"-->
  <!--@handleSubmit.prevent="handleSubmit"-->
  <!--v-loading="loading"-->
  <!--&gt;-->
  <!--<el-form-item label="Usuário" prop="username">-->
  <!--<el-input placeholder="Usuário" v-model="model.username"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item label="Senha" prop="secret">-->
  <!--<el-input type="password" placeholder="Senha" v-model="model.secret"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item>-->
  <!--<el-button type="primary" @click="handleSubmit()">Entrar</el-button>-->
  <!--</el-form-item>-->
  <!--</el-form>-->
  <!--</el-card>-->
  <!--</el-col>-->
  <!--</el-row>-->
</template>

<script src="./Login.js">

</script>

<style scoped>
  .el-row {
    background-color: #20a0ff;
  }
</style>
