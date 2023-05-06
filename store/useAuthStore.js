import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: 'storeAuth',
  state: () => {
    return {
      user: {
        id: '',
        email: '',
        photoUrl: '',
        displayName: ''
      }
    }
  },
  getters: {
    isUser: (state) => {
      return !!state.user.id
    },
    userProfile: (state) => {
      return state.user
    }
  },
  actions: {
    async createUser (email, password) {
      const { $auth } = useNuxtApp();
      const router = useRouter()
      await createUserWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
          router.replace({ path: "/" })
        })
    },
    async signInUser (email, password) {
      const { $auth } = useNuxtApp();
      const router = useRouter()
      await signInWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
          router.replace({ path: "/" })
        })
    }
    ,
    async logout() {
      const { $auth } = useNuxtApp();
      const router = useRouter()
      await signOut($auth)
      router.replace({path: "/auth/login"})
      this.user.email = ''
      this.user.id = ''
    },
    initUser() {
      const { $auth } = useNuxtApp();
      onAuthStateChanged($auth, (user) => {
      if (user) {
        this.user.id = user.uid
        this.user.email = user.email
        this.user.photoUrl = user.photoURL
        this.user.displayName = user.displayName
        console.log(this.user.id)
      } else {
        this.user.email = ''
        this.user.id = ''
        this.user.photoUrl = ''
        this.user.displayName = ''
        console.log(this.user)
      }
});
    }    
  }
})