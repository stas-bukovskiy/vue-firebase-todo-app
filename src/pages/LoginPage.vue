<template>
  <div>
    <q-page>
      <q-card>
        <q-card-section>
          <q-form @submit="login">
            <q-input v-model="email" label="Email" type="email" />
            <q-input v-model="password" label="Password" type="password" />
            <q-btn type="submit" label="Login" color="primary" />
            <div v-if="error" class="text-negative">{{ error }}</div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        // Redirect to home page or desired route upon successful login
        this.$router.push('/')
      } catch (error) {
        this.error = error.message
      }
    }
  }
}
</script>

<style scoped>
.text-negative {
  color: red;
}
</style>
