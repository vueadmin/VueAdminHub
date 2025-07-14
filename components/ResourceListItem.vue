<template>
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
        :to="getResourceDetailPath(resource)"
        class="vue-button"
      >
        查看详情
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResourceItem } from '~/types'
import { getResourceDetailPath, formatNumber } from '~/utils/resource'

interface Props {
  resource: ResourceItem
}

defineProps<Props>()
</script>