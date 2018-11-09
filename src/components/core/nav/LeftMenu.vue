<template>
  <el-menu :default-active="$route.path"
           unique-opened
           router
           background-color="#409EFF"
           text-color="white"
           active-text-color="red"
           v-show="!collapsed">
    <template v-for="(item, index) in items">
      <el-submenu :index="index+''" v-if="item.items">
        <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
        <el-menu-item v-for="(child, key) in item.items" :route="child.router" :index="child.name" :key="key">
          {{child.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.router.name || ''"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
    </template>

  </el-menu>
</template>

<script>
  export default {
    name: 'left-menu',
    props: ['collapsed'],
    data () {
      return {
        items: [
          {
            type: 'item',
            icon: 'dashboard',
            name: 'Dashboard',
            router: {
              name: 'dashboard'
            }
          },
          {
            type: 'tree',
            icon: 'build',
            name: 'Sistema',
            items: [
              {
                type: 'item',
                name: 'Usuários',
                router: {
                  name: 'user.list'
                }
              },
              {
                type: 'item',

                name: 'Departamentos',
                router: {
                  name: 'department.list'
                }
              }
            ]
          },
          {
            type: 'tree',
            icon: 'extension',
            name: 'PBX',
            items: [
              {
                type: 'item',

                name: 'Ramais',
                router: {
                  name: 'branch.list'
                }
              },

              {
                type: 'item',

                name: 'Ura',
                router: {
                  name: 'ivr.list'
                }
              },
              {
                type: 'item',

                name: 'Filas de atendimento',
                router: {
                  name: 'queue.list'
                }
              }
            ]
          },
          {
            type: 'tree',
            icon: 'router',
            name: 'Rotas e regras',
            items: [
              {
                type: 'item',

                name: 'Terminação',
                router: {
                  name: 'trunk.list'
                }
              },
              {
                type: 'item',

                name: 'Entrada de ligação',
                router: {
                  name: 'incoming.list'
                }
              },
              {
                type: 'item',
                name: 'Plano de discagem',
                router: {
                  name: 'planroute.list'
                }
              }
            ]
          },
          {
            type: 'tree',
            icon: 'extension',
            name: 'Relatórios',
            items: [
              {
                type: 'item',

                name: 'Ligações',
                router: {
                  name: 'cdr.list'
                }
              }
            ]
          }
        ]
      }
    }
  }
</script>
<style>
  .el-submenu__title i {
    color: white !important;
  }
</style>
