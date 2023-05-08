<template>
  <Menu>
    <MenuButton @click="active = !active"
      ><img class="profile-button" :src="user.photoUrl || defaultPhotoUrl"
    /><v-tooltip v-if="user.email" activator="parent" location="bottom">{{ user.displayName || user.email }}</v-tooltip></MenuButton>
    <MenuItems
      class="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-2xl bg-transparent shadow-lg focus:outline-none"
    >
      <MenuItem v-for="link in links" :key="link.href" as="template" v-slot="{ active }" class="flex flex-col px-1 py-1">
        <button v-if="link.label == 'Sign out'" @click="handleSignOut" :class="{'bg-accent text-white w-full': active, 'w-full bg-white text-black': !active, }">
          {{ link.label }}
        </button>
        <NuxtLink v-else :to="link.href" :class="{ 'bg-accent text-white': active, 'bg-white text-black': !active, }">
          {{ link.label }}
        </NuxtLink>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import defaultPhotoUrl from '~/assets/images/profile_default.jpg'

const active = ref(false);
const links = [
  { href: "/profile", label: "Profile" },
  { href: "#", label: "Support" },
  { href: "#", label: "License" },
  { href: "/sign-out", label: "Sign out" },
];

const store = inject('store')
const user = store.userProfile


function handleSignOut() {
  store.logout()
}

</script>
