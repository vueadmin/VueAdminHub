<template>
  <div class="px-4 sm:px-0">
    <!-- Hero Section -->
    <section class="text-center py-12 mb-16">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-center mb-6">
          <Icon name="logos:vue" class="h-16 w-16" />
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-vue-dark mb-6">
          Vue Admin
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          专业的 Vue.js 管理后台资源平台，汇聚最优质的模板、组件库和开发工具，助力开发者构建现代化管理系统
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/templates" class="vue-button text-lg px-8 py-4">
            <Icon name="heroicons:squares-plus-20-solid" class="h-5 w-5 mr-2" />
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
  title: 'Vue Admin - 专业的 Vue.js 管理后台资源平台 | 40+精选资源',
  description: '汇聚最优质的 Vue.js 管理模板、UI 组件库和开发工具。包含 vue-element-admin、Element Plus、Ant Design Vue 等40+精选资源，助力开发者快速构建现代化管理系统。免费开源，持续更新。',
  keywords: 'Vue.js,管理后台,Admin模板,Element Plus,Ant Design Vue,vue-element-admin,vue-pure-admin,Vite,Nuxt,UI组件库,开发工具,免费模板,开源项目',
  author: 'Vue Admin',
  robots: 'index, follow, max-image-preview:large',
  ogTitle: 'Vue Admin - 专业的 Vue.js 管理后台资源平台',
  ogDescription: '40+ Vue.js 精选资源，涵盖管理模板、UI组件库、开发工具。vue-element-admin、Element Plus、Vite 一站式解决方案。',
  ogType: 'website',
  ogUrl: 'https://vueadmin.com',
  ogImage: 'https://vueadmin.com/og-image.jpg',
  ogImageAlt: 'Vue Admin - Vue.js 管理后台资源平台',
  ogSiteName: 'Vue Admin',
  ogLocale: 'zh_CN',
  twitterCard: 'summary_large_image',
  twitterSite: '@VueAdmin',
  twitterCreator: '@VueAdmin',
  twitterTitle: 'Vue Admin - Vue.js 管理后台资源平台',
  twitterDescription: '40+ Vue.js 精选资源：管理模板、UI组件库、开发工具',
  twitterImage: 'https://vueadmin.com/twitter-image.jpg'
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
        name: 'Vue Admin',
        description: '专业的 Vue.js 管理后台资源平台，汇聚最优质的模板、组件库和开发工具',
        url: 'https://vueadmin.com',
        image: 'https://vueadmin.com/og-image.jpg',
        logo: {
          '@type': 'ImageObject',
          url: 'https://vueadmin.com/logo.png',
          width: 512,
          height: 512
        },
        sameAs: [
          'https://github.com/vuejs',
          'https://twitter.com/vuejs',
          'https://discord.com/invite/vue'
        ],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://vueadmin.com/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Vue Admin',
          url: 'https://vueadmin.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://vueadmin.com/logo.png'
          }
        },
        mainEntity: {
          '@type': 'ItemList',
          name: 'Vue.js 管理后台资源集合',
          description: '精选的 Vue.js 管理模板、UI组件库和开发工具',
          numberOfItems: allResources.length,
          itemListElement: featuredResources.value.map((resource, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: resource.name,
              description: resource.description,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              author: {
                '@type': resource.author.includes(' ') ? 'Organization' : 'Person',
                name: resource.author
              },
              offers: {
                '@type': 'Offer',
                price: resource.price === 'free' ? '0' : 'varies',
                priceCurrency: 'USD'
              },
              aggregateRating: resource.rating ? {
                '@type': 'AggregateRating',
                ratingValue: resource.rating,
                ratingCount: Math.floor(resource.stars / 100),
                bestRating: 5,
                worstRating: 1
              } : undefined
            }
          }))
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vue Admin',
        description: '专业的 Vue.js 管理后台资源平台',
        url: 'https://vueadmin.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://vueadmin.com/logo.png'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Chinese', 'English']
        },
        sameAs: [
          'https://github.com/vuejs',
          'https://twitter.com/vuejs'
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '什么是 Vue Admin？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vue Admin 是专业的 Vue.js 管理后台资源平台，汇聚了40+精选的管理模板、UI组件库和开发工具，帮助开发者快速构建现代化管理系统。'
            }
          },
          {
            '@type': 'Question',
            name: '包含哪些类型的资源？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '我们提供四大类资源：管理模板（如 vue-element-admin、vue-pure-admin）、UI组件库（如 Element Plus、Ant Design Vue）、开发工具（如 Vite、Pinia）和插件工具（如 VueUse、Vue I18n）。'
            }
          },
          {
            '@type': 'Question',
            name: '资源都是免费的吗？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '平台收录的资源绝大部分都是开源免费的，部分商业产品会明确标注价格。我们专注于推荐高质量的开源项目，帮助开发者降低成本。'
            }
          }
        ]
      })
    }
  ]
})
</script>