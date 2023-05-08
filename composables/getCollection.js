import { collection, onSnapshot, query } from "firebase/firestore"

const getCollection = (collectionName) => {
  const error = ref(null)
  const { $firestore } = useNuxtApp()
  const documents = ref([])

  const unsub = onSnapshot(query(collection($firestore, collectionName)), (docs) => {
    let results = []
    docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })
    documents.value = results
    error.value = null
  })

  return { error, documents }
}

export default getCollection