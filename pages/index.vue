<template>
  <AppHeader />
  <LazyHeroBanner />
  <Tab />
</template>

<script setup>
import {useAuthStore} from '~/store/useAuthStore'
import {collection, addDoc} from 'firebase/firestore'

const store = useAuthStore()
provide('store', store)

const { $firestore } = useNuxtApp() 

onMounted(async () => {
  store.initUser()

})
</script>