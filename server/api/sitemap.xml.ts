import { allResources, templates, uiLibraries, tools, plugins } from '~/data/resources'

export default defineSitemapEventHandler(async () => {
  const baseUrl = 'https://vueadminhub.com'
  
  const routes = [
    // 主要页面
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString()
    },
    {
      loc: '/templates',
      changefreq: 'weekly', 
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    {
      loc: '/ui-libraries',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    {
      loc: '/tools',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    {
      loc: '/plugins',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    {
      loc: '/search',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  ]

  // 添加所有资源详情页
  allResources.forEach(resource => {
    const categoryPath = resource.category === 'ui-library' ? 'ui-libraries' 
      : resource.category === 'framework' ? 'tools'
      : `${resource.category}s`
    
    routes.push({
      loc: `/${categoryPath}/${resource.id}`,
      changefreq: 'monthly',
      priority: resource.isPopular ? 0.8 : 0.6,
      lastmod: new Date(resource.lastUpdated + '-01').toISOString()
    })
  })

  return routes.map(route => ({
    url: `${baseUrl}${route.loc}`,
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: route.lastmod
  }))
})