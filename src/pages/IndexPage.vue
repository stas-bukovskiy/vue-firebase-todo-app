<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Your To-Do Lists</div>
    <div class="q-mb-md">
      <q-btn color="primary" label="Create New List" @click="openNewListModal"/>
    </div>
    <div v-for="listId in listIds" :key="listId">
      <ToDoList :id="listId" :user-id="userId"/>
    </div>

    <!-- New List Creation Modal -->
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create New Task List</div>
          <q-space/>
          <q-btn flat round icon="close" @click="closeDialog"/>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="createList">
            <q-input filled v-model="newListTitle" label="List Title" required autofocus/>
            <div class="q-mt-md">
              <q-btn label="Create List" type="submit" color="primary" class="full-width"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import {onMounted, ref} from 'vue';
import ToDoList from '../components/ToDoList.vue';
import {useQuasar} from 'quasar';
import {db} from 'boot/firebase';
import {onValue, push, ref as dbRef} from 'firebase/database';

const $q = useQuasar();
const userId = 'user_id_here';  // Replace with actual logic to fetch user ID
const listsRef = dbRef(db, 'lists/' + userId);
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
    push(listsRef, {title: newListTitle.value, userId})
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
.q-page {
  max-width: 800px;
  margin: auto;
}
</style>
