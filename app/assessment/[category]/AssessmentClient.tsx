'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'
import type { AssessmentConfig } from '@/lib/assessment-data'
import Logo from '@/components/ui/Logo'

type Stage = 'questions' | 'analyzing' | 'results'
type Answers = Record<string, string | string[]>
type PersonalizedResult = {
  summaryItems: string[]
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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Circular header image — swap `option-1` … `option-4`: public/images/assessment/option-N.jpg */
const ASSESSMENT_AVATAR_SRC = '/images/assessment/option-1.jpg'

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

function deriveDynamicHeadline(
  severity: string,
  duration: string,
  treatments: string[]
): string {
  const isSevere = severity.toLowerCase().includes('7') || severity.toLowerCase().includes('severe') || severity.toLowerCase().includes('significantly')
  const isLong = duration.toLowerCase().includes('1+') || duration.toLowerCase().includes('year') || duration.toLowerCase().includes('12')
  const noTreatment = treatments.length === 0 || treatments.some((t) => t.toLowerCase().includes('none') || t.toLowerCase().includes('nothing'))
  const triedTreatments = !noTreatment && treatments.length > 0

  if (isSevere && isLong && triedTreatments) return 'There\'s more we can do.'
  if (isSevere && noTreatment) return 'You came to the right place.'
  if (isLong && triedTreatments) return 'This is very treatable.'
  if (!isLong) return 'You caught this early.'
  return 'Good news.'
}

function buildNarrativeSentence(
  primaryConcern: string,
  severity: string,
  duration: string,
  radiating: string,
  treatments: string[]
): string {
  const concern = primaryConcern ? primaryConcern.toLowerCase() : 'your condition'
  const isSevere = severity.toLowerCase().includes('7') || severity.toLowerCase().includes('severe') || severity.toLowerCase().includes('significantly')
  const isModerate = severity.toLowerCase().includes('4') || severity.toLowerCase().includes('moderate') || severity.toLowerCase().includes('noticeably')
  const isLong = duration.toLowerCase().includes('1+') || duration.toLowerCase().includes('year') || duration.toLowerCase().includes('12')
  const isShort = duration.toLowerCase().includes('6 months') || duration.toLowerCase().includes('< 6')
  const hasRadiating = radiating.toLowerCase() === 'yes'
  const noTreatment = treatments.length === 0 || treatments.some((t) => t.toLowerCase().includes('none') || t.toLowerCase().includes('nothing'))
  const triedTreatments = !noTreatment && treatments.length > 0
  const treatmentList = triedTreatments ? formatList(treatments.filter((t) => !t.toLowerCase().includes('none') && !t.toLowerCase().includes('nothing'))) : ''

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

  const isSevere = severity.toLowerCase().includes('7') || severity.toLowerCase().includes('severe') || severity.toLowerCase().includes('significantly')
  const isLong = duration.toLowerCase().includes('1+') || duration.toLowerCase().includes('year') || duration.toLowerCase().includes('12')
  const noTreatment = treatments.length === 0 || treatments.some((t) => t.toLowerCase().includes('none') || t.toLowerCase().includes('nothing'))
  const triedTreatments = !noTreatment && treatments.length > 0
  const treatmentList = triedTreatments
    ? formatList(treatments.filter((t) => !t.toLowerCase().includes('none') && !t.toLowerCase().includes('nothing')))
    : ''
  const concern = primaryConcern ? primaryConcern.toLowerCase() : ''

  const stat1 = concern
    ? `Most patients with ${concern} symptoms like yours avoid major surgery with our approach.`
    : config.result.stats[0]

  const stat2 = triedTreatments
    ? `Because ${treatmentList} hasn't resolved it, your specialist will focus on what's actually driving the pain.`
    : isSevere && isLong
      ? `Our team regularly helps patients whose pain has persisted this long — often with same-day, outpatient procedures.`
      : `Our specialists will review your exact situation and outline the least invasive path forward.`

  return {
    summaryItems: [],
    stats: [stat1, stat2],
    dynamicHeadline: deriveDynamicHeadline(severity, duration, treatments),
    narrativeSentence: buildNarrativeSentence(primaryConcern, severity, duration, radiating, treatments),
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
  const [direction, setDirection] = useState<1 | -1>(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [pendingMulti, setPendingMulti] = useState<string[]>([])

  const questions = config.questions
  const totalQuestions = questions.length
  const currentQuestion = questions[questionIndex]
  const personalizedResult = buildPersonalizedResult(config, answers)

  useEffect(() => {
    if (stage !== 'analyzing') return
    const timer = setTimeout(() => setStage('results'), 2500)
    return () => clearTimeout(timer)
  }, [stage])

  function advanceQuestion() {
    if (questionIndex < totalQuestions - 1) {
      setDirection(1)
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
    if (typeof window !== 'undefined') {
      const context: BookingAssessmentContext = {
        source: 'assessment',
        capturedAt: new Date().toISOString(),
        categorySlug: config.slug,
        categoryTitle: config.title,
        answers,
        responses: buildQuestionResponses(config, answers),
        personalizedSummary: personalizedResult.stats,
      }
      window.sessionStorage.setItem(BOOKING_ASSESSMENT_CONTEXT_KEY, JSON.stringify(context))
    }

    router.push('/book?from=assessment')
  }

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 18 : -18 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -18 : 18 }),
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 pt-4 sm:pt-6">
        <div className="flex justify-start mb-4">
          <Link href="/" className="inline-flex">
            <Logo
              variant="dark"
              width={260}
              height={68}
              unoptimized
              className="h-8 w-auto opacity-95"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-[108px] h-[108px] rounded-full overflow-hidden mb-4 border border-black/5">
            <Image
              src={ASSESSMENT_AVATAR_SRC}
              alt=""
              fill
              className="object-cover object-center"
              sizes="108px"
              priority
            />
          </div>
          <div className="flex gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className="h-[5px] w-8 rounded-full transition-colors duration-300"
                style={{
                  background:
                    stage === 'questions'
                      ? i <= questionIndex
                        ? '#2F34F4'
                        : 'rgba(0,0,0,0.10)'
                      : '#2F34F4',
                }}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {stage === 'questions' && (
            <motion.div
              key={`q-${questionIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: EASE }}
              className="text-center"
            >
              <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#2F34F4] mb-4">
                Question {questionIndex + 1} of {totalQuestions}
              </p>
              <h1 className="font-heading font-bold text-[#111111] text-[clamp(26px,3.85vw,38px)] leading-[1.12] tracking-[-0.02em] mb-7">
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
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.24, ease: EASE }}
              className="text-center pt-8"
            >
              <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#2F34F4] mb-4">
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
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.24, ease: EASE }}
            >
              <div className="text-center mb-8">
                <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#2F34F4] mb-3">
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
                    <Check className="w-[18px] h-[18px] text-[#2F34F4] flex-shrink-0 mt-[2px]" strokeWidth={2.5} />
                    <p className="text-[#1A1814] text-[15px] leading-snug">{stat}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-xl mx-auto border-t border-black/[0.07] pt-8">
                <h3 className="font-heading font-bold text-[#111111] text-[clamp(22px,3.2vw,30px)] leading-[1.15] tracking-[-0.02em] mb-5 text-center">
                  See what&apos;s possible for you.
                </h3>
                <button
                  type="button"
                  onClick={handleContinueToBooking}
                  className="w-full bg-[#2F34F4] text-white rounded-xl py-4 text-[15px] font-semibold hover:opacity-95 active:scale-[0.99] transition-all"
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
              backgroundColor: selected ? '#2F34F4' : '#FFFFFF',
              borderColor: selected ? '#2F34F4' : 'rgba(0,0,0,0.10)',
              boxShadow: selected
                ? '0 6px 20px rgba(47,52,244,0.20)'
                : '0 1px 2px rgba(0,0,0,0.04)',
            }}
            whileHover={{
              y: -1,
              boxShadow: selected
                ? '0 8px 24px rgba(47,52,244,0.24)'
                : '0 6px 20px rgba(0,0,0,0.08)',
              transition: { duration: 0.14 },
            }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.16 }}
          >
            <span
              className="block text-[18px] font-semibold leading-snug"
              style={{ color: selected ? '#FFFFFF' : '#141414' }}
            >
              {hasSecondary ? opt.sub : opt.label}
            </span>
            {hasSecondary && (
              <span
                className="block mt-1 text-[14px] leading-snug"
                style={{ color: selected ? 'rgba(255,255,255,0.82)' : '#6f6964' }}
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
            background: pendingMulti.length > 0 ? '#2F34F4' : 'rgba(0,0,0,0.07)',
            color: pendingMulti.length > 0 ? '#FFFFFF' : '#8f8a85',
          }}
        >
          Continue
        </button>
      )}
    </div>
  )
}
