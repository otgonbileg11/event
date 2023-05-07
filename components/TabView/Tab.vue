<template>
  <div class="w-full py-16">
  <v-app class="bg-slate-200 dark:bg-slate-700 relative">
    <v-card class="dark:bg-slate-300">
      <v-tabs align-tabs="center">
        <v-tab :value="1">Art & Culture</v-tab>
        <v-tab :value="2">Fitness</v-tab>
        <v-tab :value="3">Self-Development</v-tab>
        <v-tab :value="4">Health & Wellness</v-tab>
        <v-tab :value="5">Fashion</v-tab>
        <v-tab :value="6">Music</v-tab>
        <v-tab :value="7">Food & Drink</v-tab>
        <v-tab :value="8">Beauty</v-tab>
      </v-tabs>
    </v-card>
    <v-progress-circular
        v-if="isPending"
        :size="70"
        class="text-[#fbda03] absolute top-1/2 left-1/2"
        indeterminate
      ></v-progress-circular>
    <div class="grid grid-cols-3 my-6 gap-8 px-4 h-full w-full auto-rows-min relative">
      <v-card class="text-slate-900" v-for="event in events" :key="event.id">
        <v-img class="align-end text-white" height="200" :src="event.image" cover>
          <v-card-title>{{ event.title }}</v-card-title>
        </v-img>
        <v-card-subtitle class="mt-4">
          {{ event.location }}
        </v-card-subtitle>
        <v-card-text>
          <p class="text-sm md:text-md">{{ event.description.length > 150 ? `${event.description.slice(0,150)} ...` : event.description}}</p>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
  </div>
</template>

<script setup>

// const tab = ref(null)
const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  isPending: {
    type: Boolean,
    required: true
  }
})

</script>