import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {

    const createHistory = createWebHistory;

    const Router = createRouter({
      scrollBehavior: () => ({ left: 0, top: 0 }),
      routes,
      history: createHistory(process.env.VUE_ROUTER_BASE)
    });

    return Router;
  Router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['user/isAuthenticated']; // Assume you have an isAuthenticated getter in your auth module

    if (!to.path.startsWith('/auth') && !isAuthenticated) {
      next('/auth/login'); // Redirect to the login page if the user is not authenticated
    } else {
      next(); // Proceed to the route
    }
  });

  return Router
})
