<template>
  <div class="px-4 sm:px-0">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-vue-dark mb-4">🛠️ 开发工具</h1>
      <p class="text-gray-600">
        精选的 Vue.js 开发工具，提升开发效率和项目质量
      </p>
    </div>

    <!-- Search and Filter -->
    <SearchBanner
      title="寻找合适的开发工具"
      placeholder="搜索开发工具..."
      :popular-tags="['Vite', 'Pinia', 'Vue Router', 'Nuxt', 'Vitest']"
      @search="handleSearch"
    />

    <ResourceFilter
      :categories="toolCategories"
      @filter="handleFilter"
    />

    <!-- Results -->
    <div class="mb-6 flex justify-between items-center">
      <div class="text-sm text-gray-500">
        找到 {{ filteredResources.length }} 个工具
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

    <!-- Resources Grid/List -->
    <div
      v-if="viewMode === 'grid'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ResourceCard
        v-for="resource in filteredResources"
        :key="resource.id"
        :resource="resource"
      />
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="resource in filteredResources"
        :key="resource.id"
        class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-3">
              <h3 class="text-lg font-semibold text-vue-dark">
                {{ resource.name }}
              </h3>
              <span class="vue-badge">{{ resource.vueVersion }}</span>
              <span v-if="resource.isNew" class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                新
              </span>
              <span v-if="resource.isPopular" class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                热门
              </span>
            </div>
            
            <p class="text-gray-600 mb-3">{{ resource.description }}</p>
            
            <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <span class="flex items-center">
                <Icon name="mdi:star" class="h-4 w-4 mr-1" />
                {{ formatNumber(resource.stars) }}
              </span>
              <span v-if="resource.downloads">{{ resource.downloads }}</span>
              <span>{{ resource.lastUpdated }}</span>
              <span>by {{ resource.author }}</span>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in resource.tags"
                :key="tag"
                class="vue-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="flex flex-col items-end space-y-2 ml-6">
            <div class="flex space-x-2">
              <a
                v-if="resource.github"
                :href="resource.github"
                target="_blank"
                rel="noopener"
                class="p-2 text-gray-400 hover:text-vue-green transition-colors duration-200"
              >
                <Icon name="mdi:github" class="h-5 w-5" />
              </a>
              <a
                v-if="resource.website"
                :href="resource.website"
                target="_blank"
                rel="noopener"
                class="p-2 text-gray-400 hover:text-vue-green transition-colors duration-200"
              >
                <Icon name="mdi:web" class="h-5 w-5" />
              </a>
            </div>
            
            <NuxtLink
              :to="`/tools/${resource.id}`"
              class="vue-button"
            >
              查看详情
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredResources.length === 0" class="text-center py-12">
      <Icon name="heroicons:magnifying-glass-20-solid" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">未找到匹配的工具</h3>
      <p class="text-gray-500 mb-4">请尝试调整搜索条件或筛选选项</p>
      <button
        @click="clearFilters"
        class="vue-button"
      >
        清除所有筛选
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tools } from '~/data/resources'

// SEO Meta
useSeoMeta({
  title: 'Vue.js 开发工具 - Vue Admin',
  description: '精选的 Vue.js 开发工具，包含 Vite、Pinia、Vue Router、Nuxt 等热门项目',
  keywords: 'Vue.js 开发工具, Vite, Pinia, Vue Router, Nuxt, Vitest'
})

// Tool-specific categories
const toolCategories = computed(() => {
  const toolCount = tools.length
  return [
    { id: 'all', name: '全部', count: toolCount },
    { id: 'build-tool', name: '构建工具', count: toolCount },
  ]
})

// State
const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')
const currentFilters = ref({
  category: 'all',
  vueVersion: '',
  status: '',
  difficulty: '',
  sort: 'stars'
})

// Computed
const filteredResources = computed(() => {
  let filtered = [...tools]

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(resource =>
      resource.name.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Apply filters
  if (currentFilters.value.vueVersion) {
    filtered = filtered.filter(resource =>
      resource.vueVersion === currentFilters.value.vueVersion ||
      resource.vueVersion === 'both'
    )
  }

  if (currentFilters.value.status) {
    filtered = filtered.filter(resource =>
      resource.status === currentFilters.value.status
    )
  }

  if (currentFilters.value.difficulty) {
    filtered = filtered.filter(resource =>
      resource.difficulty === currentFilters.value.difficulty
    )
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

// Methods
const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleFilter = (filters: any) => {
  currentFilters.value = filters
}

const clearFilters = () => {
  searchQuery.value = ''
  currentFilters.value = {
    category: 'all',
    vueVersion: '',
    status: '',
    difficulty: '',
    sort: 'stars'
  }
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// Handle URL query parameters
const route = useRoute()
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q as string
  }
})
</script>