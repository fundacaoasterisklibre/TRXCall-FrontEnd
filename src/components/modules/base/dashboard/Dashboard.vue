<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <div class="row">
      <el-card>
          <bar-chart :data="data"></bar-chart>
      </el-card>
    </div>
  </div>
</template>

<script src="./Dashboard.js"></script>
<style scoped>
  .el-card {
    width: 500px;
  }
</style>
