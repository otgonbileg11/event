import { useAuthStore } from "~/store/useAuthStore"
import { ref as fref, uploadBytes, getDownloadURL } from 'firebase/storage'

const store = useAuthStore()
const user = store.userProfile

const useStorage = () => {
  const { $storage } = useNuxtApp()
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `events/${user.id}/${file.name}`
    const storageRef = fref($storage, filePath.value)
    
    try {
      const res = await uploadBytes(storageRef, file)
      url.value = await getDownloadURL(storageRef)
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage }
} 

export default useStorage