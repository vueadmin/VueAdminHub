import type { ResourceItem } from '~/types'

// 生成资源详情页路径
export const getResourceDetailPath = (resource: ResourceItem): string => {
  const categoryPathMap: Record<string, string> = {
    'template': 'templates',
    'ui-library': 'ui-libraries',
    'tool': 'tools',
    'plugin': 'plugins',
    'framework': 'tools'
  }
  
  const categoryPath = categoryPathMap[resource.category] || resource.category
  return `/${categoryPath}/${resource.id}`
}

// 格式化数字
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
} 