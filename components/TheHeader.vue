<template>
  <header class="bg-vue-dark shadow-lg sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <Icon name="logos:vue" class="h-8 w-8" />
            <h1 class="text-white text-xl font-bold hover:text-vue-light transition-colors duration-200">
              Vue Admin Hub
            </h1>
          </NuxtLink>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-white hover:text-vue-light px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'bg-vue-green': $route.path === item.href }"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="text-white hover:text-vue-light p-2 rounded-md transition-colors duration-200"
          >
            <Icon :name="mobileMenuOpen ? 'heroicons:x-mark-20-solid' : 'heroicons:bars-3-20-solid'" class="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-white hover:text-vue-light block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'bg-vue-green': $route.path === item.href }"
            @click="toggleMobileMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navigation = [
  { name: '首页', href: '/' },
  { name: '模板', href: '/templates' },
  { name: 'UI 库', href: '/ui-libraries' },
  { name: '工具', href: '/tools' },
  { name: '插件', href: '/plugins' }
]

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>