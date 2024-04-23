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

import Vue from 'vue'
import Vuex from 'vuex'
import {firebaseAuth} from "boot/firebase";
import {createStore} from 'vuex'
import {resolve} from "@quasar/app-vite/lib/app-paths";

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
    registerUser({commit}, {email, password}) {
      firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(response => {
          commit('setUser', response.user)
          // console.log('response: ', response)
          return response.user
        })
        .catch(error => {
          console.log('error.message: ', error.message)
        })
    },
    async loginUser({commit}, {email, password}) {
      firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(response => {
          commit('setUser', response.user)
          // console.log('response: ', response)
          return response.user
        })
        .catch(error => {
          console.log('error.message: ', error.message)
        })
    },
    async logoutUser({commit}) {
      firebaseAuth.signOut()
        .then(() => {
          commit('setUser', null)
        })
        .catch(error => {
          console.log('error.message: ', error.message)
        })
    },
    async handleAuthStateChanged({commit}) {
      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          commit('setUser', user)
          resolve(user)
        } else {
          commit('setUser', null)
        }
      })
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user
  }
})


