export const searchCrawlers = ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'Googlebot', 'Applebot']
export const restrictedCrawlerPaths = ['/adminLogin', '/adminAppointments']

export const createRobotsTxt = siteUrl => {
  const rules = [...restrictedCrawlerPaths.map(path => `Disallow: ${path}`), 'Allow: /'].join('\n')
  return `${searchCrawlers.map(bot => `User-agent: ${bot}`).join('\n')}\n${rules}\n\nUser-agent: *\n${rules}\n\nSitemap: ${new URL('/sitemap.xml', siteUrl).href}\n`
}
