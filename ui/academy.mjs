import { useEffect, useMemo, useRef, useState } from 'react'
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { courseMeta, lessons } from './course-data.mjs'

const STORAGE_KEY = 'authentic-coding-ai-academy-progress-v1'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const S = {
  root: { height: '100%', minHeight: 'calc(100vh - 24px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', color: 'var(--text)', background: 'var(--bg)' },
  header: { flex: '0 0 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', padding: '0 18px', borderBottom: '1px solid var(--border)', background: 'var(--card)' },
  body: { flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '238px minmax(520px, 1fr) 336px' },
  sidebar: { minHeight: 0, overflowY: 'auto', padding: '12px', borderRight: '1px solid var(--border)', background: 'var(--card)' },
  main: { minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg)' },
  inspector: { minHeight: 0, overflowY: 'auto', padding: '13px', borderLeft: '1px solid var(--border)', background: 'var(--card)' },
  card: { border: '1px solid var(--border)', borderRadius: '9px', background: 'var(--card)' },
  pill: { display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '9999px', fontSize: '10px', fontWeight: 650, color: 'var(--muted)', background: 'transparent' },
  button: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', minHeight: '30px', padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '9999px', fontSize: '11px', fontWeight: 650, color: 'var(--text)', background: 'transparent', cursor: 'pointer' },
  primary: { color: 'var(--accent-fg, #fff)', background: 'var(--accent)', borderColor: 'var(--accent)' },
}

const icons = {
  bulb: ['M9 18h6M10 22h4', 'M8.5 14.5A7 7 0 1 1 15.5 14.5C14.5 15.4 14 16.2 14 18h-4c0-1.8-.5-2.6-1.5-3.5Z'],
  play: ['m9 7 8 5-8 5V7Z'],
  check: ['m5 12 4 4L19 6'],
  reset: ['M20 11a8 8 0 1 0-2.3 5.7', 'M20 4v7h-7'],
  code: ['m8 9-4 3 4 3', 'm8 9 4 3-4 3'],
  book: ['M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 2V5Z', 'M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 2V5Z'],
  film: ['M3 5h18v14H3z', 'M7 5v14M17 5v14M3 9h4M17 9h4M3 15h4M17 15h4'],
  terminal: ['m5 7 4 4-4 4', 'M11 15h6'],
}

