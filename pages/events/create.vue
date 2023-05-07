<template>
  <CreateForm />
</template>

<script setup>
  definePageMeta({
    middleware: ['auth']
  })

  const handleChange = (e) => {
    const selected = e.target.files[0]
    console.log(selected)
  }
</script>