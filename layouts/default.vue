<template>
  <div>
    <TheHeader />
    <main class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// Default layout
</script>