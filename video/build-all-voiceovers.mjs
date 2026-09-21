import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const here = dirname(fileURLToPath(import.meta.url))
const outputRoot = join(here, 'assets')
const renderRoot = join(here, 'renders')
const baseVideo = join(renderRoot, 'authentic-coding-ai-academy.mp4')
const timing = JSON.parse(readFileSync(join(here, 'assets', 'audio', 'narr.json'), 'utf8'))
const chinese = JSON.parse(readFileSync(join(here, 'script.json'), 'utf8'))
const english = JSON.parse(readFileSync(join(here, 'script.en.json'), 'utf8'))

const localeSpecs = {
  en: { label: 'English', voice: 'Samantha', iso639: 'eng', lines: english.lines.map(line => line.say) },
  'zh-CN': { label: '简体中文', voice: 'Tingting', iso639: 'zho', lines: chinese.lines.map(line => line.say) },
}
for (const locale of ['hi', 'es', 'fr', 'bn', 'pt', 'ru', 'de', 'ja', 'ko', 'it']) {
  localeSpecs[locale] = JSON.parse(readFileSync(join(here, `script.${locale}.json`), 'utf8'))
}

const supported = ['en', 'zh-CN', 'hi', 'es', 'fr', 'bn', 'pt', 'ru', 'de', 'ja', 'ko', 'it']
const requested = process.argv.slice(2)
const locales = requested.length ? requested : supported
if (locales.some(locale => !supported.includes(locale))) {
  throw new Error(`supported locales: ${supported.join(', ')}`)
}
if (timing.lines.length !== 24) throw new Error(`expected 24 timing lines, got ${timing.lines.length}`)

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  })
  if (result.status !== 0) {
    throw new Error(`${command} failed: ${result.stderr || result.stdout}`)
  }
  return result.stdout.trim()
}

function duration(path) {
  return Number(run('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    path,
  ]))
}

function buildAudio(locale, spec) {
  if (spec.lines.length !== timing.lines.length) {
    throw new Error(`${locale}: expected ${timing.lines.length} lines, got ${spec.lines.length}`)
  }
  const dir = join(outputRoot, `audio-${locale}`)
  mkdirSync(dir, { recursive: true })
  const parts = []
  const lineStats = []

  for (const [index, text] of spec.lines.entries()) {
    const number = String(index).padStart(2, '0')
    const raw = join(dir, `raw${number}.aiff`)
    const source = join(dir, `source${number}.wav`)
    const output = join(dir, `line${number}.wav`)
    const target = timing.lines[index].dur

    run('say', ['-v', spec.voice, '-o', raw, text])
    run('ffmpeg', ['-y', '-i', raw, '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', source])
    const original = duration(source)
    const speed = original > target ? original / target : 1
    if (speed > 1.5) {
      throw new Error(`${locale} line ${number} needs ${speed.toFixed(2)}x speech; shorten its text`)
    }
    const filters = []
    if (speed > 1.001) filters.push(`atempo=${speed.toFixed(6)}`)
    filters.push(`apad=pad_dur=${target.toFixed(3)}`)
    run('ffmpeg', [
      '-y', '-i', source,
      '-af', filters.join(','),
      '-t', target.toFixed(3),
      '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', output,
    ])
    parts.push(output)
    lineStats.push({ index, target, original: Number(original.toFixed(3)), speed: Number(speed.toFixed(3)) })
  }

  const gapFile = join(dir, 'gap.wav')
  run('ffmpeg', [
    '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono',
    '-t', String(timing.gap), '-c:a', 'pcm_s16le', gapFile,
  ])
  const concatFile = join(dir, 'concat.txt')
  const concat = []
  for (const [index, part] of parts.entries()) {
    concat.push(`file '${basename(part)}'`)
    if (index < parts.length - 1) concat.push(`file '${basename(gapFile)}'`)
  }
  writeFileSync(concatFile, `${concat.join('\n')}\n`)

  const wav = join(dir, 'narration.wav')
  const mp3 = join(dir, 'narration.mp3')
  run('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', concatFile, '-c:a', 'pcm_s16le', wav], { cwd: dir })
  run('ffmpeg', ['-y', '-i', wav, '-ar', '24000', '-ac', '1', '-q:a', '4', mp3])
  writeFileSync(join(dir, 'manifest.json'), `${JSON.stringify({
    locale,
    label: spec.label,
    voice: spec.voice,
    duration: Number(duration(mp3).toFixed(3)),
    maxSpeed: Math.max(...lineStats.map(line => line.speed)),
    lines: lineStats,
  }, null, 2)}\n`)
  return mp3
}

function buildVideo(locale, spec, audio) {
  const output = join(renderRoot, `authentic-coding-ai-academy-${locale}.mp4`)
  run('ffmpeg', [
    '-y', '-i', baseVideo, '-i', audio,
    '-map', '0:v:0', '-map', '1:a:0',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k',
    '-metadata:s:a:0', `language=${spec.iso639}`,
    '-metadata:s:a:0', `title=${spec.label}`,
    '-movflags', '+faststart', output,
  ])
  return output
}

mkdirSync(renderRoot, { recursive: true })
const results = []
for (const locale of locales) {
  const spec = localeSpecs[locale]
  if (locale === 'zh-CN') {
    const output = join(renderRoot, 'authentic-coding-ai-academy-zh-CN.mp4')
    run('ffmpeg', [
      '-y', '-i', baseVideo,
      '-map', '0:v:0', '-map', '0:a:0', '-c', 'copy',
      '-metadata:s:a:0', `language=${spec.iso639}`,
      '-metadata:s:a:0', `title=${spec.label}`,
      '-movflags', '+faststart', output,
    ])
    results.push({ locale, label: spec.label, voice: spec.voice, output })
    continue
  }
  const audio = buildAudio(locale, spec)
  const output = buildVideo(locale, spec, audio)
  results.push({ locale, label: spec.label, voice: spec.voice, output })
  console.log(`${locale}: ${output}`)
}
writeFileSync(join(renderRoot, 'voiceovers.json'), `${JSON.stringify(results, null, 2)}\n`)
console.log(`complete: ${results.length} languages`)
