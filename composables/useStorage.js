import { useAuthStore } from "~/store/useAuthStore"

const store = useAuthStore
const user = store.userProfile

const useStorage = () => {
  const { $storage } = useNuxtApp()
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `events/${user.id}/${file.name}`
    const storageRef = $storage.ref(filePath.value)
    
    try {
      const res = await storageRef.put(file)
      url.value = res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage }
} 

export default useStorage