function Icon({ name, size = 16 }) {
  return _jsx('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, children: (icons[name] || icons.bulb).map((d, index) => _jsx('path', { d }, index)) })
}

function AppButton({ children, primary = false, disabled = false, onClick, title }) {
  return _jsx('button', { onClick, disabled, title, style: { ...S.button, ...(primary ? S.primary : {}), opacity: disabled ? .55 : 1, cursor: disabled ? 'default' : 'pointer' }, children })
}

function ProgressBar({ value }) {
  return _jsx('div', { style: { height: '6px', overflow: 'hidden', borderRadius: '9999px', background: 'var(--border)' }, children: _jsx('span', { style: { display: 'block', width: `${Math.max(0, Math.min(100, value))}%`, height: '100%', borderRadius: 'inherit', background: 'var(--accent)', transition: 'width .3s ease' } }) })
}

function LessonList({ selected, completed, onSelect }) {
  return _jsxs('aside', { style: S.sidebar, children: [
    _jsxs('div', { style: { padding: '2px 7px 11px' }, children: [_jsx('div', { style: { fontSize: '11px', fontWeight: 750 }, children: '实验课程' }), _jsx('div', { style: { marginTop: '3px', fontSize: '10px', color: 'var(--muted)' }, children: '每课只加一个能力' })] }),
    ...lessons.map((lesson, index) => {
      const active = selected === index
      const done = Boolean(completed[lesson.id])
      return _jsxs('button', { onClick: () => onSelect(index), style: { width: '100%', display: 'grid', gridTemplateColumns: '32px 1fr 16px', alignItems: 'center', gap: '7px', padding: '9px 8px', marginBottom: '5px', textAlign: 'left', border: '1px solid', borderColor: active ? 'var(--accent)' : 'transparent', borderRadius: '8px', color: 'var(--text)', background: active ? 'var(--accent-subtle)' : 'transparent', cursor: 'pointer' }, children: [
        _jsx('span', { style: { fontSize: '10px', fontWeight: 700, color: active ? 'var(--accent)' : 'var(--muted)' }, children: lesson.id }),
        _jsxs('span', { children: [_jsx('span', { style: { display: 'block', fontSize: '11px', fontWeight: 650 }, children: lesson.title }), _jsx('span', { style: { display: 'block', marginTop: '2px', fontSize: '9px', color: 'var(--muted)' }, children: lesson.subtitle })] }),
        done ? _jsx('span', { style: { color: 'var(--ok, #35b98f)' }, children: _jsx(Icon, { name: 'check', size: 14 }) }) : _jsx('span', { style: { width: '7px', height: '7px', justifySelf: 'center', borderRadius: '50%', background: active ? 'var(--accent)' : 'var(--border)' } })
      ] }, lesson.id)
    })
  ] })
}

function LessonHeader({ lesson, tab, setTab }) {
  const tabs = [['learn', 'book', '1 讲解'], ['lab', 'code', '2 实验'], ['video', 'film', '3 视频']]
  return _jsxs('div', { style: { flex: '0 0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '18px', padding: '16px 20px 0', borderBottom: '1px solid var(--border)' }, children: [
    _jsxs('div', { style: { paddingBottom: '13px' }, children: [_jsx('span', { style: { ...S.pill, color: 'var(--accent)', borderColor: 'var(--accent)' }, children: `实验 ${lesson.id}` }), _jsx('h1', { style: { margin: '9px 0 3px', fontSize: '20px', lineHeight: 1.2 }, children: lesson.title }), _jsx('p', { style: { margin: 0, fontSize: '10px', color: 'var(--muted)' }, children: `${lesson.duration} · ${lesson.goal}` })] }),
    _jsx('div', { style: { display: 'flex', gap: '5px' }, children: tabs.map(([key, icon, label]) => _jsxs('button', { onClick: () => setTab(key), style: { display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 11px', border: 0, borderBottom: `2px solid ${tab === key ? 'var(--accent)' : 'transparent'}`, color: tab === key ? 'var(--accent)' : 'var(--muted)', background: 'transparent', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }, children: [_jsx(Icon, { name: icon, size: 14 }), label] }, key)) })
  ] })
}

function LabView({ lesson, code, setCode, run, onRun, onReset }) {
  return _jsxs('div', { style: { height: '100%', minHeight: 0, display: 'grid', gridTemplateRows: 'auto minmax(260px, 1fr) 150px', gap: '10px', padding: '12px 14px' }, children: [
    _jsxs('div', { style: { ...S.card, padding: '11px 13px', display: 'flex', justifyContent: 'space-between', gap: '14px', alignItems: 'center' }, children: [_jsxs('div', { children: [_jsx('div', { style: { fontSize: '11px', fontWeight: 750 }, children: '本课任务' }), _jsx('div', { style: { marginTop: '3px', fontSize: '10px', color: 'var(--muted)' }, children: lesson.story })] }), _jsx('span', { style: S.pill, children: `+${lesson.xp} XP` })] }),
    _jsxs('div', { style: { ...S.card, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }, children: [
      _jsxs('div', { style: { flex: '0 0 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }, children: [_jsxs('span', { style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }, children: [_jsx(Icon, { name: 'code', size: 13 }), 'agent.js'] }), _jsx('span', { style: { fontSize: '9px', color: 'var(--muted)' }, children: '教学沙箱 · 不写真实文件' })] }),
      _jsx('textarea', { value: code, onChange: event => setCode(event.target.value), spellCheck: false, 'aria-label': '课程代码编辑器', style: { flex: 1, minHeight: 0, width: '100%', resize: 'none', padding: '15px', border: 0, outline: 0, color: 'var(--text)', background: 'var(--bg)', font: '11px/1.65 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', tabSize: 2 } }),
      _jsxs('div', { style: { flex: '0 0 42px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 9px', borderTop: '1px solid var(--border)' }, children: [_jsx('span', { style: { fontSize: '9px', color: 'var(--muted)' }, children: run.status === 'done' ? '实验完成' : '修改代码，再运行实验' }), _jsxs('div', { style: { display: 'flex', gap: '6px' }, children: [_jsx(AppButton, { onClick: onReset, children: _jsxs('span', { style: { display: 'flex', gap: '5px', alignItems: 'center' }, children: [_jsx(Icon, { name: 'reset', size: 13 }), '还原'] }) }), _jsx(AppButton, { primary: true, disabled: run.status === 'running', onClick: onRun, children: _jsxs('span', { style: { display: 'flex', gap: '5px', alignItems: 'center' }, children: [_jsx(Icon, { name: 'play', size: 13 }), run.status === 'running' ? '运行中' : '运行实验'] }) })] })] })
    ] }),
    _jsxs('div', { style: { ...S.card, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }, children: [_jsxs('div', { style: { padding: '8px 11px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsxs('span', { style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700 }, children: [_jsx(Icon, { name: 'terminal', size: 13 }), '运行结果'] }), _jsx('span', { style: { ...S.pill, color: run.status === 'done' ? 'var(--ok, #35b98f)' : 'var(--muted)' }, children: run.status === 'running' ? '运行中' : run.status === 'done' ? '通过' : '等待' })] }), _jsx('pre', { style: { flex: 1, overflow: 'auto', margin: 0, padding: '11px', color: run.status === 'done' ? 'var(--ok, #35b98f)' : 'var(--muted)', font: '10px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace', whiteSpace: 'pre-wrap' }, children: run.output || '点击“运行实验”查看每一步。' })] })
  ] })
}

function LearnView({ lesson, choice, onChoice }) {
  const answered = choice !== null
  return _jsxs('div', { style: { height: '100%', overflowY: 'auto', padding: '16px 20px' }, children: [
    _jsxs('div', { style: { ...S.card, padding: '17px', marginBottom: '12px' }, children: [_jsx('div', { style: { fontSize: '12px', fontWeight: 750 }, children: '三个新词' }), _jsx('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '9px', marginTop: '11px' }, children: lesson.concepts.map(([term, meaning]) => _jsxs('div', { style: { padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg)' }, children: [_jsx('div', { style: { color: 'var(--accent)', fontSize: '11px', fontWeight: 750 }, children: term }), _jsx('div', { style: { marginTop: '5px', fontSize: '10px', lineHeight: 1.5, color: 'var(--muted)' }, children: meaning })] }, term)) })] }),
    _jsxs('div', { style: { ...S.card, padding: '17px' }, children: [_jsx('div', { style: { fontSize: '12px', fontWeight: 750 }, children: '马上检查' }), _jsx('p', { style: { margin: '7px 0 10px', fontSize: '11px', color: 'var(--muted)' }, children: lesson.challenge.question }), _jsx('div', { style: { display: 'grid', gap: '7px' }, children: lesson.challenge.options.map((option, index) => { const selected = choice === index; const correct = index === lesson.challenge.correct; return _jsx('button', { onClick: () => onChoice(index), style: { padding: '10px 11px', textAlign: 'left', border: '1px solid', borderColor: selected ? (correct ? 'var(--ok, #35b98f)' : 'var(--danger, #dc5c72)') : 'var(--border)', borderRadius: '8px', color: 'var(--text)', background: selected ? (correct ? 'var(--ok-subtle, rgba(53,185,143,.12))' : 'var(--danger-subtle)') : 'var(--bg)', fontSize: '10px', cursor: 'pointer' }, children: `${String.fromCharCode(65 + index)} · ${option}` }, option) }) }), answered ? _jsx('div', { style: { marginTop: '10px', padding: '10px', borderRadius: '8px', color: choice === lesson.challenge.correct ? 'var(--ok, #35b98f)' : 'var(--danger, #dc5c72)', background: choice === lesson.challenge.correct ? 'var(--ok-subtle, rgba(53,185,143,.1))' : 'var(--danger-subtle)', fontSize: '10px' }, children: choice === lesson.challenge.correct ? lesson.challenge.success : lesson.challenge.retry }) : null] })
  ] })
}

function VideoView({ lesson, playing, videoStep, onPlay }) {
  const done = !playing && videoStep === lesson.video.length - 1 && videoStep > 0
  return _jsxs('div', { style: { height: '100%', minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(260px, .6fr)', gap: '12px', padding: '14px' }, children: [
    _jsxs('div', { style: { ...S.card, minHeight: '360px', position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 70% 22%, var(--accent-subtle), transparent 28%), var(--card)' }, children: [_jsxs('div', { style: { maxWidth: '520px', padding: '28px', textAlign: 'center' }, children: [_jsx('div', { style: { width: '58px', height: '58px', margin: '0 auto 16px', display: 'grid', placeItems: 'center', borderRadius: '50%', color: 'var(--accent-fg, #fff)', background: done ? 'var(--ok, #35b98f)' : 'var(--accent)' }, children: _jsx(Icon, { name: done ? 'check' : playing ? 'film' : 'play', size: 24 }) }), _jsx('div', { style: { fontSize: '10px', color: done ? 'var(--ok, #35b98f)' : 'var(--accent)', letterSpacing: '.14em', fontWeight: 750 }, children: done ? 'LESSON COMPLETE' : `LESSON ${lesson.id}` }), _jsx('h2', { style: { margin: '9px 0 7px', fontSize: '24px' }, children: lesson.title }), _jsx('p', { style: { margin: 0, color: 'var(--muted)', fontSize: '11px', lineHeight: 1.6 }, children: playing ? lesson.video[Math.min(videoStep, lesson.video.length - 1)] : done ? '本课视频已看完。你可以重播，或继续实验。' : lesson.teacher }), _jsx('div', { style: { marginTop: '17px' }, children: _jsx(AppButton, { primary: true, disabled: playing, onClick: onPlay, children: playing ? '正在播放' : done ? '再次播放' : '播放本课' }) })] }), _jsx('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0 }, children: _jsx(ProgressBar, { value: done ? 100 : playing ? ((videoStep + 1) / lesson.video.length) * 100 : 0 }) })] }),
    _jsxs('div', { style: { ...S.card, padding: '14px', overflowY: 'auto' }, children: [_jsx('div', { style: { fontSize: '11px', fontWeight: 750 }, children: '视频章节' }), _jsx('div', { style: { display: 'grid', gap: '7px', marginTop: '10px' }, children: lesson.video.map((line, index) => _jsxs('div', { style: { display: 'grid', gridTemplateColumns: '24px 1fr', gap: '8px', padding: '9px', border: '1px solid', borderColor: playing && index === videoStep ? 'var(--accent)' : done ? 'var(--ok, #35b98f)' : 'var(--border)', borderRadius: '8px', background: playing && index === videoStep ? 'var(--accent-subtle)' : 'var(--bg)' }, children: [_jsx('span', { style: { fontSize: '9px', color: done ? 'var(--ok, #35b98f)' : 'var(--accent)' }, children: done ? '✓' : String(index + 1).padStart(2, '0') }), _jsx('span', { style: { fontSize: '10px', lineHeight: 1.5 }, children: line })] }, line)) })] })
  ] })
}

function Inspector({ lesson, run, choice }) {
  return _jsxs('aside', { style: S.inspector, children: [
    _jsxs('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }, children: [_jsx('div', { style: { fontSize: '12px', fontWeight: 750 }, children: '学习反馈' }), _jsxs('span', { style: { ...S.pill, color: 'var(--ok, #35b98f)' }, children: [_jsx('span', { style: { width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' } }), '本地演示'] })] }),
    _jsx('div', { style: { display: 'grid', gap: '7px' }, children: lesson.flow.map((step, index) => { const done = run.active > index || run.status === 'done'; const active = run.status === 'running' && run.active === index; return _jsxs('div', { style: { display: 'grid', gridTemplateColumns: '25px 1fr auto', gap: '8px', alignItems: 'center', padding: '9px', border: '1px solid', borderColor: active ? 'var(--accent)' : 'var(--border)', borderRadius: '8px', background: active ? 'var(--accent-subtle)' : 'var(--bg)' }, children: [_jsx('span', { style: { width: '23px', height: '23px', display: 'grid', placeItems: 'center', borderRadius: '7px', color: done ? 'var(--ok, #35b98f)' : active ? 'var(--accent)' : 'var(--muted)', border: '1px solid var(--border)', fontSize: '9px' }, children: done ? _jsx(Icon, { name: 'check', size: 12 }) : index + 1 }), _jsx('span', { style: { fontSize: '10px', fontWeight: 650 }, children: step }), _jsx('span', { style: { fontSize: '9px', color: active ? 'var(--accent)' : done ? 'var(--ok, #35b98f)' : 'var(--muted)' }, children: active ? '运行' : done ? '完成' : '等待' })] }, step) }) }),
    _jsxs('div', { style: { ...S.card, marginTop: '11px', padding: '11px' }, children: [_jsx('div', { style: { fontSize: '10px', color: 'var(--muted)' }, children: '老师提示' }), _jsx('p', { style: { margin: '6px 0 0', fontSize: '10px', lineHeight: 1.55 }, children: lesson.teacher })] }),
    _jsxs('div', { style: { ...S.card, marginTop: '11px', padding: '11px' }, children: [_jsx('div', { style: { fontSize: '10px', color: 'var(--muted)' }, children: '本课状态' }), _jsx('div', { style: { marginTop: '7px', fontSize: '11px', fontWeight: 700, color: run.status === 'done' || choice === lesson.challenge.correct ? 'var(--ok, #35b98f)' : 'var(--text)' }, children: run.status === 'done' && choice === lesson.challenge.correct ? '本课已完成' : run.status === 'done' ? '实验通过，还需完成小测' : choice === lesson.challenge.correct ? '小测通过，还需完成实验' : '等待你的操作' })] }),
    _jsx('div', { style: { marginTop: '12px', fontSize: '9px', lineHeight: 1.5, color: 'var(--muted)' }, children: courseMeta.privacy })
  ] })
}

export default function AcademyApp() {
  const [selected, setSelected] = useState(0)
  const [completed, setCompleted] = useState({})
  const [tab, setTab] = useState('learn')
  const [code, setCode] = useState(lessons[0].code)
  const [choice, setChoice] = useState(null)
  const [labPassed, setLabPassed] = useState(false)
  const [run, setRun] = useState({ status: 'idle', active: -1, output: '' })
  const [playing, setPlaying] = useState(false)
  const [videoStep, setVideoStep] = useState(0)
  const [resetArmed, setResetArmed] = useState(false)
  const hydrated = useRef(false)
  const lesson = lessons[selected]

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.completed) setCompleted(saved.completed)
      if (Number.isInteger(saved.selected) && lessons[saved.selected]) setSelected(saved.selected)
    } catch {}
    hydrated.current = true
  }, [])

  useEffect(() => {
    setCode(lesson.code)
    setChoice(null)
    setLabPassed(false)
    setRun({ status: 'idle', active: -1, output: '' })
    setPlaying(false)
    setVideoStep(0)
    setResetArmed(false)
    setTab('learn')
    if (hydrated.current) localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, completed }))
  }, [selected])

  useEffect(() => {
    if (hydrated.current) localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, completed }))
  }, [completed])

  const completedCount = Object.keys(completed).length
  const xp = useMemo(() => lessons.reduce((sum, item) => sum + (completed[item.id] ? item.xp : 0), 0), [completed])
  const progress = (completedCount / lessons.length) * 100

  function markCompleteIfReady(nextLabPassed, nextChoice) {
    if (nextLabPassed && nextChoice === lesson.challenge.correct) {
      setCompleted(current => ({ ...current, [lesson.id]: true }))
    }
  }

  function runExperiment() {
    const trace = lesson.flow.map(step => `✓ ${step}`).join('\n')
    setRun({ status: 'done', active: lesson.flow.length, output: `${trace}\n\n${lesson.output}` })
    setLabPassed(true)
    markCompleteIfReady(true, choice)
  }

  function answerQuestion(index) {
    setChoice(index)
    markCompleteIfReady(labPassed, index)
  }

  function resetLesson() {
    setCode(lesson.code)
    setRun({ status: 'idle', active: -1, output: '' })
    setLabPassed(false)
  }

  function resetCourse() {
    if (!resetArmed) {
      setResetArmed(true)
      return
    }
    setCompleted({})
    setSelected(0)
    setResetArmed(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  async function playVideo() {
    setPlaying(true)
    for (let index = 0; index < lesson.video.length; index += 1) {
      setVideoStep(index)
      await sleep(1100)
    }
    setPlaying(false)
  }

  return _jsxs('div', { style: S.root, children: [
    _jsxs('header', { style: S.header, children: [
      _jsxs('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', minWidth: '260px' }, children: [_jsx('span', { style: { width: '34px', height: '34px', display: 'grid', placeItems: 'center', borderRadius: '10px', color: 'var(--accent)', background: 'var(--accent-subtle)', border: '1px solid var(--border)' }, children: _jsx(Icon, { name: 'bulb', size: 19 }) }), _jsxs('span', { children: [_jsx('span', { style: { display: 'block', fontSize: '15px', fontWeight: 750 }, children: courseMeta.title }), _jsx('span', { style: { display: 'block', marginTop: '2px', fontSize: '9px', color: 'var(--muted)' }, children: courseMeta.subtitle })] })] }),
      _jsxs('div', { style: { flex: 1, maxWidth: '440px' }, children: [_jsxs('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '9px', color: 'var(--muted)' }, children: [_jsx('span', { children: `总进度 ${completedCount} / ${lessons.length}` }), _jsx('span', { children: `${Math.round(progress)}%` })] }), _jsx(ProgressBar, { value: progress })] }),
      _jsxs('div', { style: { display: 'flex', alignItems: 'center', gap: '7px' }, children: [_jsx('span', { style: S.pill, children: `${xp} / ${courseMeta.totalXp} XP` }), _jsx(AppButton, { onClick: resetCourse, title: resetArmed ? '再次点击清除全部进度' : '重置学习进度', children: _jsxs('span', { style: { display: 'flex', alignItems: 'center', gap: '5px' }, children: [_jsx(Icon, { name: 'reset', size: 13 }), resetArmed ? '确认重置' : '重置'] }) })] })
    ] }),
    _jsxs('div', { style: S.body, children: [
      _jsx(LessonList, { selected, completed, onSelect: setSelected }),
      _jsxs('main', { style: S.main, children: [_jsx(LessonHeader, { lesson, tab, setTab }), _jsx('div', { style: { flex: 1, minHeight: 0 }, children: tab === 'lab' ? _jsx(LabView, { lesson, code, setCode, run, onRun: runExperiment, onReset: resetLesson }) : tab === 'learn' ? _jsx(LearnView, { lesson, choice, onChoice: answerQuestion }) : _jsx(VideoView, { lesson, playing, videoStep, onPlay: playVideo }) })] }),
      _jsx(Inspector, { lesson, run, choice })
    ] })
  ] })
}
