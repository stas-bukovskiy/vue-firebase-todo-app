import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from "src/store";
import {auth} from "boot/firebase";

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

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
    const isAuthenticated = auth.currentUser;

    if (requiresAuth && !isAuthenticated) {
      next('/auth/login');
    } else if (requiresGuest && isAuthenticated) {
      next('/');
    } else {
      next();
    }
  });

  return Router
})
