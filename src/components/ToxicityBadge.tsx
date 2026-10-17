import type { Toxicity } from '../data/types'
import { useLang } from '../i18n'
import { toxicityLabel } from '../i18n/strings'

const icon: Record<Toxicity, string> = { safe: '✓', caution: '!', toxic: '☠' }

export function ToxicityBadge({ level, compact }: { level: Toxicity; compact?: boolean }) {
  const { l } = useLang()
  return (
    <span className={`tox tox--${level} ${compact ? 'tox--compact' : ''}`} title={l(toxicityLabel[level])}>
      <span aria-hidden>{icon[level]}</span> {l(toxicityLabel[level])}
    </span>
  )
}
