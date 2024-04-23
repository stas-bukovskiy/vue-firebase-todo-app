<template>
  <q-page class="row justify-center q-pa-md">
    <q-card style="width: 350px;">
      <q-card-section>
        <div class="text-h6" style="text-align: center;">Login</div>
        <q-form @submit.prevent="handleLogin">
          <q-input filled v-model="email" label="Email" type="email" required />
          <q-input filled v-model="password" label="Password" type="password" required />
          <div class="q-mt-md">
            <q-btn label="Login" type="submit" color="primary" block />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section>
        <div style="text-align: center;">
          Don't have an account? <router-link to="/auth/register">Register here</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'boot/firebase'; // Ensure this is correctly set up and pathed
import { signInWithEmailAndPassword } from "firebase/auth";

const router = useRouter();
const email = ref('');
const password = ref('');

function handleLogin() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      console.log('User logged in:', userCredential.user);
      router.push('/'); // Redirect to home or dashboard page after login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error in login:', errorCode, errorMessage);
      // Optionally handle errors, e.g., display an error message
    });
}
</script>

<style scoped>
</style>
