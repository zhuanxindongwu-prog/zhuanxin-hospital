import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distImages = path.resolve(__dirname, '../dist/imgs')

const replacedByOptimizedWebp = [
  'alger.png',
  'doubleQ.PNG',
  'moso.png',
  '傻狗.png',
  'bass.png',
  '毛孩的心臟.png',
  'simba.png',
  'milu.png',
  'lico.png',
  '冠勳的怪貓.png',
  'petvoice宣傳.png',
  '臭狗.png',
  'laiwate.jpg'
]

let removedBytes = 0

for (const filename of replacedByOptimizedWebp) {
  const target = path.join(distImages, filename)

  try {
    const stats = await fs.stat(target)
    await fs.unlink(target)
    removedBytes += stats.size
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

console.log(`Pruned ${(removedBytes / 1024 / 1024).toFixed(1)} MB of superseded image assets from dist`)
