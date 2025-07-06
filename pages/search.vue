<template>
  <div class="px-4 sm:px-0">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-vue-dark mb-4">🔍 搜索结果</h1>
      <p class="text-gray-600">
        搜索 "<span class="font-medium text-vue-dark">{{ searchQuery }}</span>" 的结果
      </p>
    </div>

    <!-- Search Banner -->
    <SearchBanner
      title="继续搜索"
      :popular-tags="['Element Plus', 'Ant Design Vue', 'Vite', 'TypeScript', 'Nuxt', 'Pinia']"
      @search="handleSearch"
    />

    <!-- Filter -->
    <ResourceFilter
      :categories="categories"
      @filter="handleFilter"
    />

    <!-- Results Summary -->
    <div class="mb-6 flex justify-between items-center">
      <div class="text-sm text-gray-500">
        找到 {{ filteredResources.length }} 个相关资源
      </div>
      <div class="flex gap-2">
        <button
          @click="viewMode = 'grid'"
          class="p-2 rounded-lg transition-colors duration-200"
          :class="viewMode === 'grid' ? 'bg-vue-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          <Icon name="heroicons:squares-2x2-20-solid" class="h-5 w-5" />
        </button>
        <button
          @click="viewMode = 'list'"
          class="p-2 rounded-lg transition-colors duration-200"
          :class="viewMode === 'list' ? 'bg-vue-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          <Icon name="heroicons:list-bullet-20-solid" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Results by Category -->
    <div v-if="filteredResources.length > 0" class="space-y-8">
      <section v-if="categorizedResults.templates.length > 0">
        <h2 class="text-xl font-semibold text-vue-dark mb-4 flex items-center">
          <Icon name="heroicons:template-20-solid" class="h-5 w-5 mr-2" />
          管理模板 ({{ categorizedResults.templates.length }})
        </h2>
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <ResourceCard
            v-for="resource in categorizedResults.templates"
            :key="resource.id"
            :resource="resource"
          />
        </div>
        <div v-else class="space-y-4 mb-8">
          <div
            v-for="resource in categorizedResults.templates"
            :key="resource.id"
            class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <ResourceListItem :resource="resource" />
          </div>
        </div>
      </section>

      <section v-if="categorizedResults.uiLibraries.length > 0">
        <h2 class="text-xl font-semibold text-vue-dark mb-4 flex items-center">
          <Icon name="heroicons:squares-plus-20-solid" class="h-5 w-5 mr-2" />
          UI 组件库 ({{ categorizedResults.uiLibraries.length }})
        </h2>
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <ResourceCard
            v-for="resource in categorizedResults.uiLibraries"
            :key="resource.id"
            :resource="resource"
          />
        </div>
        <div v-else class="space-y-4 mb-8">
          <div
            v-for="resource in categorizedResults.uiLibraries"
            :key="resource.id"
            class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <ResourceListItem :resource="resource" />
          </div>
        </div>
      </section>

      <section v-if="categorizedResults.tools.length > 0">
        <h2 class="text-xl font-semibold text-vue-dark mb-4 flex items-center">
          <Icon name="heroicons:wrench-screwdriver-20-solid" class="h-5 w-5 mr-2" />
          开发工具 ({{ categorizedResults.tools.length }})
        </h2>
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <ResourceCard
            v-for="resource in categorizedResults.tools"
            :key="resource.id"
            :resource="resource"
          />
        </div>
        <div v-else class="space-y-4 mb-8">
          <div
            v-for="resource in categorizedResults.tools"
            :key="resource.id"
            class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <ResourceListItem :resource="resource" />
          </div>
        </div>
      </section>

      <section v-if="categorizedResults.plugins.length > 0">
        <h2 class="text-xl font-semibold text-vue-dark mb-4 flex items-center">
          <Icon name="heroicons:puzzle-piece-20-solid" class="h-5 w-5 mr-2" />
          插件工具 ({{ categorizedResults.plugins.length }})
        </h2>
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <ResourceCard
            v-for="resource in categorizedResults.plugins"
            :key="resource.id"
            :resource="resource"
          />
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="resource in categorizedResults.plugins"
            :key="resource.id"
            class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <ResourceListItem :resource="resource" />
          </div>
        </div>
      </section>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Icon name="heroicons:magnifying-glass-20-solid" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">未找到相关资源</h3>
      <p class="text-gray-500 mb-4">
        没有找到与 "{{ searchQuery }}" 相关的资源，请尝试其他关键词
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="clearSearch" class="vue-button">
          清除搜索
        </button>
        <NuxtLink to="/" class="vue-button-outline">
          返回首页
        </NuxtLink>
      </div>
      
      <!-- Search Suggestions -->
      <div class="mt-8">
        <p class="text-sm text-gray-500 mb-4">您可以尝试搜索:</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="suggestion in searchSuggestions"
            :key="suggestion"
            @click="handleSearch(suggestion)"
            class="text-vue-green hover:text-vue-dark text-sm bg-vue-green/10 hover:bg-vue-green/20 px-3 py-1 rounded-full transition-colors duration-200"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { allResources, categories, templates, uiLibraries, tools, plugins } from '~/data/resources'
