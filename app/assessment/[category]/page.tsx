import { notFound } from 'next/navigation'
import { getAssessmentConfig } from '@/lib/assessment-data'
import AssessmentClient from './AssessmentClient'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const config = getAssessmentConfig(category)
  if (!config) return {}
  return {
    title: `${config.title} Assessment — True Precision Medical`,
    description: `Answer 5 quick questions about your ${config.title.toLowerCase()} symptoms and find out if you're a candidate for minimally invasive treatment.`,
  }
}

export default async function AssessmentPage({ params }: Props) {
  const { category } = await params
  const config = getAssessmentConfig(category)
  if (!config) notFound()

  return <AssessmentClient config={config} />
}
