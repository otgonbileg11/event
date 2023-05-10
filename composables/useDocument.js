import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore"


const useDocument = (collectionName, id) => {
  const error = ref(null)
  const isPending = ref(false)
  const { $firestore } = useNuxtApp()


  const deleteDocument = async () => {
    isPending.value = true
    error.value = null

    try {
      await deleteDoc(doc($firestore, collectionName, id))
      isPending.value = false
    } catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'Could not delete the document'
    }
  }
  const incrementNumber = async () => {
    isPending.value = true
    error.value = null
    try {
      await updateDoc(doc($firestore, collectionName, id), {
        going: increment(1)
      })
    } catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'Could not update'
    }
  } 

  return { error, isPending, deleteDocument, incrementNumber }
}

export default useDocument
