<template>
  <div class="vue-card p-6 h-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-vue-dark">
        {{ resource.name }}
      </h3>
      <div class="flex items-center space-x-2">
        <span class="vue-badge">
          {{ resource.vueVersion }}
        </span>
        <span v-if="resource.isNew" class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
          新
        </span>
        <span v-if="resource.isPopular" class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
          热门
        </span>
      </div>
    </div>
    
    <p class="text-gray-600 mb-4 text-sm leading-relaxed">
      {{ resource.description }}
    </p>
    
    <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
      <div class="flex items-center">
        <Icon name="mdi:star" class="h-4 w-4 mr-1" />
        <span>{{ formatNumber(resource.stars) }}</span>
      </div>
      <div v-if="resource.downloads" class="flex items-center">
        <Icon name="mdi:download" class="h-4 w-4 mr-1" />
        <span>{{ resource.downloads }}</span>
      </div>
      <div class="flex items-center">
        <Icon name="mdi:update" class="h-4 w-4 mr-1" />
        <span>{{ resource.lastUpdated }}</span>
      </div>
    </div>
    
    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in resource.tags.slice(0, 3)"
        :key="tag"
        class="vue-tag"
      >
        {{ tag }}
      </span>
      <span v-if="resource.tags.length > 3" class="vue-tag">
        +{{ resource.tags.length - 3 }}
      </span>
    </div>
    
    <div class="flex items-center justify-between mt-auto">
      <div class="flex items-center space-x-2">
        <div v-if="resource.rating" class="flex items-center">
          <Icon name="mdi:star" class="h-4 w-4 text-yellow-500 mr-1" />
          <span class="text-sm font-medium">{{ resource.rating }}</span>
        </div>
        <span class="text-xs text-gray-500">{{ resource.author }}</span>
      </div>
      
      <div class="flex space-x-2">
        <a
          v-if="resource.github"
          :href="resource.github"
          target="_blank"
          rel="noopener"
          class="p-2 text-gray-400 hover:text-vue-green transition-colors duration-200"
          :title="'GitHub: ' + resource.name"
        >
          <Icon name="mdi:github" class="h-5 w-5" />
        </a>
        <a
          v-if="resource.website"
          :href="resource.website"
          target="_blank"
          rel="noopener"
          class="p-2 text-gray-400 hover:text-vue-green transition-colors duration-200"
          :title="'官网: ' + resource.name"
        >
          <Icon name="mdi:web" class="h-5 w-5" />
        </a>
      </div>
    </div>
    
    <div class="mt-4 pt-4 border-t border-gray-100">
      <NuxtLink
        :to="`/${resource.category}/${resource.id}`"
        class="vue-button w-full text-center inline-block"
      >
        查看详情
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResourceItem } from '~/types'

interface Props {
  resource: ResourceItem
}

defineProps<Props>()

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}
</script>