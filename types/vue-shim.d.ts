// Vue 3 SFC 模块声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Nuxt 3 自动导入的 composables 声明
declare global {
  const useSeoMeta: typeof import('@nuxtjs/seo')['useSeoMeta']
  const useHead: typeof import('@vueuse/head')['useHead']
  const useRoute: typeof import('vue-router')['useRoute']
  const useRouter: typeof import('vue-router')['useRouter']
  const useAsyncData: typeof import('nuxt/app')['useAsyncData']
  const useFetch: typeof import('nuxt/app')['useFetch']
  const useLazyFetch: typeof import('nuxt/app')['useLazyFetch']
  const useLazyAsyncData: typeof import('nuxt/app')['useLazyAsyncData']
  const useRuntimeConfig: typeof import('nuxt/app')['useRuntimeConfig']
  const useAppConfig: typeof import('nuxt/app')['useAppConfig']
  const useState: typeof import('nuxt/app')['useState']
  const useCookie: typeof import('nuxt/app')['useCookie']
  const useRequestHeaders: typeof import('nuxt/app')['useRequestHeaders']
  const useRequestEvent: typeof import('nuxt/app')['useRequestEvent']
  const createError: typeof import('h3')['createError']
  const showError: typeof import('nuxt/app')['showError']
  const clearError: typeof import('nuxt/app')['clearError']
  const isNuxtError: typeof import('nuxt/app')['isNuxtError']
  const refreshNuxtData: typeof import('nuxt/app')['refreshNuxtData']
  const executeAsync: typeof import('nuxt/app')['executeAsync']
  const preloadComponents: typeof import('nuxt/app')['preloadComponents']
  const preloadRouteComponents: typeof import('nuxt/app')['preloadRouteComponents']
  const abortNavigation: typeof import('nuxt/app')['abortNavigation']
  const addRouteMiddleware: typeof import('nuxt/app')['addRouteMiddleware']
  const definePageMeta: typeof import('nuxt/app')['definePageMeta']
  const defineNuxtRouteMiddleware: typeof import('nuxt/app')['defineNuxtRouteMiddleware']
  const navigateTo: typeof import('nuxt/app')['navigateTo']
  const setPageLayout: typeof import('nuxt/app')['setPageLayout']
  const setResponseStatus: typeof import('h3')['setResponseStatus']
  const preloadPayload: typeof import('nuxt/app')['preloadPayload']
  const isPrerendered: typeof import('nuxt/app')['isPrerendered']
  const loadPayload: typeof import('nuxt/app')['loadPayload']
  const getAppManifest: typeof import('nuxt/app')['getAppManifest']
  const getRouteRules: typeof import('nuxt/app')['getRouteRules']
  const updateAppConfig: typeof import('nuxt/app')['updateAppConfig']
  const defineAppConfig: typeof import('nuxt/app')['defineAppConfig']
  const defineNuxtConfig: typeof import('nuxt/app')['defineNuxtConfig']
  const useAppManifest: typeof import('nuxt/app')['useAppManifest']
  const useLoadingIndicator: typeof import('nuxt/app')['useLoadingIndicator']
  const useRequestFetch: typeof import('nuxt/app')['useRequestFetch']
  const useNuxtData: typeof import('nuxt/app')['useNuxtData']
  const clearNuxtData: typeof import('nuxt/app')['clearNuxtData']
  const refreshNuxtData: typeof import('nuxt/app')['refreshNuxtData']
  const shouldUseGlobalFetch: typeof import('nuxt/app')['shouldUseGlobalFetch']
}

// 全局组件声明
declare module '@vue/runtime-core' {
  interface GlobalComponents {
    NuxtLink: typeof import('nuxt/dist/app/components/nuxt-link')['NuxtLink']
    ClientOnly: typeof import('nuxt/dist/app/components/client-only')['ClientOnly']
    ServerPlaceholder: typeof import('nuxt/dist/app/components/server-placeholder')['ServerPlaceholder']
  }
}

// Icon 组件声明
declare module '#nuxt-icon' {
  export const Icon: typeof import('@nuxt/icon/dist/runtime/Icon.vue')['default']
}

export {}