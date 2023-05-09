<template>
  <LoginRegisterForm @signup="handleSignUp" @login="handleLogin" :signupform="signupform" :loginform="loginform" :error="error"/>
</template>

<script setup>
import LoginRegisterForm from '~/components/auth/LoginRegisterForm.vue';
import {useAuthStore} from '~/store/useAuthStore'

const signupform = ref({
  email: '',
  password: '',
  displayName: ''
})

const loginform = ref({
  email: '',
  password: ''
})

const error = ref(null)

const store = useAuthStore()
const { addUserDoc } = useCollection('users')
const router = useRouter()

async function handleSignUp() {
  const photoURL = 'https://xsgames.co/randomusers/avatar.php?g=pixel'
  try {
    const credential = await store.createUser(signupform.value.email, signupform.value.password, signupform.value.displayName, photoURL)
    console.log(credential)
    const docRef = await addUserDoc(credential.user.uid, {
      displayName: signupform.value.displayName,
      email: signupform.value.email,
      photoURL: photoURL
    })
    console.log(docRef)
    signupform.value = {
      email: '',
      password: '',
      displayName: ''
    }
    router.replace({ path: "/" })
  } catch(err) {
    console.log(err.message)
    error.value = err.message
  }

}


async function handleLogin() {
  console.log(loginform.value)
  try {
    const credential = await store.signInUser(loginform.value.email, loginform.value.password)
    loginform.value = {
    email: '',
    password: ''
    }
    router.replace({ path: "/" })
  } catch (err) {
    console.log(err)
    error.value = err.message
  }

}

definePageMeta({
  layout: 'auth',
})
</script>