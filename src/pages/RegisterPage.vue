<template>
  <div>
    <q-page>
      <q-card>
        <q-card-section>
          <q-form @submit="register">
            <q-input v-model="email" label="Email" type="email" />
            <q-input v-model="password" label="Password" type="password" />
            <q-btn type="submit" label="Register" color="primary" />
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
    async register() {
      try {
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password
        })
        // Redirect to home page or desired route upon successful registration
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
