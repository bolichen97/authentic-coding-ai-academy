import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const specPath = join(here, 'script.json')
const outputDir = join(here, 'assets', 'audio')
const voice = process.env.ACADEMY_VOICE || 'Tingting'
const gap = 0.45

mkdirSync(outputDir, { recursive: true })
const spec = JSON.parse(readFileSync(specPath, 'utf8'))

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...options })
  if (result.status !== 0) {
    throw new Error(`${command} 失败：${result.stderr || result.stdout}`)
  }
  return result.stdout.trim()
}

function duration(path) {
  const value = run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', path])
  return Number(Number(value).toFixed(3))
}

const lines = []
const parts = []
let time = 0

for (const [index, source] of spec.lines.entries()) {
  const number = String(index).padStart(2, '0')
  const raw = join(outputDir, `raw${number}.aiff`)
  const wav = join(outputDir, `line${number}.wav`)

  run('say', ['-v', voice, '-o', raw, source.say])
  run('ffmpeg', ['-y', '-i', raw, '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', wav])

  const dur = duration(wav)
  lines.push({ ...source, start: Number(time.toFixed(3)), dur, end: Number((time + dur).toFixed(3)) })
  parts.push(wav)
  time += dur + gap
  console.log(`line ${number}: ${dur}s`)
}

const gapFile = join(outputDir, 'gap.wav')
run('ffmpeg', ['-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', String(gap), '-c:a', 'pcm_s16le', gapFile])
const measuredGap = duration(gapFile)

const concatFile = join(outputDir, 'concat.txt')
const concat = []
for (const [index, part] of parts.entries()) {
  concat.push(`file '${part.split('/').at(-1)}'`)
  if (index < parts.length - 1) concat.push("file 'gap.wav'")
}
writeFileSync(concatFile, `${concat.join('\n')}\n`)

const narrationWav = join(outputDir, 'narration.wav')
run('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', concatFile, '-c:a', 'pcm_s16le', narrationWav], { cwd: outputDir })
const narration = join(outputDir, 'narration.mp3')
run('ffmpeg', ['-y', '-i', narrationWav, '-ar', '24000', '-ac', '1', '-q:a', '4', narration])

let cursor = 0
for (const line of lines) {
  line.start = Number(cursor.toFixed(3))
  line.end = Number((cursor + line.dur).toFixed(3))
  cursor += line.dur + measuredGap
}

const total = duration(narrationWav)
const timeline = {
  provider: 'macos-say',
  voice,
  gap: measuredGap,
  total,
  measured_total: duration(narration),
  lines,
}
writeFileSync(join(outputDir, 'narr.json'), `${JSON.stringify(timeline, null, 2)}\n`)

console.log(`完成：${resolve(narration)}`)
console.log(`时长：${timeline.measured_total}s`)
console.log(`时间线差值：${Math.abs(timeline.measured_total - timeline.total).toFixed(3)}s`)
