import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const spec = JSON.parse(readFileSync(join(here, 'script.en.json'), 'utf8'))
let html = readFileSync(join(here, 'index.html'), 'utf8')

function replaceOnce(from, to) {
  const first = html.indexOf(from)
  if (first < 0 || html.indexOf(from, first + from.length) >= 0) {
    throw new Error(`expected one match for: ${from}`)
  }
  html = `${html.slice(0, first)}${to}${html.slice(first + from.length)}`
}

const intro = spec.lines.filter(line => line.role === 'intro')
const outro = spec.lines.find(line => line.role === 'outro')
const footage = spec.lines.filter(line => line.role === 'footage')

replaceOnce('<html lang="zh-CN"', '<html lang="en-US"')
replaceOnce('从一问一答开始', intro[0].title)
replaceOnce('十步做出会读、会改、会验证的 Coding AI', intro[0].sub)
replaceOnce('学习方法', intro[1].eyebrow)
replaceOnce('每次只加一个能力', intro[1].title)
replaceOnce('看懂，动手，得到反馈，再进入下一课', intro[1].sub)
replaceOnce('受控动作，加上验证证据', outro.sub)
replaceOnce('src="assets/audio/narration.mp3"', 'src="assets/audio-en/narration.mp3"')

const blockPattern = /    const CAPS=\[\n([\s\S]*?)\n    \];/
const block = html.match(blockPattern)
if (!block) throw new Error('caption block not found')
const rowPattern = /\{t:([0-9.]+),d:([0-9.]+),x:"(?:[^"\\]|\\.)*"\}/g
const rows = [...block[1].matchAll(rowPattern)]
if (rows.length !== footage.length) {
  throw new Error(`expected ${footage.length} captions, got ${rows.length}`)
}
const captions = rows.map((row, index) => (
  `    {t:${row[1]},d:${row[2]},x:${JSON.stringify(footage[index].cap)}}`
)).join(',\n')
html = html.replace(blockPattern, `    const CAPS=[\n${captions}\n    ];`)

const output = join(here, 'renders', 'index.en.html')
writeFileSync(output, html)
console.log(output)
