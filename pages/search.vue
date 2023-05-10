<template>
  <div class="flex flex-col items-center">
    <div class="flex items-center border-2 p-4 mt-10 w-1/2 text-xl rounded-full dark:border-gray-500 hover:border-primary dark:hover:border-alternate">
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
        class="ml-2 bg-transparent w-[100px] lg:w-[400px] focus:outline-none dark:text-slate-200"
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
      />
    </div>
    <Tab />
  </div>
</template>