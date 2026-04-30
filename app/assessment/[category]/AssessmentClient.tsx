'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import type { AssessmentConfig } from '@/lib/assessment-data'
import Logo from '@/components/ui/Logo'
import { EASE } from '@/lib/constants'

type Stage = 'questions' | 'analyzing' | 'results'
type Answers = Record<string, string | string[]>
type AnswerRecapItem = { label: string; value: string }
type PersonalizedResult = {
  dynamicHeadline: string
  narrativeSentence: string
  insights: string[]
  answerRecap: AnswerRecapItem[]
}
type BookingAssessmentContext = {
  source: 'assessment'
  capturedAt: string
  categorySlug: string
  categoryTitle: string
  answers: Answers
  responses: {
    questionId: string
    question: string
    selected: string[]
  }[]
  personalizedSummary: string[]
}


const BOOKING_ASSESSMENT_CONTEXT_KEY = 'assessmentBookingContext'

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      className="w-14 h-14"
    >
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="34" stroke="rgba(0,0,0,0.10)" strokeWidth="5" />
        <path
          d="M40 6 A34 34 0 0 1 74 40"
          stroke="#4DCCE8"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}


function formatList(items: string[]) {
  if (items.length <= 1) return items[0] ?? ''
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

function getAnswerLabels(config: AssessmentConfig, answers: Answers, questionId: string) {
  const question = config.questions.find((q) => q.id === questionId)
  if (!question) return []
  const answerValue = answers[questionId]
  if (!answerValue) return []

  const selectedIds = Array.isArray(answerValue) ? answerValue : [answerValue]
  return selectedIds
    .map((id) => question.options.find((opt) => opt.id === id)?.label)
    .filter((label): label is string => !!label)
}

function cleanTreatments(treatments: string[]): string[] {
  return treatments
    .filter((t) => !t.toLowerCase().includes('none') && !t.toLowerCase().includes('nothing'))
    .map((t) => t.toLowerCase())
}

type ParsedAnswers = {
  conditionLabel: string   // e.g. "Knee Pain", "Neuropathy" — from config.title
  severity: string
  duration: string
  radiating: string
  treatments: string[]
  isSevere: boolean
  isModerate: boolean
  isLong: boolean
  isShort: boolean
  hasRadiating: boolean
  noTreatment: boolean
  triedTreatments: boolean
  treatmentList: string
}

function parseAnswers(config: AssessmentConfig, answers: Answers): ParsedAnswers {
  const severity =
    getAnswerLabels(config, answers, 'severity')[0] ||
    getAnswerLabels(config, answers, 'impact')[0] ||
    ''
  const duration = getAnswerLabels(config, answers, 'duration')[0] || ''
  const radiating = getAnswerLabels(config, answers, 'radiating')[0] || ''
  const treatments = getAnswerLabels(config, answers, 'treatments')

  const sev = severity.toLowerCase()
  const dur = duration.toLowerCase()
  const isSevere = sev.includes('7') || sev.includes('severe') || sev.includes('significantly')
  const isModerate = sev.includes('4') || sev.includes('moderate') || sev.includes('noticeably')
  const isLong = dur.includes('1+') || dur.includes('year') || dur.includes('12')
  const isShort = dur.includes('< 6') || dur.includes('6 months')
  const hasRadiating = radiating.toLowerCase() === 'yes'
  const noTreatment =
    treatments.length === 0 ||
    treatments.some((t) => t.toLowerCase().includes('none') || t.toLowerCase().includes('nothing'))
  const triedTreatments = !noTreatment && treatments.length > 0
  const treatmentList = triedTreatments ? formatList(cleanTreatments(treatments)) : ''

  return {
    conditionLabel: config.title,
    severity,
    duration,
    radiating,
    treatments,
    isSevere,
    isModerate,
    isLong,
    isShort,
    hasRadiating,
    noTreatment,
    triedTreatments,
    treatmentList,
  }
}

function deriveDynamicHeadline(p: ParsedAnswers): string {
  if (p.isSevere && p.isLong && p.triedTreatments) return 'We may have an answer for you.'
  if (p.isSevere && p.noTreatment) return 'You came to the right place.'
  if (p.isLong && p.triedTreatments) return 'There may be more that can be done.'
  if (p.isShort && p.noTreatment) return 'You have good options ahead.'
  if (!p.isLong) return 'Let\'s find the right approach.'
  return 'Our team would like to learn more.'
}

function buildNarrativeSentence(p: ParsedAnswers): string {
  const { conditionLabel, isSevere, isModerate, isLong, isShort, hasRadiating, noTreatment, triedTreatments, treatmentList } = p
  const c = conditionLabel.toLowerCase()

  if (isSevere && isLong && triedTreatments) {
    return `You've been managing ${c} for over a year, and ${treatmentList} hasn't fully resolved it. That pattern often points to an underlying issue that image-guided treatment can address precisely — without major surgery.`
  }
  if (isSevere && noTreatment) {
    return `You're experiencing significant ${c} symptoms and haven't had a specialist evaluate them yet. Our team can help identify the source and walk you through the right options from day one.`
  }
  if (isModerate && isLong && triedTreatments) {
    return `${c} that hasn't responded to ${treatmentList} often has a root cause that conservative care can't fully reach. Our specialists use image-guided techniques to target it directly.`
  }
  if (hasRadiating) {
    return `${c} that travels into your arm or leg is a specific signal our specialists are trained to address — often without major surgery or extended recovery.`
  }
  if (isShort && noTreatment) {
    return `You're addressing this relatively early, which means you have the most options available. A consultation now can help you avoid a longer-term problem.`
  }
  if (triedTreatments) {
    return `You've already tried ${treatmentList} for your ${c} symptoms. When those haven't provided lasting relief, there are more targeted approaches our specialists can offer.`
  }
  return `Based on what you shared, your ${c} symptoms are something our specialists see and treat regularly — with approaches that are far less invasive than traditional surgery.`
}

function buildAnswerRecap(config: AssessmentConfig, answers: Answers): AnswerRecapItem[] {
  const items: AnswerRecapItem[] = []

  const severity = getAnswerLabels(config, answers, 'severity')[0] || getAnswerLabels(config, answers, 'impact')[0]
  if (severity) items.push({ label: 'Pain level', value: severity })

  const duration = getAnswerLabels(config, answers, 'duration')[0]
  if (duration) items.push({ label: 'Duration', value: duration })

  const treatments = getAnswerLabels(config, answers, 'treatments')
  const cleanedTreatments = cleanTreatments(treatments)
  if (cleanedTreatments.length > 0) {
    items.push({ label: 'Previously tried', value: formatList(cleanedTreatments) })
  } else if (treatments.length > 0) {
    items.push({ label: 'Prior treatment', value: 'None yet' })
  }

  return items
}

function buildPersonalizedResult(config: AssessmentConfig, answers: Answers): PersonalizedResult {
  const p = parseAnswers(config, answers)

  const insight1 = p.triedTreatments
    ? `Because ${p.treatmentList} hasn't fully resolved it, your specialist can focus on what's actually driving the symptoms — not just managing them.`
    : p.isSevere && p.isLong
      ? `Our team regularly works with patients who've been dealing with this for a long time — there are minimally invasive options that don't require major surgery.`
      : `Our specialists will review your specific situation and walk you through the least invasive path forward.`

  const insight2 = p.isLong
    ? `Most patients with a similar history avoid major surgery with our image-guided approach — and go home the same day.`
    : `Getting evaluated now gives you the most options and the best chance at a straightforward, non-surgical solution.`

  return {
    dynamicHeadline: deriveDynamicHeadline(p),
    narrativeSentence: buildNarrativeSentence(p),
    insights: [insight1, insight2],
    answerRecap: buildAnswerRecap(config, answers),
  }
}

function buildQuestionResponses(config: AssessmentConfig, answers: Answers) {
  return config.questions
    .map((question) => {
      const answerValue = answers[question.id]
      if (!answerValue) return null

      const selectedIds = Array.isArray(answerValue) ? answerValue : [answerValue]
      const selected = selectedIds
        .map((id) => question.options.find((opt) => opt.id === id)?.label)
        .filter((label): label is string => !!label)

      if (selected.length === 0) return null
      return {
        questionId: question.id,
        question: question.text,
        selected,
      }
    })
    .filter((item): item is NonNullable<typeof item> => !!item)
}

export default function AssessmentClient({ config }: { config: AssessmentConfig }) {
  const router = useRouter()
  const [stage, setStage] = useState<Stage>('questions')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [pendingMulti, setPendingMulti] = useState<string[]>([])

  const questions = config.questions
  const totalQuestions = questions.length
  const currentQuestion = questions[questionIndex]
  const personalizedResult = useMemo(() => buildPersonalizedResult(config, answers), [config, answers])
  const progressPct = stage === 'questions'
    ? ((questionIndex + 1) / totalQuestions) * 100
    : 100

  useEffect(() => {
    if (stage !== 'analyzing') return
    const timer = setTimeout(() => setStage('results'), 2500)
    return () => clearTimeout(timer)
  }, [stage])

  function advanceQuestion() {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((i) => i + 1)
    } else {
      setStage('analyzing')
    }
  }

  function handleSingleSelect(questionId: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
    setTimeout(advanceQuestion, 260)
  }

  function handleMultiToggle(optionId: string) {
    setPendingMulti((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    )
  }

  function handleMultiConfirm() {
    if (pendingMulti.length === 0) return
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: pendingMulti }))
    setPendingMulti([])
    setTimeout(advanceQuestion, 180)
  }

  function handleContinueToBooking() {
    const context: BookingAssessmentContext = {
      source: 'assessment',
      capturedAt: new Date().toISOString(),
      categorySlug: config.slug,
      categoryTitle: config.title,
      answers,
      responses: buildQuestionResponses(config, answers),
      personalizedSummary: personalizedResult.insights,
    }
    sessionStorage.setItem(BOOKING_ASSESSMENT_CONTEXT_KEY, JSON.stringify(context))
    router.push('/book?from=assessment')
  }

  const slideVariants = {
    enter: { opacity: 0, x: 18 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -18 },
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 pt-4 sm:pt-6">
        <div className="flex items-center justify-between py-3 mb-4">
          <Link href="/" className="inline-flex">
            <Logo
              variant="dark"
              width={160}
              height={44}
              className="h-7 w-auto opacity-90"
            />
          </Link>
          <Link
            href="/"
            className="text-[13px] text-black/35 hover:text-black/60 transition-colors tracking-wide"
          >
            Exit
          </Link>
        </div>

        <div className="mb-16">
          <div className="w-full h-[2px] bg-black/[0.07] rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-[#4DCCE8] rounded-full origin-left"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/35">
              {config.title}
            </span>
            {stage === 'questions' && (
              <span className="text-[11px] text-black/30 tracking-wide">
                {questionIndex + 1} / {totalQuestions}
              </span>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {stage === 'questions' && (
            <motion.div
              key={`q-${questionIndex}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: EASE }}
              className="text-center"
            >
              <h1 className="font-heading font-semibold text-[#111111] text-[clamp(24px,3.4vw,34px)] leading-[1.06] tracking-[-0.03em] mb-9">
                {currentQuestion.text}
              </h1>

              <OptionList
                question={currentQuestion}
                pendingMulti={pendingMulti}
                onSingle={(optId) => handleSingleSelect(currentQuestion.id, optId)}
                onMultiToggle={handleMultiToggle}
                onMultiConfirm={handleMultiConfirm}
              />
            </motion.div>
          )}

          {stage === 'analyzing' && (
            <motion.div
              key="analyzing"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.24, ease: EASE }}
              className="text-center pt-8"
            >
              <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-black/40 mb-4">
                Just a moment
              </p>
              <h2 className="font-heading font-semibold text-[#111111] text-[clamp(28px,4vw,42px)] leading-[1.04] tracking-[-0.04em] mb-3">
                We&apos;re analyzing your answers
              </h2>
              <p className="text-[#58514b] text-[17px] mb-9">This may take a few seconds</p>
              <div className="flex justify-center mb-10">
                <Spinner />
              </div>
            </motion.div>
          )}

          {stage === 'results' && (
            <motion.div
              key="results"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: EASE }}
              className="max-w-xl mx-auto"
            >
              {/* Headline */}
              <div className="mb-7">
                <p className="text-[11px] font-semibold tracking-[0.20em] uppercase text-[#9A9490] mb-4">
                  Your assessment summary
                </p>
                <h2
                  className="font-heading font-semibold text-[#0E0E0E] leading-[1.04] tracking-[-0.04em] mb-4"
                  style={{ fontSize: 'clamp(26px, 4vw, 38px)' }}
                >
                  {personalizedResult.dynamicHeadline}
                </h2>
                <p className="text-[#4A4440] text-[16px] leading-[1.7]">
                  {personalizedResult.narrativeSentence}
                </p>
              </div>

              {/* Answer recap — echoes their selections back */}
              {personalizedResult.answerRecap.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
                  className="rounded-2xl border border-black/[0.07] bg-white mb-6 overflow-hidden"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 14px rgba(0,0,0,0.04)' }}
                >
                  <div className="px-5 py-3 border-b border-black/[0.05]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A9490]">
                      Based on what you told us
                    </p>
                  </div>
                  <div className="divide-y divide-black/[0.05]">
                    {personalizedResult.answerRecap.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[13px] text-[#9A9490]">{label}</span>
                        <span className="text-[13px] font-medium text-[#1A1814] text-right max-w-[60%]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Insights */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.25 }}
                className="space-y-3 mb-8"
              >
                {personalizedResult.insights.map((insight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 rounded-xl px-4 py-3.5 bg-white border border-black/[0.06]"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#B8AA82] flex-shrink-0 mt-[7px]"
                    />
                    <p className="text-[14px] text-[#4A4440] leading-[1.65]">{insight}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
                className="border-t border-black/[0.07] pt-7"
              >
                <button
                  type="button"
                  onClick={handleContinueToBooking}
                  className="w-full rounded-xl py-4 text-[15px] font-semibold tracking-[-0.01em]
                             transition-all duration-200 active:scale-[0.99]
                             hover:opacity-90"
                  style={{
                    background: '#1A1814',
                    color: '#EDE6D8',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)',
                  }}
                >
                  Request My Consultation
                </button>
                <p className="text-center text-[12px] text-[#B8B2AE] mt-3 leading-relaxed">
                  Free · No commitment · Our team reviews every submission
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

type OptionListProps = {
  question: AssessmentConfig['questions'][number]
  pendingMulti: string[]
  onSingle: (optId: string) => void
  onMultiToggle: (optId: string) => void
  onMultiConfirm: () => void
}

function OptionList({
  question,
  pendingMulti,
  onSingle,
  onMultiToggle,
  onMultiConfirm,
}: OptionListProps) {
  const { options, multiSelect } = question
  const isMulti = !!multiSelect

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {options.map((opt) => {
        const selected = isMulti ? pendingMulti.includes(opt.id) : false
        const hasSecondary = !!opt.sub

        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => (isMulti ? onMultiToggle(opt.id) : onSingle(opt.id))}
            className="w-full rounded-2xl border px-5 py-4 text-left min-h-[74px]"
            animate={{
              backgroundColor: selected ? '#F2EFE9' : '#FFFFFF',
              borderColor: selected ? 'rgba(0,0,0,0.22)' : 'rgba(0,0,0,0.10)',
              boxShadow: selected
                ? '0 2px 8px rgba(0,0,0,0.08)'
                : '0 1px 2px rgba(0,0,0,0.04)',
            }}
            whileHover={{
              y: -1,
              boxShadow: selected
                ? '0 4px 12px rgba(0,0,0,0.10)'
                : '0 6px 20px rgba(0,0,0,0.08)',
              transition: { duration: 0.14 },
            }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.16 }}
          >
            <span
              className="block text-[18px] font-semibold leading-snug"
              style={{ color: '#1A1814' }}
            >
              {hasSecondary ? opt.sub : opt.label}
            </span>
            {hasSecondary && (
              <span
                className="block mt-1 text-[14px] leading-snug"
                style={{ color: '#6f6964' }}
              >
                {opt.label}
              </span>
            )}
          </motion.button>
        )
      })}

      {isMulti && (
        <button
          type="button"
          disabled={pendingMulti.length === 0}
          onClick={onMultiConfirm}
          className="w-full rounded-2xl py-3.5 text-[15px] font-semibold transition mt-1 disabled:cursor-not-allowed"
          style={{
            background: pendingMulti.length > 0 ? '#4DCCE8' : 'rgba(0,0,0,0.07)',
            color: pendingMulti.length > 0 ? '#07080C' : '#8f8a85',
          }}
        >
          Continue
        </button>
      )}
    </div>
  )
}
