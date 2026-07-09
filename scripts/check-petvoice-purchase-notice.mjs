import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const source = readFileSync(resolve(root, 'src/components/PetVoice.vue'), 'utf8')

const requiredSnippets = [
  'purchaseNoticeItems',
  'purchase-notice-section',
  'PetVoice 台灣購買與保固說明',
  '台灣官方代理商',
  '台灣醫療專業版本',
  'Medical Version',
  '一年保固',
  '2026 年內購買',
  '一次性買斷制',
  '無須支付任何月租費或訂閱費用',
  'showPurchaseAlert',
  'purchase-alert-overlay',
  'role="dialog"',
  'aria-modal="true"',
  'handlePurchaseNoticeJump',
  'id="petvoice-purchase-notice"',
  '查看購買與保固說明'
]

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet))

if (missing.length > 0) {
  console.error(`PetVoice purchase notice check failed. Missing: ${missing.join(', ')}`)
  process.exit(1)
}

console.log('PetVoice purchase notice check passed.')
