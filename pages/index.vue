<template>
  <AppHeader />
  <ContentDoc />
  <LazyHeroBanner :events="bannerEvents" />
  <Tab :events="filteredEvents" :isPending="isPending" @category="filterByCategory"/>
  <button @click="seeMore" class="text-accent my-2 font-bold bg-white p-3 rounded-md border border-accent hover:text-white hover:bg-accent dark:hover:bg-alternate dark:hover:text-accent">See more</button>
</template>

<script setup>
import {useAuthStore} from '~/store/useAuthStore'
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore'

const store = useAuthStore()

const events = ref([])
const isPending = ref(true)
const bannerEvents = computed(() => {
  return events.value.slice(0, 3)
})

const filteredEvents = ref(null)

const { $firestore } = useNuxtApp() 


const filterByCategory = async (category) => {
  if(category == '') {
    filteredEvents.value = events.value
  } else {
    filteredEvents.value = events.value.filter(event => event.category == category) 
    
  }
}

const numberOfEvents = ref(3)

function seeMore() {
  numberOfEvents.value += 3
}

watch(numberOfEvents, (newNumber, oldNumber) => {
  onSnapshot(query(collection($firestore, "events"), orderBy('createdAt','desc'), limit(newNumber)), (docs) => {
  let results = []
  docs.forEach(doc => {
    results.push({ ...doc.data(), id: doc.id })
  })
  events.value = results
  filteredEvents.value = events.value
  isPending.value = false
  });
}, {immediate: false})


onMounted(async () => {
  store.initUser()
  numberOfEvents.value += 3
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
