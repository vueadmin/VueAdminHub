<template>
  <div class="mb-8">
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        :class="selectedCategory === category.id
          ? 'bg-vue-green text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
      >
        {{ category.name }}
        <span class="ml-2 text-xs opacity-75">({{ category.count }})</span>
      </button>
    </div>
    
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center space-x-2">
        <label class="text-sm text-gray-600">Vue 版本:</label>
        <select
          v-model="selectedVueVersion"
          class="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vue-green focus:border-transparent"
          @change="applyFilters"
        >
          <option value="">全部</option>
          <option value="3.x">Vue 3.x</option>
          <option value="2.x">Vue 2.x</option>
          <option value="both">Vue 2.x & 3.x</option>
        </select>
      </div>
      
      <div class="flex items-center space-x-2">
        <label class="text-sm text-gray-600">状态:</label>
        <select
          v-model="selectedStatus"
          class="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vue-green focus:border-transparent"
          @change="applyFilters"
        >
          <option value="">全部</option>
          <option value="active">活跃维护</option>
          <option value="maintenance">维护中</option>
          <option value="deprecated">已弃用</option>
        </select>
      </div>
      
      <div class="flex items-center space-x-2">
        <label class="text-sm text-gray-600">难度:</label>
        <select
          v-model="selectedDifficulty"
          class="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vue-green focus:border-transparent"
          @change="applyFilters"
        >
          <option value="">全部</option>
          <option value="beginner">初学者</option>
          <option value="intermediate">中级</option>
          <option value="advanced">高级</option>
        </select>
      </div>
      
      <div class="flex items-center space-x-2">
        <label class="text-sm text-gray-600">排序:</label>
        <select
          v-model="selectedSort"
          class="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vue-green focus:border-transparent"
          @change="applyFilters"
        >
          <option value="stars">按星标排序</option>
          <option value="updated">按更新时间</option>
          <option value="name">按名称排序</option>
          <option value="rating">按评分排序</option>
        </select>
      </div>
      
      <button
        @click="clearFilters"
        class="px-4 py-1 text-sm text-vue-green border border-vue-green rounded-lg hover:bg-vue-green hover:text-white transition-colors duration-200"
      >
        清除筛选
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: string
  name: string
  count: number
}

interface Props {
  categories: Category[]
}

interface Emits {
  (e: 'filter', filters: {
    category: string
    vueVersion: string
    status: string
    difficulty: string
    sort: string
  }): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedCategory = ref('all')
const selectedVueVersion = ref('')
const selectedStatus = ref('')
const selectedDifficulty = ref('')
const selectedSort = ref('stars')

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  applyFilters()
}

const applyFilters = () => {
  emit('filter', {
    category: selectedCategory.value,
    vueVersion: selectedVueVersion.value,
    status: selectedStatus.value,
    difficulty: selectedDifficulty.value,
    sort: selectedSort.value
  })
}

const clearFilters = () => {
  selectedCategory.value = 'all'
  selectedVueVersion.value = ''
  selectedStatus.value = ''
  selectedDifficulty.value = ''
  selectedSort.value = 'stars'
  applyFilters()
}

// Apply initial filters
onMounted(() => {
  applyFilters()
})
</script>