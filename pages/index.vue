<template>
  <AppHeader />
  <ContentDoc />
  <LazyHeroBanner />
  <Tab :events="events" :isPending="isPending" @category="filterByCategory"/>
</template>

<script setup>
import {useAuthStore} from '~/store/useAuthStore'
import { getDocs, collection, query, onSnapshot, where, orderBy } from 'firebase/firestore'

const store = useAuthStore()

const events = ref([])
const isPending = ref(true)


const { $firestore } = useNuxtApp() 

const filterByCategory = async (category) => {
  try {
    events.value = []
    let eventSnapshot
    if(category == '') {
      eventSnapshot = await getDocs(collection($firestore, "events"));
    } else {
      eventSnapshot = await getDocs(query(collection($firestore, "events"), where("location", "==", category), orderBy('createdAt')));
    }
    eventSnapshot.forEach((doc) => {
    events.value.push(doc.data())
    isPending.value = false
    });
  } catch (err) {
    console.log(err)
    isPending.value = false
  } 
}

onMounted(async () => {
  store.initUser()
  onSnapshot(query(collection($firestore, "events"), orderBy('createdAt')), (docs) => {
    let results = []
    docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })
    events.value = results
    console.log(events.value)    
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
