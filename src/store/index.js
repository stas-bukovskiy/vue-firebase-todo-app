// import { store } from 'quasar/wrappers'
// import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export default store(function (/* { ssrContext } */) {
//   const Store = createStore({
//     modules: {
//       // example
//     },
//
//     // enable strict mode (adds overhead!)
//     // for dev mode and --debug builds only
//     strict: process.env.DEBUGGING
//   })
//
//   return Store
// })

// src/store/index.js

import {auth} from "boot/firebase";
import {createStore} from 'vuex'
import {useFirebaseAuth} from "vuefire";

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async registerUser({commit}, {email, password}) {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password)
        const user = userCredential.user
        commit('setUser', user)
        return user
      } catch (error) {
        console.log('error.message: ', error.message)
        throw error
      }
    },
    async loginUser({commit}, {email, password}) {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password)
        const user = userCredential.user
        commit('setUser', user)
        return user
      } catch (error) {
        console.log('error.message: ', error.message)
        throw error
      }
    },
    async logoutUser({commit}) {
      try {
        await auth.signOut()
        commit('setUser', null)
      } catch (error) {
        console.log('error.message: ', error.message)
        throw error
      }
    },
    async handleAuthStateChanged({commit}) {
      try {
        const user = await auth.currentUser
        if(user) {
          commit('setUser', user)
        } else {
          commit('setUser', null)
        }
        commit('setUser', user)
      } catch (error) {
        console.log('error.message: ', error.message)
        throw error
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user
  }
})


