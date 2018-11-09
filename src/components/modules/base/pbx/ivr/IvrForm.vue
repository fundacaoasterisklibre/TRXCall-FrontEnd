<template>
  <el-form ref="model"
           :model="model"
           :rules="rules"
           label-width="80px"
           @handleSubmit.prevent="handleSubmit"
           v-loading="loading"
  >
    <el-row>
      <el-col :span="6">
        <el-form-item label="Número" prop="id">
          <el-input v-model="model.id"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item label="Nome" class="col-6" prop="name">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>


    <el-tabs type="border-card">
      <el-tab-pane label="Configuração">
        <el-row gutter="100">
          <el-col :span="6">

            <el-checkbox v-model="model.dialBranchPermit">Permitir discar para ramal</el-checkbox>
            <el-form-item label="Tentativa" prop="maxTry">
              <el-input-number v-model="model.maxTry" controls-position="right" @change="handleChange" :min="0"
                               :max="9">
                <el-option
                  v-for="item in resources.maxTry"
                  :key="item.value"
                  :label="item.maxTry"
                  :value="item">
                </el-option>
              </el-input-number>
            </el-form-item>

            <el-form-item label="Tempo" prop="timeout">
              <el-input-number v-model="model.timeout" controls-position="right" @change="handleChange" :min="0"
                               :max="9">
                <el-option
                  v-for="item in resources.timeout"
                  :key="item.value"
                  :label="item.timeout"
                  :value="item">
                </el-option>
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="18">

          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Áudios">
        <el-row>
          <el-col span="12">
            <el-form-item label="Entrada:" prop="audioWelcome">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="urlUpload"
                :auto-upload="true"
                :on-success="uploadOnSuccess"
                :on-remove="uploadOnRemove"
                :data="{'property':'audioWelcome'}"
                :file-list="audioList.audioWelcome"
              >
                <el-button slot="trigger" size="small" type="primary">Alterar arquivo</el-button>
                <el-button style="margin-left: 10px;" size="small" @click="handleRemoveAudio('audioWelcome')" v-show="model.audioWelcome">Remover</el-button>
              </el-upload>



            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="Opções:">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="urlUpload"
                :auto-upload="true"
                :on-success="uploadOnSuccess"
                :on-remove="uploadOnRemove"
                :data="{'property':'audioRead'}"
                :file-list="audioList.audioRead"
              >
                <el-button slot="trigger" size="small" type="primary">Alterar arquivo</el-button>
                <el-button style="margin-left: 10px;" size="small" @click="handleRemoveAudio('audioRead')" v-show="model.audioRead">Remover</el-button>

              </el-upload>



            </el-form-item>
          </el-col>
        </el-row>


      </el-tab-pane>

      <el-tab-pane label="Opções">

        <el-row gutter="10">
          <el-col span="7">
            <el-form-item label="Máscara">
              <el-input v-model="select.options.option"></el-input>
            </el-form-item>
            <el-form-item label="Enviar">
              <el-select v-model="select.options.goto" filterable placeholder="Selecione">
                <el-option
                  v-for="item in resources.forwards"
                  :key="item.value"
                  :label="item.description"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button icon="el-icon-plus" @click="handleAddTable" :disabled="select.options.goto === null">Adicionar
            </el-button>
          </el-col>
          <el-col span="17">
            <el-table
              :data="model.options"
              style="width: 100%">
              <el-table-column width="80" label="Máscara" prop="option">
              </el-table-column>
              <el-table-column label="Enviar para" prop="goto.description">
              </el-table-column>
              <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" type="danger" @click="handleRemoveTable(scope.row)"
                             icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <br>
        <small>Obs.: Deixar a máscara em branco para nenhuma opção informada</small>

      </el-tab-pane>
    </el-tabs>

    <br/>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">Salvar</el-button>
      <el-button @click="handleBack()">Voltar</el-button>
    </el-form-item>
  </el-form>
</template>

<script src="./IvrForm.js"></script>
