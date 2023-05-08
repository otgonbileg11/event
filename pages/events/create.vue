<template>
  <CreateForm />
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })

</script>