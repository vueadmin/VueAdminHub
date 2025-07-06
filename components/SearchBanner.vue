<template>
  <div class="bg-gradient-to-r from-vue-dark to-vue-green rounded-xl shadow-lg p-8 mb-8">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-white mb-6 text-center">
        {{ title }}
      </h2>
      
      <div class="relative">
        <div class="flex items-center bg-white rounded-lg shadow-inner overflow-hidden">
          <div class="flex-1 flex items-center">
            <Icon name="heroicons:magnifying-glass-20-solid" class="h-5 w-5 text-gray-400 ml-4" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="placeholder"
              class="flex-1 px-4 py-4 text-gray-700 bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-400"
              @input="handleSearch"
            />
          </div>
          
          <button
            @click="handleSearch"
            class="px-8 py-4 bg-vue-green text-white font-medium hover:bg-vue-dark transition-colors duration-200 flex items-center"
          >
            <Icon name="heroicons:magnifying-glass-20-solid" class="h-5 w-5 mr-2" />
            搜索
          </button>
        </div>
      </div>
      
      <div class="mt-6 flex flex-wrap gap-2 justify-center">
        <span class="text-gray-200 text-sm mr-2">热门搜索:</span>
        <button
          v-for="tag in popularTags"
          :key="tag"
          @click="setSearchQuery(tag)"
          class="text-vue-light hover:text-white text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors duration-200"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  placeholder?: string
  popularTags?: string[]
}

interface Emits {
  (e: 'search', query: string): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '发现最适合你的 Vue 管理后台解决方案',
  placeholder: '搜索模板、UI 库或工具...',
  popularTags: () => ['Element Plus', 'Ant Design Vue', 'Vite', 'TypeScript', 'Nuxt', 'Pinia']
})

const emit = defineEmits<Emits>()

const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const setSearchQuery = (tag: string) => {
  searchQuery.value = tag
  handleSearch()
}

// Watch for search query changes and debounce
const debouncedSearch = useDebounceFn(() => {
  handleSearch()
}, 300)

watch(searchQuery, () => {
  debouncedSearch()
})
</script>