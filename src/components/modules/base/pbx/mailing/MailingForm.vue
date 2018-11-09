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
      <el-form-item label="Descrição" prop="description">
        <el-input v-model="model.description"></el-input>
      </el-form-item>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="Geral">
        <div class="row sm-gutter">
          <div class="col">
            <el-form-item label="Importação">
              <el-select v-model="select.type">
                <el-option
                  v-for="item in [{id: 'FILE', name: 'Arquivo CSV'}, {id: 'URL', name: 'URL'},{id: 'CUSTOM', name: 'Customizado'}]"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>


              </el-select>
            </el-form-item>
            <el-form-item label="Arquivo" v-if="select.type == 'FILE'">
              <el-upload
                action="http://192.168.16.250/api/mailing.upload"
                list-type="text"
                :on-success="success">
                <i class="el-icon-upload"></i>
              </el-upload>
            </el-form-item>
          </div>
          <div class="col-8">
            <el-table
              :data="model.items"
              style="width: 100%">
              <el-table-column
                prop="trunk.name"
                label="Nome">
              </el-table-column>
              <el-table-column
                prop="trunk.name"
                label="Referencia">
              </el-table-column>
              <el-table-column
                prop="trunk.name"
                label="Telefone">
              </el-table-column>
              <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" icon="el-icon-caret-bottom" @click="handleMove(scope.row, scope, 'DOWN')"
                             :disabled="!(scope.$index < model.items.length - 1 && model.items.length > 1)"></el-button>
                </template>
              </el-table-column>

              <el-table-column width="60">
                <template slot-scope="scope">
                  <el-button size="small" icon="el-icon-caret-top" @click="handleMove(scope.row, scope, 'UP')"
                             :disabled="!(scope.$index > 0 && model.items.length > 1)"></el-button>
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


    <el-dialog title="Import" :visible.sync="dto.view">
      <el-form :model="form">

        <el-table
          :data="dto.data"
          height="350"
          style="width: 100%"
          >
          <el-table-column
            prop="label"
            label="Campo"
            width="180">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Valor">
          </el-table-column>
          <el-table-column
            label="Campo"
            width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.id" placeholder="Selecione">
                <el-option
                  v-for="opt in dto.info"
                  :key="opt"
                  :label="opt"
                  :value="opt">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dto.view = false">Cancelar</el-button>
        <el-button type="primary" @click="handleSend()">Confirmar</el-button>
      </span>
    </el-dialog>


    <br/>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit()">Salvar</el-button>
      <el-button @click="handleBack()">Voltar</el-button>
    </el-form-item>
  </el-form>

</template>

<script src="./MailingForm.js"></script>
