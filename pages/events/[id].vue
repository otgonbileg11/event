<template>
  <div class="min-h-screen">
    <AppHeader />
    <div v-if="error">{{ error }}</div>
    <div v-if="document">
      <div class="overflow-hidden relative">
          <div class="w-full max-h-[800px]">
            <img :src="document.image"/>
          </div>
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 px-12 py-6 -translate-y-1/2 bg-white rounded-2xl">
            <img :src="document.image" class="w-full py-4" />
            <p class="py-2 font-bold text-xl">{{ document.title }}</p>
            <p>{{ document.description }}</p>
            <p class="py-5 text-red"> Hosted By {{ document.userName }}</p>
            <div class="flex gap-10">
              <button class="rounded-full p-4 border-2 border-red">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
              </button>
              <button class="rounded-full p-4 border-2 border-green-600">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
              </button>
            </div>
            <div @click="handleDelete" class="w-full py-2 mt-5 text-center font-bold text-slate-200 rounded-xl cursor-pointer bg-red">Delete Event</div>
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

  const { deleteDocument } = useDocument('events', route.params.id)
  const { deleteImage } = useStorage()

  async function handleDelete() {
    await deleteImage(document.value.filePath)
    await deleteDocument()
    router.push({path: '/'})
  }
</script>