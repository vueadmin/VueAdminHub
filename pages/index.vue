<template>
  <div class="px-4 sm:px-0">
    <!-- Hero Section -->
    <section class="text-center py-12 mb-16">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-center mb-6">
          <Icon name="logos:vue" class="h-16 w-16" />
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-vue-dark mb-6">
          Vue Admin Hub
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          专业的 Vue.js 管理后台资源平台，汇聚最优质的模板、组件库和开发工具，助力开发者构建现代化管理系统
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/templates" class="vue-button text-lg px-8 py-4">
            <Icon name="heroicons:template-20-solid" class="h-5 w-5 mr-2" />
            探索模板
          </NuxtLink>
          <NuxtLink to="/ui-libraries" class="vue-button-outline text-lg px-8 py-4">
            <Icon name="heroicons:squares-plus-20-solid" class="h-5 w-5 mr-2" />
            UI 组件库
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <SearchBanner @search="handleSearch" />

    <!-- Featured Resources Section -->
    <section class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-vue-dark">🔥 热门推荐</h2>
        <NuxtLink to="/popular" class="text-vue-green hover:text-vue-dark transition-colors duration-200">
          查看全部 →
        </NuxtLink>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          v-for="resource in featuredResources"
          :key="resource.id"
          :resource="resource"
        />
      </div>
    </section>

    <!-- Category Sections -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold text-vue-dark mb-8">📋 管理模板</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          v-for="template in templates.slice(0, 6)"
          :key="template.id"
          :resource="template"
        />
      </div>
      <div class="text-center mt-8">
        <NuxtLink to="/templates" class="vue-button">
          查看更多模板 →
        </NuxtLink>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-vue-dark mb-8">🎨 UI 组件库</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          v-for="library in uiLibraries.slice(0, 6)"
          :key="library.id"
          :resource="library"
        />
      </div>
      <div class="text-center mt-8">
        <NuxtLink to="/ui-libraries" class="vue-button">
          查看更多 UI 库 →
        </NuxtLink>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-vue-dark mb-8">🛠️ 开发工具</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          v-for="tool in tools.slice(0, 6)"
          :key="tool.id"
          :resource="tool"
        />
      </div>
      <div class="text-center mt-8">
        <NuxtLink to="/tools" class="vue-button">
          查看更多工具 →
        </NuxtLink>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="bg-gradient-to-r from-vue-green to-vue-dark rounded-xl p-8 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div class="text-white">
          <div class="text-3xl font-bold mb-2">{{ allResources.length }}+</div>
          <div class="text-vue-light">优质资源</div>
        </div>
        <div class="text-white">
          <div class="text-3xl font-bold mb-2">{{ templates.length }}+</div>
          <div class="text-vue-light">管理模板</div>
        </div>
        <div class="text-white">
          <div class="text-3xl font-bold mb-2">{{ uiLibraries.length }}+</div>
          <div class="text-vue-light">UI 组件库</div>
        </div>
        <div class="text-white">
          <div class="text-3xl font-bold mb-2">100万+</div>
          <div class="text-vue-light">开发者信赖</div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-white rounded-xl shadow-lg p-8 text-center">
      <h2 class="text-2xl font-bold text-vue-dark mb-4">🔔 获取最新资源更新</h2>
      <p class="text-gray-600 mb-6">
        订阅我们的通讯，第一时间获取最新的 Vue.js 资源和开发技巧
      </p>
      <div class="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
        <input
          v-model="email"
          type="email"
          placeholder="输入您的邮箱地址"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vue-green focus:border-transparent"
        />
        <button
          @click="subscribe"
          class="vue-button"
          :disabled="!email || isSubscribing"
        >
          {{ isSubscribing ? '订阅中...' : '订阅' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { allResources, templates, uiLibraries, tools, recommendedResources } from '~/data/resources'

// SEO Meta
useSeoMeta({
  title: 'Vue Admin Hub - 专业的 Vue.js 管理后台资源平台',
  description: '汇聚最优质的 Vue.js 管理模板、UI 组件库和开发工具，助力开发者构建现代化管理系统',
  keywords: 'Vue.js, 管理后台, 模板, UI组件库, 开发工具, Element Plus, Ant Design Vue',
  author: 'Vue Admin Hub',
  ogTitle: 'Vue Admin Hub - 专业的 Vue.js 管理后台资源平台',
  ogDescription: '汇聚最优质的 Vue.js 管理模板、UI 组件库和开发工具',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

// Featured resources (mix of popular and recommended)
const featuredResources = computed(() => {
  return recommendedResources.slice(0, 6)
})

// Newsletter subscription
const email = ref('')
const isSubscribing = ref(false)

const subscribe = async () => {
  if (!email.value) return
  
  isSubscribing.value = true
  
  // Simulate subscription process
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Show success message
  alert('订阅成功！感谢您的关注。')
  
  email.value = ''
  isSubscribing.value = false
}

// Search functionality
const handleSearch = (query: string) => {
  if (query.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(query)}`)
  }
}

// Structured data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Vue Admin Hub',
        description: '专业的 Vue.js 管理后台资源平台',
        url: 'https://vueadminhub.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://vueadminhub.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})
</script>