<template>
  <AppHeader />
  <ContentDoc />
  <LazyHeroBanner :events="bannerEvents" />
  <Tab :events="filteredEvents" :isPending="isPending" @category="filterByCategory"/>
</template>

<script setup>
import {useAuthStore} from '~/store/useAuthStore'
import { getDocs, collection, query, onSnapshot, where, orderBy } from 'firebase/firestore'

const store = useAuthStore()

const events = ref([])
const isPending = ref(true)
const bannerEvents = computed(() => {
  return events.value.slice(0, 3)
})

const filteredEvents = ref(null)

const { $firestore } = useNuxtApp() 

// const filterByCategory = async (category) => {
//   try {
//     events.value = []
//     let eventSnapshot
//     if(category == '') {
//       eventSnapshot = await getDocs(collection($firestore, "events"));
//     } else {
//       eventSnapshot = await getDocs(query(collection($firestore, "events"), where("location", "==", category)));
//     }
//     eventSnapshot.forEach((doc) => {
//     events.value.push(doc.data())
//     isPending.value = false
//     });
//   } catch (err) {
//     console.log(err)
//     isPending.value = false
//   } 
// }

const filterByCategory = async (category) => {
  if(category == '') {
    filteredEvents.value = events.value
  } else {
    filteredEvents.value = events.value.filter(event => event.category == category) 
    
  }
}

onMounted(async () => {
  store.initUser()
  
  onSnapshot(query(collection($firestore, "events")), (docs) => {
  let results = []
  docs.forEach(doc => {
    results.push({ ...doc.data(), id: doc.id })
  })
  events.value = results
  filteredEvents.value = events.value
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
