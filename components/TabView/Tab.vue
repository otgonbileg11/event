<template>
  <div class="w-full pt-16 ">
  <v-app class="bg-slate-200 dark:bg-slate-700 relative">
    <v-card class="dark:bg-slate-300">
      <v-tabs align-tabs="center">
        <v-tab @click="$emit('category', '')" :value="1">All categories</v-tab>
        <v-tab @click="$emit('category', 'Art & Culture')" :value="2">Art & Culture</v-tab>
        <v-tab @click="$emit('category', 'Fitness')" :value="3">Fitness</v-tab>
        <v-tab @click="$emit('category', 'Self-Development')" :value="4">Self-Development</v-tab>
        <v-tab @click="$emit('category', 'Health & Wellness')" :value="5">Health & Wellness</v-tab>
        <v-tab @click="$emit('category', 'Fashion')" :value="6">Fashion</v-tab>
        <v-tab @click="$emit('category', 'Music')" :value="7">Music</v-tab>
        <v-tab @click="$emit('category', 'Food & Drink')" :value="8">Food & Drink</v-tab>
        <v-tab @click="$emit('category', 'Beauty')" :value="9">Beauty</v-tab>
      </v-tabs>
    </v-card>
    <v-progress-circular
        v-if="isPending"
        :size="70"
        class="text-[#fbda03] absolute top-1/2 left-1/2"
        indeterminate
      ></v-progress-circular>
    <div class="grid grid-cols-3 my-6 gap-8 px-4 h-full w-full auto-rows-min relative">
      <v-card class="text-slate-900 hover:transition hover:delay-200 hover:ease-in hover:scale-110" v-for="event in events" :key="event.id">
      <NuxtLink :to="{path: `/events/${event.id}`}">
        <v-img class="align-end text-white" height="200" :src="event.image" cover>
          <v-card-title>{{ event.title }}</v-card-title>
        </v-img>
        <v-card-subtitle class="mt-4">
          {{ event.location }}
        </v-card-subtitle>
        <v-card-subtitle class="mt-4">
          {{ event.startTime }}
        </v-card-subtitle>
        <v-card-text>
          <p class="text-sm md:text-md">{{ event.description.length > 150 ? `${event.description.slice(0,150)} ...` : event.description}}</p>
        </v-card-text>
        <v-card-text>
          <p class="text-sm md:text-md">Created by: {{ event.userName }}</p>
        </v-card-text>
        <v-card-text>
          <p class="text-sm md:text-md">Created At: {{ event.createdAt.toDate().toUTCString() }}</p>
        </v-card-text>
      </NuxtLink>
      </v-card>
    </div>
  </v-app>
  </div>
</template>

<script setup>

// const tab = ref(null)
const props = defineProps({
  events: {
    required: true
  },
  isPending: {
    type: Boolean,
    required: true
  }
})

</script>