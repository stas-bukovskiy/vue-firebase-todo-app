<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md row q-mb-lg items-center">
      <q-btn flat round icon="arrow_back" @click="goBack" class="q-mr-md" />
      <div class="text-h5 q-mb-none q-pb-none">Shared To-Do List</div>
    </q-card>

    <!-- Conditionally render ToDoList or a banner -->
    <div v-if="listExists">
      <ToDoList :user-id="userId" :id="listId" />
    </div>
    <div v-else>
      <q-banner class="bg-negative text-white">
        This list is no longer available.
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import ToDoList from '../components/ToDoList.vue';
import {db} from 'boot/firebase';
import {ref as dbRef, onValue} from 'firebase/database';

const route = useRoute();
const router = useRouter();
const userId = ref(route.params.userId);
const listId = ref(route.params.listId);
const listExists = ref(true); // State to track if the list exists

// Check if the list exists
const listRef = dbRef(db, `lists/${userId.value}/${listId.value}`);
onMounted(() => {
  onValue(listRef, snapshot => {
    listExists.value = snapshot.exists();
  });
});

function goBack() {
  router.push({name: 'IndexPage'}); // Ensure this route name is correct in your router configuration
}
</script>

<style scoped>
.q-page {
  width: 800px;
  margin: auto;
}
</style>
