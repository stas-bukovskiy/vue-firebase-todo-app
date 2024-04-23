const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'auth',
        children: [
          {path: 'login', component: () => import('pages/LoginPage.vue')},
          {path: 'register', component: () => import('pages/RegisterPage.vue')},
        ]
      },
      { path: 'lists/:id', component: () => import('pages/ShareListPage.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
