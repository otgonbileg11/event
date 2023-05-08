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
            <p class="py-12 text-red"> Hosted By {{ document.userName }}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute()
  const { error, document } = getDocument('events', route.params.id)
</script>