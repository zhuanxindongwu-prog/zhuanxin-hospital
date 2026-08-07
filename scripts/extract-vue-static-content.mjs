import fs from 'node:fs/promises'

import { NodeTypes, parse as parseTemplate } from '@vue/compiler-dom'
import { parse as parseSfc } from '@vue/compiler-sfc'

const contentTags = new Set(['h1', 'h2', 'h3', 'p', 'li', 'blockquote'])
const linkAttributes = new Set(['href', 'to'])

const normalizeText = (value = '') => value.replace(/\s+/g, ' ').trim()

const collectText = (node) => {
  if (node.type === NodeTypes.TEXT) return node.content
  if (node.type === NodeTypes.INTERPOLATION) return ''
  return (node.children || []).map(collectText).join(' ')
}

const getStaticLink = (node) => {
  if (node.type !== NodeTypes.ELEMENT) return null

  const attribute = node.props.find(
    (prop) => prop.type === NodeTypes.ATTRIBUTE && linkAttributes.has(prop.name) && prop.value?.content
  )
  const href = attribute?.value?.content
  if (!href?.startsWith('/') || href.startsWith('//')) return null

  const text = normalizeText(collectText(node))
  return text ? { href, text } : null
}

export const extractVueStaticContent = async (filename) => {
  const source = await fs.readFile(filename, 'utf8')
  const { descriptor, errors } = parseSfc(source, { filename })

  if (errors.length) {
    throw new Error(`Unable to parse ${filename}: ${errors.map(String).join(', ')}`)
  }
  if (!descriptor.template?.content) {
    return { items: [], links: [] }
  }

  const template = parseTemplate(descriptor.template.content)
  const items = []
  const links = []

  const visit = (node) => {
    const link = getStaticLink(node)
    if (link) links.push(link)

    if (node.type === NodeTypes.ELEMENT && contentTags.has(node.tag)) {
      const text = normalizeText(collectText(node))
      if (text) items.push({ tag: node.tag, text })
      return
    }

    for (const child of node.children || []) visit(child)
  }

  visit(template)

  return {
    items,
    links: links.filter(
      (link, index, allLinks) =>
        allLinks.findIndex((candidate) => candidate.href === link.href && candidate.text === link.text) === index
    )
  }
}
