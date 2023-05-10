<template>
  <div class="min-h-screen">
    <AppHeader />
    <div v-if="error">{{ error }}</div>
    <div v-if="document">
      <div class="overflow-hiiden min-h-[600px] max-h-[800px] relative">
          <img :src="document.image" class="object-cover min-h-[600px] max-h-[900px] w-full"/>
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 px-12 py-6 -translate-y-1/2 bg-white rounded-2xl">
            <img :src="document.image" class="w-full py-4" />
            <p class="py-2 font-bold text-xl">{{ document.title }}</p>
            <p>{{ document.description }}</p>
            <p class="py-2">Don't miss out, <span class="text-accent font-bold text-xl">{{ document.going || 0 }}</span> people is planning to go</p>
            <div class="flex flex-col md:flex-row w-full justify-between">
              <p class="py-5"> Hosted By: <NuxtLink :to="{path: `/profile/${document.userId}`}"><span class="font-bold text-accent">{{ document.userName }}</span></NuxtLink></p>
              <div class="flex gap-8">
              <button class="rounded-full border-4 border-red flex p-2 w-16 h-16 justify-center items-center" >
                <svg class="w-4 h-4 fill-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
              </button>
              <button :disabled="isPending || clicked" @click="handleGoing" :class="[ clicked ? 'bg-green-700' : 'bg-slate-100' ]" class="rounded-full p-2 border-4 w-16 h-16 flex justify-center items-center border-green-600">
                <svg class="w-4 h-4 fill-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
              </button>
              </div>
            </div>
            <div v-if="ownership && !isPending" @click="handleDelete" class="w-full py-2 mt-5 text-center font-bold text-slate-200 rounded-xl cursor-pointer bg-red">Delete Event</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/useAuthStore"

  const route = useRoute()
  const router = useRouter()
  const { error, document } = getDocument('events', route.params.id)

  const store = useAuthStore()
  const user = store.userProfile
  const ownership = computed(() => {
    return document.value && user.id == document.value.userId
  })

  const { isPending, deleteDocument, incrementNumber } = useDocument('events', route.params.id)
  const { deleteImage } = useStorage()
  const clicked = ref(false)

  async function handleDelete() {
    await deleteImage(document.value.filePath)
    await deleteDocument()
    router.push({path: '/'})
  }

  async function handleGoing() {
    await incrementNumber()
    clicked.value = true
  }
</script>