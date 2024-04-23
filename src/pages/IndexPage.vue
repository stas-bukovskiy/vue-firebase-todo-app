<template>
  <q-page class="main-container q-pa-md full-width items-end">
    <q-card class="q-pa-md row justify-between q-mb-lg">
      <div class="text-h5 q-mb-none q-pb-none">Your To-Do Lists</div>
      <q-btn color="primary" label="Create New List" @click="openNewListModal"/>
    </q-card>

    <div class="flex justify-between wrap">
      <div v-for="listId in listIds" :key="listId" class="list-container q-mb-md">
      <ToDoList :id="listId" :user-id="userId" :is-owner="true"/>
      </div>
    </div>

    <!-- New List Creation Modal -->
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create New Task List</div>
          <q-space/>
          <q-btn flat round icon="close" @click="closeDialog"/>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="createList">
            <q-input outlined v-model="newListTitle" label="List Title" required autofocus/>
            <div class="q-mt-md row justify-center">
              <q-btn label="Create List" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import {ref} from 'vue';
import ToDoList from '../components/ToDoList.vue';
import {useQuasar} from 'quasar';
import {db} from 'boot/firebase';
import {onValue, push, ref as dbRef} from 'firebase/database';
import { auth } from 'boot/firebase'; // Ensure this is the correct path to your Firebase config

const $q = useQuasar();
const userId = ref(auth.currentUser ? auth.currentUser.uid : null);
const listsRef = dbRef(db, 'lists/' + userId.value);
const listIds = ref([]);
const isDialogOpen = ref(false);
const newListTitle = ref('');

// Establish a real-time listener for the lists
onValue(listsRef, snapshot => {
  const val = snapshot.val();
  listIds.value = val ? Object.keys(val) : [];
  console.log('List IDs:', listIds.value);
});

function openNewListModal() {
  isDialogOpen.value = true;
}

function closeDialog() {
  isDialogOpen.value = false;
  newListTitle.value = ''; // Clear the input field when the dialog is closed
}

function createList() {
  if (newListTitle.value.trim()) {
    push(listsRef, {title: newListTitle.value, userId: userId.value})
      .then(() => {
        $q.notify({type: 'positive', message: 'List created successfully!'});
        closeDialog();
      })
      .catch(error => {
        $q.notify({type: 'negative', message: 'Failed to create list: ' + error.message});
      });
  } else {
    $q.notify({type: 'negative', message: 'List title cannot be empty.'});
  }
}
</script>


<style scoped>
.main-container {
  max-width: 95%;
  width: 95%;
}

.list-container {
  flex: 1 1 300px; /* Adjust the basis to the minimum width that a list should take before wrapping */
  margin-right: 20px; /* Add some right margin for spacing */
  margin-bottom: 20px; /* Margin bottom for spacing after wrapping */
}

/* Media Query to handle smaller screens */
@media (max-width: 600px) {
  .list-container {
    flex-basis: 100%; /* Each list takes full width on small screens */
    margin-right: 0; /* Remove right margin on small screens */
  }
}
</style>
