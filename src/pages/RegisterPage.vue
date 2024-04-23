<template>
  <q-page class="flex justify-center items-center" style="height: 100vh;">
    <q-card style="width: 500px;" class=" q-pa-lg q-ma-lg">
      <q-card-section>
        <div class="text-h5 q-mb-md" style="text-align: center;">Register a new account</div>
        <q-form @submit.prevent="handleRegister">
          <q-input outlined v-model="email" label="Email" type="email" required class="q-mb-md"/>
          <q-input outlined v-model="password" label="Password" type="password" required class="q-mb-md"/>
          <div class="q-mt-md row justify-center">
            <q-btn label="Register" type="submit" color="primary" block />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section>
        <div style="text-align: center;">
          Already have an account? <router-link to="/auth/login">Login here</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'boot/firebase'; // Adjust the path based on your project structure
import { createUserWithEmailAndPassword } from "firebase/auth";

const router = useRouter();
const email = ref('');
const password = ref('');

function handleRegister() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      console.log('User registered:', userCredential.user);
      router.push('/auth/login'); // Redirect to home or another page after registration
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error in registration:', errorCode, errorMessage);
      // Optionally handle errors, e.g., display an error message
    });
}
</script>

<style scoped>
</style>
