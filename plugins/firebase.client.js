// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default defineNuxtPlugin(nuxtApp => {
  // const config = useRuntimeConfig()
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyDD5pu1TyJqwxqejE6xCyTXZLgqgqIjeUM',
    authDomain: "event-manager-d1666.firebaseapp.com",
    projectId: "event-manager-d1666",
    storageBucket: "event-manager-d1666.appspot.com",
    messagingSenderId: "627116643927",
    appId: "1:627116643927:web:f0d91c54bab65badb9f512"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  // nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)

  // nuxtApp.vueApp.provide('firestore', firestore)
  nuxtApp.provide('firestore', firestore)

  nuxtApp.provide('storage', storage)
})