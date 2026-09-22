import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

// Use the same production SFC scope IDs as the client build so the initial
// HTML is fully styled before Vue mounts, without maintaining a second layout.
export async function renderHomepage(root) {
  const previousNodeEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
  let server
  try {
    server = await createServer({
      root,
      mode: 'production',
      server: { middlewareMode: true, hmr: false, watch: null },
      appType: 'custom',
      cacheDir: 'node_modules/.vite-static-homepage',
      optimizeDeps: { noDiscovery: true, include: [] }
    })
    const { default: Homepage } = await server.ssrLoadModule('/src/components/homepage/Homepage.vue')
    return await renderToString(createSSRApp(Homepage))
  } finally {
    await server?.close()
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV
    else process.env.NODE_ENV = previousNodeEnv
  }
}

export function homepageStyles(manifest) {
  const styles = new Set()
  const visited = new Set()
  const visit = (key) => {
    if (visited.has(key)) return
    visited.add(key)
    const entry = manifest[key]
    if (!entry) throw new Error(`Missing homepage manifest entry: ${key}`)
    for (const css of entry.css || []) styles.add(`/${css}`)
    for (const dependency of entry.imports || []) visit(dependency)
  }
  visit('src/pages/Home.vue')
  return [...styles]
}
