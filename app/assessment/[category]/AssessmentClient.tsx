'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'
import type { AssessmentConfig } from '@/lib/assessment-data'
import Logo from '@/components/ui/Logo'
import { EASE } from '@/lib/constants'

type Stage = 'questions' | 'analyzing' | 'results'
type Answers = Record<string, string | string[]>
type PersonalizedResult = {
  stats: string[]
  dynamicHeadline: string
  narrativeSentence: string
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
  concern: string
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
  const primaryConcern =
    getAnswerLabels(config, answers, 'location')[0] ||
    getAnswerLabels(config, answers, 'concern')[0] ||
    getAnswerLabels(config, answers, 'type')[0] ||
    ''
  const severity =
    getAnswerLabels(config, answers, 'severity')[0] || getAnswerLabels(config, answers, 'impact')[0] || ''
  const duration = getAnswerLabels(config, answers, 'duration')[0] || ''
  const radiating = getAnswerLabels(config, answers, 'radiating')[0] || ''
  const treatments = getAnswerLabels(config, answers, 'treatments')

  const sev = severity.toLowerCase()
  const dur = duration.toLowerCase()
  const isSevere = sev.includes('7') || sev.includes('severe') || sev.includes('significantly')
  const isModerate = sev.includes('4') || sev.includes('moderate') || sev.includes('noticeably')
  const isLong = dur.includes('1+') || dur.includes('year') || dur.includes('12')
  const isShort = dur.includes('6 months') || dur.includes('< 6')
  const hasRadiating = radiating.toLowerCase() === 'yes'
  const noTreatment = treatments.length === 0 || treatments.some((t) => t.toLowerCase().includes('none') || t.toLowerCase().includes('nothing'))
  const triedTreatments = !noTreatment && treatments.length > 0
  const treatmentList = triedTreatments ? formatList(cleanTreatments(treatments)) : ''

  return {
    concern: primaryConcern ? primaryConcern.toLowerCase() : 'your condition',
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
  if (p.isSevere && p.isLong && p.triedTreatments) return "There's more we can do."
  if (p.isSevere && p.noTreatment) return 'You came to the right place.'
  if (p.isLong && p.triedTreatments) return 'This is very treatable.'
  if (!p.isLong) return 'You caught this early.'
  return 'Good news.'
}

function buildNarrativeSentence(p: ParsedAnswers): string {
  const { concern, isSevere, isModerate, isLong, isShort, hasRadiating, noTreatment, triedTreatments, treatmentList } = p
  if (isSevere && isLong && triedTreatments) {
    return `You've been living with ${concern} pain for over a year, and ${treatmentList} hasn't fully resolved it. That pattern often points to an underlying issue that image-guided treatment can address precisely — without major surgery.`
  }
  if (isSevere && noTreatment) {
    return `You're experiencing significant ${concern} pain and haven't had a specialist evaluate it yet. That's exactly where we can help — our team will find the source and walk you through the right options from day one.`
  }
  if (isModerate && isLong && triedTreatments) {
    return `Persistent ${concern} pain that hasn't responded to ${treatmentList} usually has a treatable root cause. Our specialists use image-guided techniques to find and target it directly.`
  }
  if (hasRadiating) {
    return `${concern.charAt(0).toUpperCase() + concern.slice(1)} pain that travels into your arm or leg is a specific signal our specialists are trained to address — often without major surgery or extended recovery.`
  }
  if (isShort && noTreatment) {
    return `You're catching this early, which gives you the most options. A consultation now can prevent ${concern} pain from becoming a longer-term issue.`
  }
  if (triedTreatments) {
    return `You've already tried ${treatmentList} for your ${concern} symptoms. If those haven't given you lasting relief, there are targeted approaches our specialists can offer that go further.`
  }
  return `Based on what you shared, your ${concern} symptoms are something our specialists see and treat every day — with approaches that are far less invasive than traditional surgery.`
}

function buildPersonalizedResult(config: AssessmentConfig, answers: Answers): PersonalizedResult {
  const p = parseAnswers(config, answers)
  const concern = p.concern === 'your condition' ? '' : p.concern

  const stat1 = concern
    ? `Most patients with ${concern} symptoms like yours avoid major surgery with our approach.`
    : config.result.stats[0]

  const stat2 = p.triedTreatments
    ? `Because ${p.treatmentList} hasn't resolved it, your specialist will focus on what's actually driving the pain.`
    : p.isSevere && p.isLong
      ? `Our team regularly helps patients whose pain has persisted this long — often with same-day, outpatient procedures.`
      : `Our specialists will review your exact situation and outline the least invasive path forward.`

  return {
    stats: [stat1, stat2],
    dynamicHeadline: deriveDynamicHeadline(p),
    narrativeSentence: buildNarrativeSentence(p),
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
      personalizedSummary: personalizedResult.stats,
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
              <h1 className="font-heading font-bold text-[#111111] text-[clamp(24px,3.4vw,34px)] leading-[1.12] tracking-[-0.02em] mb-9">
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
              <h2 className="font-heading font-bold text-[#111111] text-[clamp(30px,4.4vw,44px)] leading-[1.08] tracking-[-0.03em] mb-3">
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
              transition={{ duration: 0.24, ease: EASE }}
            >
              <div className="text-center mb-8">
                <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-black/40 mb-3">
                  Your results
                </p>
                <h2 className="font-heading font-bold text-[#111111] text-[clamp(32px,5vw,48px)] leading-[1.08] tracking-[-0.03em] mb-5">
                  {personalizedResult.dynamicHeadline}
                </h2>
                <p className="text-[#3d3834] text-[17px] leading-[1.65] max-w-xl mx-auto">
                  {personalizedResult.narrativeSentence}
                </p>
              </div>

              <div className="space-y-4 mb-10 max-w-xl mx-auto">
                {personalizedResult.stats.map((stat) => (
                  <div key={stat} className="flex items-start gap-3.5">
                    <Check className="w-[18px] h-[18px] text-[#4DCCE8] flex-shrink-0 mt-[2px]" strokeWidth={2.5} />
                    <p className="text-[#1A1814] text-[15px] leading-snug">{stat}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-xl mx-auto border-t border-black/[0.07] pt-7">
                <button
                  type="button"
                  onClick={handleContinueToBooking}
                  className="w-full bg-[#4DCCE8] text-[#07080C] rounded-xl py-4 text-[15px] font-semibold hover:opacity-90 active:scale-[0.99] transition-all"
                >
                  Get My Treatment Plan
                </button>
                <p className="text-center text-[12px] text-[#8c857f] mt-3">
                  Takes less than a minute. No commitment.
                </p>
              </div>
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
