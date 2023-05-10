<template>
  <header class="app-header">
    <nav class="flex justify-between gap-1 w-full py-6 items-center bg-slate-100 dark:bg-slate-900">
      <NuxtLink to="/"><h1 class="logo">イベントハッケン</h1></NuxtLink>
      <div class="flex items-center border-2 p-1 rounded-full dark:border-gray-500 hover:border-primary dark:hover:border-alternate">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 pt-0.5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            class="ml-2 bg-transparent w-[150px] xl:w-[400px] focus:outline-none dark:text-slate-200"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
      <div class="flex items-center">
        <ul class="flex items-center space-x-4 relative">
          <li>
            <NuxtLink to="/events/create">
              <svg class="md:hidden w-5 fill-accent dark:fill-slate-200 hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
              <span class="hidden md:block font-semibold text-accent dark:text-slate-200 hover:text-primary dark:hover:text-alternate">Create</span>
            </NuxtLink>
          </li>
          <li v-show="!isLoggedIn">
            <NuxtLink to="/auth/login">
              <svg class="md:hidden w-5 fill-accent hover:fill-primary dark:fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
              <span class="hidden md:block font-semibold text-accent dark:text-slate-200 hover:text-primary dark:hover:text-alternate">Login</span>
            </NuxtLink>
          </li>
          <li>
            <svg class="w-5 fill-accent dark:fill-slate-200 hover:fill-primary dark:hover:fill-alternate cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
          </li>
          <li>
            <ProfileMenu />
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/store/useAuthStore';

const store = useAuthStore()
const isLoggedIn = store.isUser

</script>
