export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Vue Admin Templates & Resources Hub | Best Vue.js Admin Dashboard Solutions',
      meta: [
        { name: 'description', content: 'Vue Admin Templates & Resources Hub - The ultimate collection of Vue.js admin templates, UI libraries, and development tools. Find the perfect template for your next admin dashboard.' },
        { name: 'keywords', content: 'Vue.js, Admin Dashboard, Element Plus, Ant Design Vue, vue-element-admin, Admin Template, UI Components' },
        { name: 'author', content: 'Vue Admin Hub' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Vue Admin Templates & Resources Hub' },
        { property: 'og:description', content: 'Discover the best Vue.js admin templates, UI libraries, and development tools for building modern admin dashboards.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Vue Admin Templates & Resources Hub' },
        { name: 'twitter:description', content: 'Find the perfect Vue.js admin template and resources for your next project.' }
      ],
      link: [
        { rel: 'canonical', href: 'https://vueadminhub.com' }
      ],
      script: [
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9119129995524504',
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            vue: {
              green: '#42b883',
              dark: '#35495e',
              light: '#64ffda'
            }
          }
        }
      }
    }
  }
})