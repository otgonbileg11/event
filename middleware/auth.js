import {useAuthStore} from '~/store/useAuthStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore()
  if(!store.isUser) {
    console.log('no user id')
    return navigateTo('/auth/login')
  }else {
    return
  }
})