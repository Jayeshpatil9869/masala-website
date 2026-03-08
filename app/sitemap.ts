import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gravitatee.com'
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/contact',
    '/privacy-policy',
    '/return-policy',
    '/shipping-info',
    '/terms-of-service',
    '/fssai-compliance'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Fetch dynamic products
  let dynamicRoutes: MetadataRoute.Sitemap = []
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.gravitatee.com'
    const res = await fetch(`${backendUrl}/api/v1/products`)
    
    if (res.ok) {
        const result = await res.json()
        // Handle different possible backend response structures safely
        const products = Array.isArray(result) ? result : (result.data || [])
        
        dynamicRoutes = products.map((product: any) => ({
            url: `${baseUrl}/products/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    }
  } catch (error) {
    console.error('Failed to fetch products for sitemap', error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}
