<template>
  <AppHeader />
  <ContentDoc />
  <LazyHeroBanner />
  <Tab :events="events" :isPending="isPending"/>
</template>

<script setup>
import {useAuthStore} from '~/store/useAuthStore'
import { getDocs, collection, query, onSnapshot, where } from 'firebase/firestore'

const store = useAuthStore()
provide('store', store)

const events = ref([])
const isPending = ref(true)
const category = ref('')

const { $firestore } = useNuxtApp() 

onMounted(async () => {
  store.initUser()

  onSnapshot(query(collection($firestore, "events"), where("location", "==", "Ulaanbaatar")), (docs) => {
    let results = []
    docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })
    events.value = results
    isPending.value = false
    });
})

//   try {
//     const eventSnapshot = await getDocs(collection($firestore, "events"));
//     eventSnapshot.forEach((doc) => {
//     events.value.push(doc.data())
//     isPending.value = false
//     });
//   } catch (err) {
//     console.log(err)
//     isPending.value = false
//   }

//   const userSnapshot = await getDocs(collection($firestore, "users"));
//   userSnapshot.forEach((doc) => {
//   });
// })

</script>
