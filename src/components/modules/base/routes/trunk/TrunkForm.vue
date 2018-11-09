<template>

  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="80px"
           @handleSubmit.prevent="handleSubmit"
           v-loading="loading"
  >

    <div class="row">
      <el-form-item label="Descrição" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="Registro">
        <div class="row">
          <el-form-item label="Tipo" prop="host">
            <el-select v-model="model.registerType" placeholder="Selectionar">
              <el-option
                v-for="item in resources.registerTypes"
                :key="item.value"
                :label="item.description"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

        </div>
        <div class="row">
          <el-form-item label="Servidor" v-if="model.registerType && model.registerType.value == 'AUTH_SIP'">
            <el-input v-model="model.protocol.host"></el-input>
          </el-form-item>

          <el-form-item label="Número" v-if="model.registerType.value  && (model.registerType.protocol === 'SIP')">
            <el-input v-model="model.protocol.defaultuser"></el-input>
          </el-form-item>

          <el-form-item label="Grupo" v-if="model.registerType.protocol === 'KHOMP'">
            <el-input v-model="model.protocol.groupId"></el-input>
          </el-form-item>

          <el-form-item label="Senha" v-if="model.registerType.value && (model.registerType.protocol === 'SIP')">
            <el-input type="password" v-model="model.protocol.secret" auto-complete="false"></el-input>
          </el-form-item>
        </div>

      </el-tab-pane>
      <el-tab-pane label="Discagem">
        <el-row>
          <el-col :span="8">
            <el-form-item label="Discagem" prop="host">
              <el-select v-model="model.dialType" placeholder="Selectionar">
                <el-option
                  v-for="item in resources.dialTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="DDI">
              <el-input v-model="model.ddi"></el-input>
            </el-form-item>

            <el-form-item label="DDD">
              <el-input v-model="model.ddd"></el-input>
            </el-form-item>

            <el-form-item label="Operadora">
              <el-input v-model="model.operatorCode"></el-input>
            </el-form-item>

            <el-form-item label="Prefixo">
              <el-input v-model="model.dialPrefix"></el-input>
            </el-form-item>

            <el-form-item label="Sufixo">
              <el-input v-model="model.dialSufix"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Configuração">
        <div class="row">
          <el-form-item label="Canais" v-if="model.protocol">
            <el-input-number v-model="model.protocol.callLimit" :min="0"></el-input-number>

          </el-form-item>
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

<script src="./TrunkForm.js"></script>
