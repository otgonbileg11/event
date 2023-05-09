<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div class="">
      <img :src="user.photoURL || defaultPhotoUrl" class="w-48 h-48 rounded-full"/>
      <p>{{ user.displayName || 'No user found'}}</p>
    </div>
    <div class="text-start font-bold text-2xl w-full flex gap-4 items-center">
      <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
      Events:<br />
    </div>
    <div class="grid grid-flow-col auto-cols-min my-6 gap-8 px-4 w-full auto-rows-min relative bg-slate-300 p-12 rounded-xl overflow-x-scroll">
      <v-card class="text-slate-900 h-[300px] hover:transition hover:delay-200 hover:ease-in hover:scale-110" v-for="event in events" :key="event.id">
      <NuxtLink :to="{path: `/events/${event.id}`}">
        <v-img class="align-end text-white" height="200" :src="event.image" cover>
          <v-card-title>{{ event.title }}</v-card-title>
        </v-img>
        <v-card-subtitle class="mt-4">
          {{ event.location }}
        </v-card-subtitle>
        <v-card-text>
          <p class="text-sm md:text-md">{{ event.description.length > 150 ? `${event.description.slice(0,150)} ...` : event.description}}</p>
        </v-card-text>
        <v-card-text>
          <p class="text-sm md:text-md">Created by: {{ event.userName }}</p>
        </v-card-text>
        <v-card-text>
          <p class="text-sm md:text-md">Created At: {{ event.createdAt }}</p>
        </v-card-text>
      </NuxtLink>
      </v-card>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup>
import defaultPhotoUrl from '~/assets/images/profile_default.jpg'
import { getDocs, collection, query, where, orderBy, getDoc, doc } from 'firebase/firestore'

const route = useRoute()
const events = ref([])
const { $firestore } = useNuxtApp()
console.log($firestore)

const eventSnapshot = await getDocs(query(collection($firestore, "events"), where("userId", "==", route.params.id)))
const userSnap = await getDoc(doc($firestore, "users", route.params.id))
if(!userSnap) {
  throw createError({ statusCode: 404, statusMessage: 'User not found '})
}
const user = userSnap.data()
console.log(user)
eventSnapshot.forEach((doc) => {
events.value.push(doc.data())
})


</script>