<template>
  <Menu>
    <MenuButton @click="active = !active"
      ><img class="profile-button" :src="user.photoUrl || defaultPhotoUrl"
    /><v-tooltip v-if="user.email" activator="parent" location="bottom">{{ user.displayName || user.email }}</v-tooltip></MenuButton>
    <MenuItems
      class="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-2xl bg-transparent shadow-lg focus:outline-none"
    >
      <MenuItem as="template" v-slot="{ active }" class="flex flex- col px-1 py-1"> 
        <NuxtLink :to="{path: `profile/${user.id}`}" :class="{ 'bg-accent text-white': active, 'bg-white text-black': !active, }">Profile</NuxtLink>
      </MenuItem>
      <MenuItem as="template" v-slot="{ active }" class="flex flex- col px-1 py-1"> 
        <button @click="handleSignOut" :class="{'bg-accent text-white w-full': active, 'w-full bg-white text-black': !active, }">
          Sign Out
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import defaultPhotoUrl from '~/assets/images/profile_default.jpg'
import { useAuthStore } from "~/store/useAuthStore";

const active = ref(false)

const store = useAuthStore()
const user = store.userProfile

function handleSignOut() {
  store.logout()
}

</script>
