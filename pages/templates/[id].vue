<template>
  <div v-if="resource" class="px-4 sm:px-0">
    <!-- Breadcrumb -->
    <BreadcrumbNav :items="breadcrumbItems" />

    <!-- Header -->
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between">
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-4">
            <h1 class="text-3xl font-bold text-vue-dark">{{ resource.name }}</h1>
            <span class="vue-badge text-lg px-3 py-1">{{ resource.vueVersion }}</span>
            <span v-if="resource.isNew" class="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
              新项目
            </span>
            <span v-if="resource.isPopular" class="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded">
              热门推荐
            </span>
          </div>
          
          <p class="text-gray-600 text-lg mb-6">{{ resource.description }}</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="text-center">
              <div class="flex items-center justify-center mb-2">
                <Icon name="mdi:star" class="h-5 w-5 text-yellow-500 mr-1" />
                <span class="text-2xl font-bold text-vue-dark">{{ formatNumber(resource.stars) }}</span>
              </div>
              <div class="text-sm text-gray-500">GitHub Stars</div>
            </div>
            <div v-if="resource.downloads" class="text-center">
              <div class="flex items-center justify-center mb-2">
                <Icon name="mdi:download" class="h-5 w-5 text-vue-green mr-1" />
                <span class="text-2xl font-bold text-vue-dark">{{ resource.downloads }}</span>
              </div>
              <div class="text-sm text-gray-500">下载量</div>
            </div>
            <div class="text-center">
              <div class="flex items-center justify-center mb-2">
                <Icon name="mdi:update" class="h-5 w-5 text-blue-500 mr-1" />
                <span class="text-2xl font-bold text-vue-dark">{{ resource.lastUpdated }}</span>
              </div>
              <div class="text-sm text-gray-500">最后更新</div>
            </div>
            <div class="text-center">
              <div class="flex items-center justify-center mb-2">
                <Icon name="mdi:account" class="h-5 w-5 text-purple-500 mr-1" />
                <span class="text-2xl font-bold text-vue-dark">{{ 
                  resource.difficulty === 'beginner' ? '初级' :
                  resource.difficulty === 'intermediate' ? '中级' :
                  resource.difficulty === 'advanced' ? '高级' : resource.difficulty
                }}</span>
              </div>
              <div class="text-sm text-gray-500">难度等级</div>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col space-y-3 md:ml-8">
          <a
            v-if="resource.github"
            :href="resource.github"
            target="_blank"
            rel="noopener"
            class="vue-button flex items-center justify-center"
          >
            <Icon name="mdi:github" class="h-5 w-5 mr-2" />
            GitHub 仓库
          </a>
          <a
            v-if="resource.website"
            :href="resource.website"
            target="_blank"
            rel="noopener"
            class="vue-button-outline flex items-center justify-center"
          >
            <Icon name="mdi:web" class="h-5 w-5 mr-2" />
            官方网站
          </a>
          <a
            v-if="resource.demo"
            :href="resource.demo"
            target="_blank"
            rel="noopener"
            class="vue-button-outline flex items-center justify-center"
          >
            <Icon name="mdi:play" class="h-5 w-5 mr-2" />
            在线演示
          </a>
          <a
            v-if="resource.documentation"
            :href="resource.documentation"
            target="_blank"
            rel="noopener"
            class="vue-button-outline flex items-center justify-center"
          >
            <Icon name="mdi:book-open" class="h-5 w-5 mr-2" />
            查看文档
          </a>
        </div>
      </div>
    </div>

    <!-- Content Tabs -->
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="activeTab === tab.id
              ? 'border-vue-green text-vue-green'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-vue-dark mb-4">🚀 主要特性</h3>
            <ul class="space-y-2">
              <li
                v-for="feature in resource.features"
                :key="feature"
                class="flex items-center"
              >
                <Icon name="heroicons:check-circle-20-solid" class="h-5 w-5 text-vue-green mr-2 flex-shrink-0" />
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-vue-dark mb-4">🏷️ 技术标签</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in resource.tags"
                :key="tag"
                class="vue-tag"
              >
                {{ tag }}
              </span>
            </div>
            
            <h3 class="text-lg font-semibold text-vue-dark mb-4 mt-6">📊 项目信息</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">作者:</span>
                <span class="font-medium">{{ resource.author }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">许可证:</span>
                <span class="font-medium">{{ resource.license }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">状态:</span>
                <span class="font-medium">{{ 
                  resource.status === 'active' ? '活跃维护' :
                  resource.status === 'maintenance' ? '维护中' :
                  resource.status === 'deprecated' ? '已弃用' : resource.status
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">价格:</span>
                <span class="font-medium">{{ 
                  resource.price === 'free' ? '免费' :
                  resource.price === 'paid' ? '付费' :
                  resource.price === 'freemium' ? '免费增值' : resource.price
                }}</span>
              </div>
              <div v-if="resource.rating" class="flex justify-between">
                <span class="text-gray-600">评分:</span>
                <div class="flex items-center">
                  <Icon name="mdi:star" class="h-4 w-4 text-yellow-500 mr-1" />
                  <span class="font-medium">{{ resource.rating }}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Installation Tab -->
      <div v-if="activeTab === 'installation'">
        <h3 class="text-lg font-semibold text-vue-dark mb-4">📦 安装指南</h3>
        
        <div class="space-y-6">
          <div>
            <h4 class="font-medium text-gray-900 mb-2">使用 Git 克隆</h4>
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code class="text-green-400 text-sm">git clone {{ resource.github }}</code>
            </div>
          </div>
          
          <div v-if="resource.npm">
            <h4 class="font-medium text-gray-900 mb-2">使用 npm 安装</h4>
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code class="text-green-400 text-sm">npm install {{ resource.npm.split('/').pop() }}</code>
            </div>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-900 mb-2">快速开始</h4>
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre class="text-green-400 text-sm"><code># 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Documentation Tab -->
      <div v-if="activeTab === 'documentation'">
        <h3 class="text-lg font-semibold text-vue-dark mb-4">📚 相关文档</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            v-if="resource.documentation"
            :href="resource.documentation"
            target="_blank"
            rel="noopener"
            class="block p-4 border border-gray-200 rounded-lg hover:border-vue-green transition-colors duration-200"
          >
            <div class="flex items-center">
              <Icon name="mdi:book-open" class="h-6 w-6 text-vue-green mr-3" />
              <div>
                <div class="font-medium text-gray-900">官方文档</div>
                <div class="text-sm text-gray-500">详细的使用指南和 API 文档</div>
              </div>
            </div>
          </a>
          
          <a
            v-if="resource.github"
            :href="resource.github + '/wiki'"
            target="_blank"
            rel="noopener"
            class="block p-4 border border-gray-200 rounded-lg hover:border-vue-green transition-colors duration-200"
          >
            <div class="flex items-center">
              <Icon name="mdi:wikipedia" class="h-6 w-6 text-vue-green mr-3" />
              <div>
                <div class="font-medium text-gray-900">Wiki 文档</div>
                <div class="text-sm text-gray-500">社区贡献的文档和教程</div>
              </div>
            </div>
          </a>
          
          <a
            v-if="resource.github"
            :href="resource.github + '/issues'"
            target="_blank"
            rel="noopener"
            class="block p-4 border border-gray-200 rounded-lg hover:border-vue-green transition-colors duration-200"
          >
            <div class="flex items-center">
              <Icon name="mdi:bug" class="h-6 w-6 text-vue-green mr-3" />
              <div>
                <div class="font-medium text-gray-900">问题反馈</div>
                <div class="text-sm text-gray-500">报告 Bug 或请求新功能</div>
              </div>
            </div>
          </a>
          
          <a
            v-if="resource.github"
            :href="resource.github + '/discussions'"
            target="_blank"
            rel="noopener"
            class="block p-4 border border-gray-200 rounded-lg hover:border-vue-green transition-colors duration-200"
          >
            <div class="flex items-center">
              <Icon name="mdi:forum" class="h-6 w-6 text-vue-green mr-3" />
              <div>
                <div class="font-medium text-gray-900">社区讨论</div>
                <div class="text-sm text-gray-500">与其他开发者交流经验</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Related Resources -->
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h3 class="text-lg font-semibold text-vue-dark mb-6">🔗 相关推荐</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          v-for="relatedResource in relatedResources"
          :key="relatedResource.id"
          :resource="relatedResource"
        />
      </div>
    </div>
  </div>
  
  <!-- 404 State -->
  <div v-else class="px-4 sm:px-0 text-center py-12">
    <Icon name="heroicons:exclamation-triangle-20-solid" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h1 class="text-2xl font-bold text-gray-900 mb-2">资源未找到</h1>
    <p class="text-gray-500 mb-4">抱歉，您查找的资源不存在或已被删除。</p>
    <NuxtLink to="/templates" class="vue-button">
      返回模板列表
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { templates, allResources } from '~/data/resources'
import type { ResourceItem } from '~/types'

// 获取路由参数
const route = useRoute()
const resourceId = route.params.id as string

// 查找资源
const resource = computed(() => {
  return templates.find(r => r.id === resourceId)
})

// 面包屑导航
const breadcrumbItems = computed(() => [
  { name: '管理模板', url: '/templates' },
  { name: resource.value?.name || '未知资源' }
])

// 相关资源推荐（相同分类或相同标签，排除当前资源）
const relatedResources = computed(() => {
  if (!resource.value) return []
  
  return allResources
    .filter(r => 
      r.id !== resource.value!.id && 
      (r.category === resource.value!.category || 
       r.tags.some(tag => resource.value!.tags.includes(tag)))
    )
    .slice(0, 3)
})

// 标签页配置
const activeTab = ref('overview')
const tabs = [
  { id: 'overview', name: '项目概览' },
  { id: 'installation', name: '安装指南' },
  { id: 'documentation', name: '相关文档' }
]

import { formatNumber } from '~/utils/resource'

// 404 处理
if (!resource.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Resource Not Found'
  })
}

// SEO Meta 配置
useSeoMeta({
  title: () => resource.value ? `${resource.value.name} - Vue.js 管理模板详情 | Vue Admin Hub` : '资源未找到',
  description: () => resource.value ? `${resource.value.description} | ${resource.value.features.slice(0, 3).join('、')} | ${resource.value.stars}+ GitHub Stars | 作者：${resource.value.author}` : '资源未找到',
  keywords: () => resource.value ? `${resource.value.name},${resource.value.tags.join(',')},Vue.js,管理模板,${resource.value.author}` : '',
  author: () => resource.value ? resource.value.author : '',
  robots: 'index, follow, max-image-preview:large',
  ogTitle: () => resource.value ? `${resource.value.name} - Vue.js 管理模板` : '资源未找到',
  ogDescription: () => resource.value ? `${resource.value.description} | ${resource.value.stars}+ Stars` : '资源未找到',
  ogType: 'article',
  ogUrl: () => resource.value ? `https://vueadminhub.com/templates/${resource.value.id}` : '',
  ogImage: () => resource.value ? `https://vueadminhub.com/templates/${resource.value.id}/preview.jpg` : '',
  ogImageAlt: () => resource.value ? `${resource.value.name} 预览图` : '',
  articleAuthor: () => resource.value ? resource.value.author : '',
  articlePublishedTime: () => resource.value ? new Date(resource.value.lastUpdated + '-01').toISOString() : '',
  articleModifiedTime: () => resource.value ? new Date(resource.value.lastUpdated + '-01').toISOString() : '',
  articleTag: () => resource.value ? resource.value.tags : [],
  twitterCard: 'summary_large_image',
  twitterTitle: () => resource.value ? `${resource.value.name} - Vue.js 管理模板` : '',
  twitterDescription: () => resource.value ? `${resource.value.description} | ${resource.value.stars}+ Stars` : '',
  twitterImage: () => resource.value ? `https://vueadminhub.com/templates/${resource.value.id}/twitter.jpg` : ''
})

// 结构化数据 for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => resource.value ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: resource.value.name,
        description: resource.value.description,
        author: {
          '@type': 'Person',
          name: resource.value.author
        },
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: resource.value.price === 'free' ? '0' : 'varies',
          priceCurrency: 'USD'
        },
        aggregateRating: resource.value.rating ? {
          '@type': 'AggregateRating',
          ratingValue: resource.value.rating,
          ratingCount: Math.floor(resource.value.stars / 100),
          bestRating: 5,
          worstRating: 1
        } : undefined,
        downloadUrl: resource.value.github,
        softwareVersion: resource.value.vueVersion,
        releaseNotes: `Last updated: ${resource.value.lastUpdated}`,
        keywords: resource.value.tags.join(', '),
        license: resource.value.license,
        programmingLanguage: 'JavaScript',
        runtimePlatform: 'Vue.js'
      }) : ''
    }
  ]
})
</script>