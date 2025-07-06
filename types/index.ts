export interface ResourceItem {
  id: string
  name: string
  description: string
  category: 'template' | 'ui-library' | 'tool' | 'plugin' | 'framework'
  subcategory?: string
  version?: string
  vueVersion: '2.x' | '3.x' | 'both'
  stars: number
  downloads?: string
  lastUpdated: string
  author: string
  license: string
  website?: string
  github?: string
  npm?: string
  demo?: string
  documentation?: string
  tags: string[]
  features: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'active' | 'maintenance' | 'deprecated'
  price: 'free' | 'paid' | 'freemium'
  rating?: number
  screenshots?: string[]
  isPopular?: boolean
  isRecommended?: boolean
  isNew?: boolean
}