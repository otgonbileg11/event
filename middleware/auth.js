import {useAuthStore} from '~/store/useAuthStore'

const store = useAuthStore()

export default defineNuxtRouteMiddleware((to, from) => {
  if(!store.isUser) {
    console.log('no user id')
    return navigateTo('/auth/login')
  }else {
    return
  }
})