import { NodeTypes, parse } from '@vue/compiler-dom'

const excluded = new Set(['script', 'style', 'nav', 'form', 'input', 'button', 'svg', 'noscript', 'template'])
const block = new Set(['p', 'div', 'section', 'article', 'aside', 'figure', 'figcaption', 'details', 'summary', 'dl', 'dt', 'dd', 'blockquote'])
const attribute = (node, name) => node.props?.find(prop => prop.type === NodeTypes.ATTRIBUTE && prop.name === name)
const value = (node, name) => attribute(node, name)?.value?.content || ''
const label = text => text.replace(/[\\[\]]/g, '\\$&')

export const renderPublicMarkdown = (html, siteUrl) => {
  const root = parse(html)
  const findMain = node => node.tag === 'main' ? node : (node.children || []).map(findMain).find(Boolean)
  const main = findMain(root)
  if (!main) throw new Error('Public Markdown requires a main element')
  const url = path => {
    if (!path) return ''
    const parsed = new URL(path, siteUrl)
    return ['https:', 'http:', 'tel:', 'mailto:'].includes(parsed.protocol)
      ? parsed.href.replaceAll('(', '%28').replaceAll(')', '%29') : ''
  }
  const walk = node => {
    if (node.type === NodeTypes.TEXT) return node.content.replace(/\s+/g, ' ')
    if (node.type !== NodeTypes.ELEMENT && node.type !== NodeTypes.ROOT) return ''
    if (excluded.has(node.tag) || attribute(node, 'hidden') || value(node, 'aria-hidden') === 'true') return ''
    if (node.tag === 'img') {
      const src = url(value(node, 'src'))
      return src && value(node, 'alt') ? `\n\n![${label(value(node, 'alt'))}](${src})\n\n` : ''
    }
    if (node.tag === 'video') {
      const source = node.children.find(child => child.tag === 'source')
      const src = url(value(node, 'src') || (source && value(source, 'src')))
      return src ? `\n\n[${label(value(node, 'aria-label') || '影片')}](${src})\n\n` : ''
    }
    if (node.tag === 'br') return '\n'
    if (node.tag === 'ul' || node.tag === 'ol') {
      const items = node.children.filter(child => child.tag === 'li').map(walk).filter(text => text.trim())
      return '\n\n' + items.map((text, index) => `${node.tag === 'ol' ? `${index + 1}.` : '-'} ${text.trim().replace(/\n/g, '\n  ')}`).join('\n') + '\n\n'
    }
    const contents = (node.children || []).map(walk).join('')
    if (/^h[1-6]$/.test(node.tag)) return `\n\n${'#'.repeat(Number(node.tag[1]))} ${contents.trim().replace(/\s+/g, ' ')}\n\n`
    if (node.tag === 'a') {
      const href = url(value(node, 'href'))
      if (!href || !contents.trim()) return contents
      return contents.includes('\n') ? `${contents}\n\n${href}\n\n` : `[${label(contents.trim())}](${href})`
    }
    return block.has(node.tag) ? `\n\n${contents.trim()}\n\n` : contents
  }
  const markdown = walk(main).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
  const heading = markdown.match(/^# [^\n]+/m)?.[0]
  return heading && !markdown.startsWith(heading)
    ? `${heading}\n\n${markdown.replace(heading, '').replace(/\n{3,}/g, '\n\n').trim()}\n`
    : markdown + '\n'
}
