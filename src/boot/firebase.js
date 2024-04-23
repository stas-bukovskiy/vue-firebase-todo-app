import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD1VpPytQ4TsYGEhkLLTGE7IRwuMIEFIU0",
  authDomain: "vue-firebase-todo-app-b1969.firebaseapp.com",
  databaseURL: "https://vue-firebase-todo-app-b1969-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-firebase-todo-app-b1969",
  storageBucket: "vue-firebase-todo-app-b1969.appspot.com",
  messagingSenderId: "949999979903",
  appId: "1:949999979903:web:f6a249d85f3d40bdf05e4a"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

export { firebaseApp, firebaseAuth, db };
