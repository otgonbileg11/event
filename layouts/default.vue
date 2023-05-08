<template>
  <div
    id="app"
    class="bg-white dark:bg-black"
  >
      <slot />
      <DarkmodeDarkModeToggle/>
      <AppFooter />
  </div>
</template>

<script setup>
// import { useAuthStore } from "~/store/useAuthStore"

// const store = useAuthStore()
// store.initUser()
</script>

