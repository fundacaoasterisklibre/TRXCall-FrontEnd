function load (component) {
  // '@' is aliased to src/components
  return () =>
    import(`@/modules/base/${component}.vue`)
}

const routes = [
  {
    path: '/',
    component: load('Layout'),
    children: [
      {
        title: 'Dashboard',
        path: 'dashboard',
        name: 'dashboard',
        component: load('dashboard/Dashboard')
      },
      {
        path: 'department.list',
        name: 'department.list',
        component: load('system/department/DepartmentList')
      },
      {
        path: 'department.form/:id?',
        name: 'department.form',
        component: load('system/department/DepartmentForm')
        // meta: {
        //   title: 'Lista de Departamentos'
        // }
      },
      {
        path: 'user.list',
        name: 'user.list',
        component: load('system/user/UserList')
      },
      {
        path: 'user.form/:id?',
        name: 'user.form',
        component: load('system/user/UserForm')
      },
      {
        path: 'branch.list',
        name: 'branch.list',
        component: load('pbx/branch/BranchList')
      },
      {
        path: 'branch.form/:id?',
        name: 'branch.form',
        component: load('pbx/branch/BranchForm')
      },
      {
        path: 'ivr.list',
        name: 'ivr.list',
        component: load('pbx/ivr/IvrList')
      },
      {
        path: 'ivr.form/:id?',
        name: 'ivr.form',
        component: load('pbx/ivr/IvrForm')
      },
      {
        path: 'queue.form/:id?',
        name: 'queue.form',
        component: load('pbx/queue/QueueForm'),
        meta: {
          title: 'Fila de atendimento'
        }
      },
      {
        path: 'queue.list',
        name: 'queue.list',
        component: load('pbx/queue/QueueList'),
        meta: {
          title: 'Lista de fila de atendimento'
        }
      },
      {
        path: 'trunk.list',
        name: 'trunk.list',
        component: load('routes/trunk/TrunkList')
      },
      {
        path: 'trunk.form/:id?',
        name: 'trunk.form',
        component: load('routes/trunk/TrunkForm')
      },
      {
        path: 'incoming.list',
        name: 'incoming.list',
        component: load('routes/incoming/IncomingList')
      },
      {
        path: 'incoming.form/:id?',
        name: 'incoming.form',
        component: load('routes/incoming/IncomingForm')
      },
      {
        path: 'planroute.list',
        name: 'planroute.list',
        component: load('routes/planroute/PlanRouteList')
      },
      {
        path: 'planroute.form/:id?',
        name: 'planroute.form',
        component: load('routes/planroute/PlanRouteForm')
      }
    ]
  }
]

export default routes
