<template>
  <div class="full-width todo-list">
    <q-card class="q-pa-md">
      <div class="row justify-between items-end">
        <div class="text-h6 q-mb-none">{{ title }}</div>
        <div class="q-gutter-sm" v-if="isOwner">
          <q-btn outline label="Copy Share Link" icon="content_copy" @click="copyShareLink"/>
          <q-btn outline label="Delete List" color="negative" @click="deleteList(listId)"/>
        </div>
      </div>
      <q-separator class="q-my-lg"/>
      <div class="q-gutter-sm">
        <div v-for="task in tasks" :key="task.id" class="q-mb-sm">
          <q-checkbox v-model="task.done" :label="task.description" @update:model-value="updateTask(task)"/>
        </div>
        <div class="row justify-center">
          <q-btn color="secondary" label="Create New Task" icon="add" @click="openNewTaskModal"/>
        </div>
      </div>
    </q-card>

    <!-- New Task Modal -->
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create New Task</div>
          <q-space/>
          <q-btn flat round icon="close" @click="closeDialog"/>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="addNewTask">
            <q-input outlined v-model="newTaskDescription" label="Task Title" required autofocus/>
            <div class="q-mt-md row justify-center">
              <q-btn label="Add Task" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useQuasar} from 'quasar';
import {db} from 'boot/firebase';
import {onValue, push, ref as dbRef, remove, update} from 'firebase/database';

const props = defineProps({
  id: String,
  userId: String,
  isOwner: {
    type: Boolean,
    default: false
  }
})

const $q = useQuasar();
const title = ref('');
const isDialogOpen = ref(false);
const newTaskDescription = ref('');
const tasks = ref([]);
const listId = props.id;
const userId = props.userId;
const listRef = dbRef(db, 'lists/' + userId + '/' + listId);
const taskRef = dbRef(db, 'tasks/' + listId);

// Listen to tasks changes
onValue(taskRef, snapshot => {
  const val = snapshot.val();
  tasks.value = val ? Object.keys(val).map(key => ({id: key, ...val[key]})) : [];
});

function copyShareLink() {
  const url = window.location.href + "share/" + encodeURIComponent(userId) + "/" + encodeURIComponent(listId);
  navigator.clipboard.writeText(url)
    .then(() => $q.notify({type: 'positive', message: 'Link copied to clipboard!'}))
    .catch(() => $q.notify({type: 'negative', message: 'Failed to copy link.'}));
}

function openNewTaskModal() {
  isDialogOpen.value = true;
}

function closeDialog() {
  isDialogOpen.value = false;
  newTaskDescription.value = ''; // Clear the input field when the dialog is closed
}

function addNewTask() {
  if (newTaskDescription.value.trim()) {
    const newTaskRef = push(taskRef);
    update(newTaskRef, {description: newTaskDescription.value, done: false})
      .catch(error => {
        $q.notify({type: 'negative', message: 'Failed to add task: ' + error.message});
      });
  } else {
    $q.notify({type: 'negative', message: 'Task description cannot be empty.'});
  }
}

function updateTask(task) {
  console.log("Updating task:", task.id, "Done status:", task.done);
  const taskUpdateRef = dbRef(db, `tasks/${listId}/${task.id}`);
  update(taskUpdateRef, {done: task.done})
    .catch(error => {
      console.error("Failed to update task:", error);  // More detailed error logging
      $q.notify({type: 'negative', message: 'Failed to update task: ' + error.message});
    });
}

function deleteList(listId) {
  const listToDeleteRef = dbRef(db, `lists/${userId}/${listId}`);
  console.log('Deleting list:', `lists/${props.userId}/${listId}`);
  remove(listToDeleteRef)
    .catch(error => $q.notify({ type: 'negative', message: 'Failed to delete list: ' + error.message }));
}

// Listen to list title and tasks changes
onMounted(() => {
  console.log('Listening to list data:', `lists/${userId}/${listId}`)
  onValue(listRef, snapshot => {
    const val = snapshot.val();
    console.log('List data:', val);
    if (val) {
      title.value = val.title || 'Unnamed List'; // Set title
    } else {
      title.value = 'Unnamed List';
    }
  });
});
</script>

<style scoped>
.todo-list {
  min-width: 600px;
  margin: 0 auto;
}
</style>
