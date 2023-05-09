import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: 'storeAuth',
  state: () => {
    return {
      user: {
        id: '',
        email: '',
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
    async createUser (email, password, displayName, photoURL) {
      const { $auth } = useNuxtApp();
      try {
        const userCredential = await createUserWithEmailAndPassword($auth, email, password)
        await updateProfile($auth.currentUser,{ displayName, photoURL })
        return userCredential
      } catch (err) {
        console.log(err)
      }
      
    },
    async signInUser (email, password) {
      const { $auth } = useNuxtApp();
      await signInWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
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
          console.log(this.user)
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