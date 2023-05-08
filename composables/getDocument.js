import { collection, doc, onSnapshot, query } from "firebase/firestore"

const getDocument = (collectionName, id) => {
  const error = ref(null)
  const { $firestore } = useNuxtApp()
  const document = ref([])

  const unsub = onSnapshot(doc($firestore, collectionName, id), (doc) => {
    if(doc.data()) {
       document.value = {...doc.data(), id: doc.id}
       error.value = null
    } else {
      error.value = 'that document does not exist'
    }
  }, err => {
    console.log(err.message)
    document.value = null
    error.value = 'could not fetch the data'
  })
  return { error, document }
}

export default getDocument