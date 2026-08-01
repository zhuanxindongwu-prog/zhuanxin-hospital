import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const source = readFileSync(resolve(root, 'src/pages/Home.vue'), 'utf8')

const forbiddenSnippets = [
  'showPetVoicePromo',
  'petvoice-promo-topic-link',
  'petvoice-promo-qr-card',
  'handlePetVoicePromoKeydown',
  'petvoice-promo-overlay',
  'petvoice-promo-open',
  '<Teleport to="body">'
]

const present = forbiddenSnippets.filter((snippet) => source.includes(snippet))

if (present.length > 0) {
  console.error(`Home PetVoice promo removal check failed. Still present: ${present.join(', ')}`)
  process.exit(1)
}

console.log('Home PetVoice promo removal check passed.')
