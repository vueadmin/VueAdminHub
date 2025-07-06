export const createWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vue Admin Hub',
  description: '专业的 Vue.js 管理后台资源平台，汇聚最优质的模板、组件库和开发工具',
  url: 'https://vueadminhub.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://vueadminhub.com/logo.png',
    width: 512,
    height: 512
  },
  sameAs: [
    'https://github.com/vuejs',
    'https://twitter.com/vuejs',
    'https://discord.com/invite/vue'
  ],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://vueadminhub.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Vue Admin Hub',
    url: 'https://vueadminhub.com'
  }
})

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const createSoftwareApplicationSchema = (resource: any) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: resource.name,
  description: resource.description,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: resource.price === 'free' ? '0' : 'varies',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  },
  author: {
    '@type': resource.author.includes(' ') ? 'Organization' : 'Person',
    name: resource.author
  },
  aggregateRating: resource.rating ? {
    '@type': 'AggregateRating',
    ratingValue: resource.rating,
    ratingCount: Math.floor(resource.stars / 100),
    bestRating: 5,
    worstRating: 1
  } : undefined,
  downloadUrl: resource.github,
  softwareVersion: resource.vueVersion,
  releaseNotes: `Last updated: ${resource.lastUpdated}`,
  keywords: resource.tags.join(', '),
  license: resource.license,
  programmingLanguage: 'JavaScript',
  runtimePlatform: 'Vue.js'
})

export const createCollectionPageSchema = (type: string, resources: any[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `Vue.js ${type} 资源集合`,
  description: `精选的 Vue.js ${type}，为开发者提供优质的解决方案`,
  url: `https://vueadminhub.com/${type}`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: resources.length,
    itemListElement: resources.slice(0, 10).map((resource, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: resource.name,
        description: resource.description,
        url: `https://vueadminhub.com/${type}/${resource.id}`
      }
    }))
  }
})

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vue Admin Hub',
  description: '专业的 Vue.js 管理后台资源平台',
  url: 'https://vueadminhub.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://vueadminhub.com/logo.png'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Chinese', 'English']
  },
  sameAs: [
    'https://github.com/vuejs',
    'https://twitter.com/vuejs'
  ]
})