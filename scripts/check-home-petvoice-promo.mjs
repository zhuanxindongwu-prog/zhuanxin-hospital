import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const source = readFileSync(resolve(root, 'src/pages/Home.vue'), 'utf8')

const requiredSnippets = [
  'showPetVoicePromo',
  'PetVoice 居家生理監測',
  'role="dialog"',
  'aria-modal="true"',
  'aria-labelledby="petvoice-promo-title"',
  'to="/petvoice"',
  'Digital Health',
  'to="/articles/media/digital-health-veterinary-care-2026"',
  'petvoice-promo-topic-link',
  '/imgs/optimized/digital-health-alert.jpg',
  'grid-template-columns: minmax(0, 1fr) minmax(240px, 0.66fr)',
  'width: min(780px, 100%)',
  'object-fit: contain',
  'place-items: center',
  'max-height: min(74dvh, 560px)',
  'display: none',
  'font-size: clamp(1.35rem, 8vw, 1.75rem)',
  'border-radius: 18px',
  'handlePetVoicePromoKeydown',
  'Escape',
  '.petvoice-promo-overlay'
]

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet))

if (missing.length > 0) {
  console.error(`Home PetVoice promo check failed. Missing: ${missing.join(', ')}`)
  process.exit(1)
}

if (!existsSync(resolve(root, 'public/imgs/optimized/digital-health-alert.jpg'))) {
  console.error('Home PetVoice promo check failed. Missing optimized Digital Health alert image.')
  process.exit(1)
}

console.log('Home PetVoice promo check passed.')
