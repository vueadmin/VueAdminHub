<template>
  <footer class="bg-vue-dark mt-16">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <Icon name="logos:vue" class="h-8 w-8" />
            <h2 class="text-white text-lg font-semibold">Vue Admin</h2>
          </div>
          <p class="text-gray-300 text-sm mb-4">
            专业的 Vue.js 管理后台资源平台，为开发者提供最全面的模板、组件库和开发工具。
          </p>
          <div class="flex space-x-4">
            <a href="https://github.com/vuejs/vue" target="_blank" rel="noopener" class="text-gray-300 hover:text-vue-light">
              <Icon name="mdi:github" class="h-5 w-5" />
            </a>
            <a href="https://twitter.com/vuejs" target="_blank" rel="noopener" class="text-gray-300 hover:text-vue-light">
              <Icon name="mdi:twitter" class="h-5 w-5" />
            </a>
            <a href="https://discord.com/invite/vue" target="_blank" rel="noopener" class="text-gray-300 hover:text-vue-light">
              <Icon name="mdi:discord" class="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="text-white text-sm font-semibold mb-4">资源分类</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/templates" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                管理模板
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ui-libraries" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                UI 组件库
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tools" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                开发工具
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/plugins" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                插件工具
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-white text-sm font-semibold mb-4">相关链接</h3>
          <ul class="space-y-2">
            <li>
              <a href="https://vuejs.org/" target="_blank" rel="noopener" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                Vue.js 官网
              </a>
            </li>
            <li>
              <a href="https://nuxt.com/" target="_blank" rel="noopener" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                Nuxt 官网
              </a>
            </li>
            <li>
              <a href="https://github.com/vuejs" target="_blank" rel="noopener" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                Vue GitHub
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/vue" target="_blank" rel="noopener" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
                Vue Discord
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-300 text-sm">
            © {{ new Date().getFullYear() }} Vue Admin. 保留所有权利。
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
              隐私政策
            </a>
            <a href="#" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
              服务条款
            </a>
            <a href="#" class="text-gray-300 hover:text-vue-light text-sm transition-colors duration-200">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component logic here
</script>