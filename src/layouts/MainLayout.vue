<template>
  <q-header bordered class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>
        Warehouser
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left">
      <div class="flex justify-between full-width">
        <div class="row">
          <q-route-tab v-if="!isAuthenticated" to="/auth/login" label="Login"/>
          <q-route-tab v-if="!isAuthenticated" to="/auth/register" label="Register"/>
        </div>
        <div class="row">
          <q-tab v-if="isAuthenticated" class="text-right" disable>{{ getUserEmail }}</q-tab>
          <q-tab v-if="isAuthenticated" label="Logout" @click="logout"/>
        </div>
      </div>
    </q-tabs>
    <q-tabs align="right">
    </q-tabs>
  </q-header>

  <q-page-container>
    <router-view/>
  </q-page-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'getUserEmail']),
  },
  methods: {
    ...mapActions('user', ['clearUser']),
    logout() {
      this.clearUser();
      this.$router.push('/auth/login');
    }
  }
};
</script>

<style>

</style>
