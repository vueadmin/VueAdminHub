<template>
  <nav class="flex mb-8" aria-label="面包屑导航" role="navigation">
    <ol class="inline-flex items-center space-x-1 md:space-x-3" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li 
        v-for="(item, index) in breadcrumbs" 
        :key="item.name"
        class="inline-flex items-center"
        itemprop="itemListElement" 
        itemscope 
        itemtype="https://schema.org/ListItem"
      >
        <meta itemprop="position" :content="index + 1" />
        
        <Icon 
          v-if="index > 0" 
          name="heroicons:chevron-right-20-solid" 
          class="w-4 h-4 text-gray-400 mr-1 md:mr-2" 
          aria-hidden="true"
        />
        
        <NuxtLink 
          v-if="item.url && index < breadcrumbs.length - 1"
          :to="item.url"
          class="text-gray-700 hover:text-vue-green transition-colors duration-200 text-sm md:text-base"
          itemprop="item"
        >
          <span itemprop="name">{{ item.name }}</span>
        </NuxtLink>
        
        <span 
          v-else
          class="text-gray-500 text-sm md:text-base font-medium"
          itemprop="name"
          aria-current="page"
        >
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string
  url?: string
}

interface Props {
  items: BreadcrumbItem[]
}

const props = defineProps<Props>()

// Add 首页 as the first item if not present
const breadcrumbs = computed(() => {
  const items = [...props.items]
  if (items.length === 0 || items[0].name !== '首页') {
    items.unshift({ name: '首页', url: '/' })
  }
  return items
})

// Generate structured data for breadcrumbs
const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.value.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url ? `https://vueadminhub.com${item.url}` : undefined
  }))
}))

// Add structured data to head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema.value)
    }
  ]
})
</script>