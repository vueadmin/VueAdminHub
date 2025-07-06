export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap'
  ],
  css: ['~/assets/css/main.css'],
  
  // SEO 配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Vue Admin Hub - 专业的 Vue.js 管理后台资源平台',
      titleTemplate: '%s | Vue Admin Hub',
      meta: [
        { name: 'description', content: '汇聚最优质的 Vue.js 管理模板、UI 组件库和开发工具。包含 vue-element-admin、Element Plus、Ant Design Vue 等40+精选资源，助力开发者构建现代化管理系统。' },
        { name: 'keywords', content: 'Vue.js,管理后台,Admin模板,Element Plus,Ant Design Vue,vue-element-admin,vue-pure-admin,Vite,Nuxt,UI组件库,开发工具' },
        { name: 'author', content: 'Vue Admin Hub' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'language', content: 'zh-CN' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'distribution', content: 'global' },
        { name: 'rating', content: 'general' },
        
        // Open Graph
        { property: 'og:site_name', content: 'Vue Admin Hub' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:image', content: 'https://vueadminhub.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Vue Admin Hub - Vue.js 管理后台资源平台' },
        
        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@vueadminhub' },
        { name: 'twitter:creator', content: '@vueadminhub' },
        { name: 'twitter:image', content: 'https://vueadminhub.com/twitter-image.jpg' },
        
        // 移动端优化
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Vue Admin Hub' },
        
        // 搜索引擎优化
        { name: 'google-site-verification', content: 'your-google-verification-code' },
        { name: 'msvalidate.01', content: 'your-bing-verification-code' },
        { name: 'yandex-verification', content: 'your-yandex-verification-code' }
      ],
      link: [
        { rel: 'canonical', href: 'https://vueadminhub.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'dns-prefetch', href: '//pagead2.googlesyndication.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
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

  // 站点地图配置
  sitemap: {
    hostname: 'https://vueadminhub.com',
    gzip: true,
    routes: async () => {
      const { allResources } = await import('./data/resources')
      
      const routes = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/templates', changefreq: 'weekly', priority: 0.9 },
        { url: '/ui-libraries', changefreq: 'weekly', priority: 0.9 },
        { url: '/tools', changefreq: 'weekly', priority: 0.9 },
        { url: '/plugins', changefreq: 'weekly', priority: 0.9 },
        { url: '/search', changefreq: 'monthly', priority: 0.7 }
      ]

      // 添加所有资源详情页
      allResources.forEach((resource: any) => {
        const categoryPath = resource.category === 'ui-library' ? 'ui-libraries' 
          : resource.category === 'framework' ? 'tools'
          : `${resource.category}s`
        
        routes.push({
          url: `/${categoryPath}/${resource.id}`,
          changefreq: 'monthly',
          priority: resource.isPopular ? 0.8 : 0.6,
          lastmod: new Date(resource.lastUpdated + '-01').toISOString()
        })
      })

      return routes
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