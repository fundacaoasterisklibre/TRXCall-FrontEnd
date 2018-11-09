<template>
  <el-container style="height: 100vh">
    <el-aside width="auto" style="background-color: #409EFF">
      <el-menu class="el-menu-vertical-demo"
               default-active="index"
               :collapse="collapsed"

      >
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span>TRXCall</span>
        </el-menu-item>

      </el-menu>
      <LeftMenu :collapsed="collapsed"/>
    </el-aside>
    <el-container>
      <el-header style="font-size: 12px" height="30">
        <el-row type="flex" justify="space-between">
          <el-col :span="15" style="text-align: left; color: red; font-weight: bold; font-size: 16px"></el-col>
          <el-col :span="9" style="text-align: right">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link">
                {{sysUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Configurações</el-dropdown-item>
                <el-dropdown-item>Alterar senha</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">Sair</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer height="20px" style=" text-align:center; background-color:#409EFF; color: #fff; margin-top: 5px ">
        TRXCall
      </el-footer>
    </el-container>
  </el-container>

</template>

<script>
  import LeftMenu from '@/core/nav/LeftMenu'
  export default {
    components: {
      LeftMenu
    },
    data () {
      return {
        collapsed: false,
        sysUserName: 'John Doe'
      }
    },
    methods: {
      handleCollapse: function () {
        this.collapsed = !this.collapsed
      },
      logout: function () {
        var _this = this
        console.log(this.$route)
        this.$confirm('Deseja realmente sair?', 'logout', {})
          .then(() => {
            _this.$router.push('/')
          })
      }
    }
  }
</script>

<style scoped lang="scss">

  .el-menu {
    border: 0;
  }

  .menu {
    font-size: 20px;
  }

  .el-header {
    color: #333;
    line-height: 40px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
  }

  .el-menu-vertical-demo {
  }

  .el-menu-vertical-demo .el-badge__content.is-fixed.is-dot {
    top: 20px;
    right: 8px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) .el-badge__content.is-fixed.is-dot {
    top: 20px;
    right: 13px;
  }


</style>
