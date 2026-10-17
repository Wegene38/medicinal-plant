import { useState } from 'react'
import { Link } from 'react-router-dom'
import { imageFor, PlantImage } from '../components/PlantImage'
import { plants } from '../data'
import type { Plant, Region } from '../data/types'
import { useLang } from '../i18n'
import { regionFlag, regionLabel } from '../i18n/strings'

const ROUND = 10
const BEST_KEY = 'mp.quizBest'

interface Question {
  answer: Plant
  options: Plant[]
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildRound(scope: Region | 'all'): Question[] {
  // Self-heal and 夏枯草 are the same species, so never offer both in one question.
  const pool = plants.filter((p) => imageFor(p.id) && (scope === 'all' || p.region === scope))
  return shuffle(pool)
    .slice(0, ROUND)
    .map((answer) => {
      const distractors = shuffle(pool.filter((p) => p.id !== answer.id && p.latin !== answer.latin)).slice(0, 3)
      return { answer, options: shuffle([answer, ...distractors]) }
    })
}

function readBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

export function Quiz() {
  const { t, l } = useLang()
  const [scope, setScope] = useState<Region | 'all'>('all')
  const [round, setRound] = useState<Question[] | null>(null)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(readBest)

  const start = () => {
    setRound(buildRound(scope))
    setIndex(0)
    setPicked(null)
    setScore(0)
  }

  if (!round) {
    return (
      <section className="quiz quiz--intro">
        <h1>❓ {t('quizTitle')}</h1>
        <p>{t('quizIntro')}</p>
        <p className="quiz__label">{t('quizRegion')}</p>
        <div className="segmented">
          {(['all', 'china', 'ireland'] as const).map((r) => (
            <button key={r} className={scope === r ? 'is-active' : ''} onClick={() => setScope(r)}>
              {r === 'all' ? t('all') : `${regionFlag[r]} ${l(regionLabel[r])}`}
            </button>
          ))}
        </div>
        {best > 0 && (
          <p className="quiz__best">
            🏆 {t('quizBest')}: {best} / {ROUND}
          </p>
        )}
        <button className="btn btn--primary btn--large" onClick={start}>
          {t('quizStart')}
        </button>
      </section>
    )
  }

  if (index >= round.length) {
    const total = round.length
    return (
      <section className="quiz quiz--result">
        <h1>{t('quizScore')}</h1>
        <p className="quiz__score">
          {score} / {total}
        </p>
        <p className="quiz__stars" aria-hidden>
          {'🌿'.repeat(Math.max(1, Math.round((score / total) * 5)))}
        </p>
        <button className="btn btn--primary btn--large" onClick={() => setRound(null)}>
          {t('quizAgain')}
        </button>
      </section>
    )
  }

  const q = round[index]
  const answered = picked !== null
  const isLast = index === round.length - 1

  const choose = (id: string) => {
    if (answered) return
    setPicked(id)
    if (id === q.answer.id) setScore((s) => s + 1)
  }

  const next = () => {
    if (isLast) {
      const finalScore = score
      if (finalScore > best) {
        setBest(finalScore)
        try {
          localStorage.setItem(BEST_KEY, String(finalScore))
        } catch {
          // ignore
        }
      }
    }
    setPicked(null)
    setIndex((i) => i + 1)
  }

  return (
    <section className="quiz">
      <div className="quiz__progress">
        <span>
          {index + 1} / {round.length}
        </span>
        <span>🌿 {score}</span>
      </div>
      <div className="progress">
        <div style={{ width: `${(index / round.length) * 100}%` }} />
      </div>
      <h2>{t('quizQuestion')}</h2>
      <div className="quiz__image">
        <PlantImage plant={q.answer} eager />
      </div>
      <div className="quiz__options">
        {q.options.map((o) => {
          const state = !answered ? '' : o.id === q.answer.id ? 'is-correct' : o.id === picked ? 'is-wrong' : 'is-dim'
          return (
            <button key={o.id} className={`option ${state}`} onClick={() => choose(o.id)} disabled={answered}>
              {regionFlag[o.region]} {l(o.name)}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`quiz__feedback ${picked === q.answer.id ? 'ok' : 'bad'}`}>
          <p>
            {picked === q.answer.id ? t('quizCorrect') : `${t('quizWrong')} ${l(q.answer.name)}`}
            {' · '}
            <i>{q.answer.latin}</i>
          </p>
          <p className="quiz__fact">{l(q.answer.summary)}</p>
          <div className="quiz__actions">
            <Link to={`/plant/${q.answer.id}`} className="btn btn--ghost">
              {t('viewDetail')}
            </Link>
            <button className="btn btn--primary" onClick={next}>
              {isLast ? t('quizFinish') : t('quizNext')} →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
