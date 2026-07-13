import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const source = readFileSync(resolve(root, 'src/pages/Home.vue'), 'utf8')

const requiredSnippets = [
  'home-index',
  'index-director',
  'indexCarePaths',
  '把症狀、檢查與長期照護接起來',
  '心臟超音波',
  '犬貓腫瘤門診',
  'PetVoice 居家監測',
  '台北市中正區仁愛路一段47號',
  '02-2363-3016',
  "to: '/services/veterinary-cardiology'",
  "to: '/services/echocardiography'",
  "to: '/services/veterinary-oncology'",
  "to: '/petvoice'",
  'to="/doctor-schedule"'
]

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet))

if (missing.length > 0) {
  console.error(`Home index redesign check failed. Missing: ${missing.join(', ')}`)
  process.exit(1)
}

console.log('Home index redesign check passed.')
