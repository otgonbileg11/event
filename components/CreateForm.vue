<template>
  <div class="h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 dark:bg-slate-900">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 rounded-3xl sm:p-10 shadow-md">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">+</div>
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">Create an Event</h2>
              <p class="text-sm text-gray-500 font-normal leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="flex flex-col">
                <label class="leading-loose">Event Title</label>
                <input v-model="title" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title">
              </div>
              <div class="flex flex-col">
                <!-- <label class="leading-loose">Event Image</label> -->
                <!-- <input type="file" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event image"> -->
                  <div class="grid grid-cols-1 space-y-2">
                        <label class="leading-loose">Attach Image</label>
                        <div class="flex items-center justify-center w-full">
                            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div class="h-full w-full text-center flex flex-col items-center justify-center cursor-pointer">
                                    <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image">
                                    </div>
                                    <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /> or <span class="text-blue-600 hover:underline">select a file</span> from your computer</p>
                                </div>
                                <input type="file" @change="handleChange" class="hidden">
                            </label>
                        </div>
                        <div class="text-red">{{ fileError }}</div>
                  </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex flex-col">
                  <label class="leading-loose">Start</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400">
                    <input v-model="startTime" type="date" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
                    <div class="absolute left-3 top-2">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose">Location</label>
                  <div class="relative focus-within:text-gray-600 text-gray-400">
                    <input v-model="location" type="text" class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020">
                    <div class="absolute left-3 top-2">
                      <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <label class="leading-loose">Event Description</label>
                <input v-model="description" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Description">
              </div>
            </div>
            <div class="pt-4 flex items-center space-x-4">
                <button @click="handleCreate" v-if="!isPending" class="bg-slate-800 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                <button v-else disabled class="bg-slate-800 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Saving...</button>
            </div>
            <div class="w-full text-center py-4 text-accent"><NuxtLink to="/">Go Back</NuxtLink></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { serverTimestamp } from "firebase/firestore"
import { useAuthStore } from "~/store/useAuthStore"

  const { filePath, url, uploadImage } = useStorage()
  const { error, addDocument } = useCollection('events')

  const router = useRouter()

  const store = useAuthStore()
  const user = store.userProfile
  const isPending = ref(false)

  const types = ['image/png', 'image/jpeg']
  const title = ref('')
  const file = ref(null)
  const fileError = ref(null)
  const startTime = ref(null)
  const location = ref('')
  const description = ref('')

  async function handleCreate() {
     if(file.value) {
      isPending.value = true
      await uploadImage(file.value)
      const docRef = await addDocument({
        title: title.value,
        startTime: startTime.value,
        description: description.value,
        userId: user.id,
        userName: user.displayName,
        image: url.value,
        filePath: filePath.value,
        location: location.value,
        category: [],
        createdAt: serverTimestamp()
      })
      if(!error.value) {
        console.log('event added')
        router.push({ path: `/events/${docRef.id}`})
      }
    }
  }

  function handleChange(e) {
    const selectedFile = e.target.files[0]
    console.log(selectedFile)
    if(selectedFile && types.includes(selectedFile.type)) {
      file.value = selectedFile
      console.log(file.value)
      fileError.value = null
    }
    else {
      file.value = null
      fileError.value = 'Please select an image file (png or jpg)'
    }
  }
</script>


<style scoped>
  .has-mask {
    position: absolute;
		clip: rect(10px, 150px, 130px, 10px);
  }
</style>