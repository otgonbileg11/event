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

async function handleSignUp() {
	console.log(signupform.value)
  try {
    const credential = await store.createUser(signupform.value.email, signupform.value.password, signupform.value.displayName)
    signupform.value = {
      email: '',
      password: '',
      displayName: ''
    }
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
  } catch (err) {
    console.log(err)
    error.value = err.message
  }

}

definePageMeta({
  layout: 'auth',
})
</script>