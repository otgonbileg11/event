import { addDoc, collection } from "firebase/firestore"

const useCollection = (collectionName) => {
   const error = ref(null)
   const { $firestore } = useNuxtApp()
   const addDocument = async (doc) => {
    error.value = null
    try {
      const docRef = await addDoc(collection($firestore, collectionName), doc)
      return docRef
    }catch(err) {
      console.log(err)
      error.value = 'Could not '
    }
   }
  return { error, addDocument }
}

export default useCollection