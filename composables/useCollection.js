import { addDoc, collection, doc, setDoc } from "firebase/firestore"

const useCollection = (collectionName) => {
   const error = ref(null)
   const { $firestore } = useNuxtApp()
   const addDocument = async (document) => {
    error.value = null
    try {
      const docRef = await addDoc(collection($firestore, collectionName), document)
      return docRef
    }catch(err) {
      console.log(err)
      error.value = 'Could not '
    }
   }
   const addUserDoc = async (id, document) => {
    console.log(id, document)
    error.value = null
    try {
      const docRef = await setDoc(doc($firestore, collectionName, id), document)
      return docRef
    }catch(err) {
      console.log(err)  
      error.value = 'Could not added user to database'
    }
   }
  return { error, addDocument, addUserDoc }
}

export default useCollection