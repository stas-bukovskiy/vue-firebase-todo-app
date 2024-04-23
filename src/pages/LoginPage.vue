<template>
  <q-page class="flex justify-center items-center" style="height: 100vh;">
    <q-card style="width: 500px;" class=" q-pa-lg q-ma-lg">
      <q-card-section>
        <div class="text-h5 q-mb-md" style="text-align: center;">Login to your account</div>
        <q-form @submit.prevent="handleLogin">
          <q-input outlined v-model="email" label="Email" type="email" required class="q-mb-md"/>
          <q-input outlined v-model="password" label="Password" type="password" required class="q-mb-md"/>
          <div class="q-mt-md row justify-center">
            <q-btn label="Login" type="submit" color="primary" block size="md" />
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