import type { ResourceItem } from '~/types'

// Get search query from URL
const route = useRoute()
const router = useRouter()
const searchQuery = ref((route.query.q as string) || '')

// SEO Meta
useSeoMeta({
  title: () => `搜索 "${searchQuery.value}" - Vue Admin Hub`,
  description: () => `搜索 Vue.js 相关资源："${searchQuery.value}"`,
  keywords: () => `${searchQuery.value}, Vue.js, 搜索, 资源`
})

// State
const viewMode = ref<'grid' | 'list'>('grid')
const currentFilters = ref({
  category: 'all',
  vueVersion: '',
  status: '',
  difficulty: '',
  sort: 'stars'
})

// Search suggestions
const searchSuggestions = [
  'Element Plus', 'Ant Design Vue', 'Vite', 'TypeScript', 
  'Nuxt', 'Pinia', 'Vue Router', 'Admin Template'
]

// Computed
const filteredResources = computed(() => {
  if (!searchQuery.value.trim()) return []
  
  let filtered = [...allResources]
  const query = searchQuery.value.toLowerCase()

  // Apply search
  filtered = filtered.filter(resource =>
    resource.name.toLowerCase().includes(query) ||
    resource.description.toLowerCase().includes(query) ||
    resource.tags.some(tag => tag.toLowerCase().includes(query)) ||
    resource.author.toLowerCase().includes(query)
  )

  // Apply filters
  if (currentFilters.value.category !== 'all') {
    filtered = filtered.filter(resource => resource.category === currentFilters.value.category)
  }

  if (currentFilters.value.vueVersion) {
    filtered = filtered.filter(resource =>
      resource.vueVersion === currentFilters.value.vueVersion ||
      resource.vueVersion === 'both'
    )
  }

  if (currentFilters.value.status) {
    filtered = filtered.filter(resource => resource.status === currentFilters.value.status)
  }

  if (currentFilters.value.difficulty) {
    filtered = filtered.filter(resource => resource.difficulty === currentFilters.value.difficulty)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (currentFilters.value.sort) {
      case 'stars':
        return b.stars - a.stars
      case 'updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0
    }
  })

  return filtered
})

// Categorized results
const categorizedResults = computed(() => {
  return {
    templates: filteredResources.value.filter(r => r.category === 'template'),
    uiLibraries: filteredResources.value.filter(r => r.category === 'ui-library'),
    tools: filteredResources.value.filter(r => r.category === 'tool' || r.category === 'framework'),
    plugins: filteredResources.value.filter(r => r.category === 'plugin')
  }
})

// Methods
const handleSearch = (query: string) => {
  searchQuery.value = query
  router.push({ query: { q: query } })
}

const handleFilter = (filters: any) => {
  currentFilters.value = filters
}

const clearSearch = () => {
  searchQuery.value = ''
  router.push({ query: {} })
}

// Watch for query changes
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = (newQuery as string) || ''
})
</script>