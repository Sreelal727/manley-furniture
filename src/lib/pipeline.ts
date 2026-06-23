// Sales pipeline stages with their bright, solid colors (no gradients).
// `bg` is the solid card background; text on these is always white.

export interface PipelineStage {
  key: string
  label: string
  bg: string
}

export const pipelineStages: PipelineStage[] = [
  { key: 'new_lead', label: 'NEW LEAD', bg: '#2563eb' },
  { key: 'contacted', label: 'CONTACTED', bg: '#ef4444' },
  { key: 'qualified', label: 'QUALIFIED', bg: '#22c55e' },
  { key: 'proposal', label: 'PROPOSAL', bg: '#1e3a8a' },
  { key: 'follow_up', label: 'FOLLOW UP', bg: '#f97316' },
  { key: 'demo', label: 'DEMO', bg: '#06b6d4' },
  { key: 'negotiation', label: 'NEGOTIATION', bg: '#ec4899' },
  { key: 'deal', label: 'DEAL', bg: '#14b8a6' },
  { key: 'lpo', label: 'LPO/BILLING/ADVANCE', bg: '#a16207' },
  { key: 'purchase', label: 'PURCHASE', bg: '#0d9488' },
  { key: 'pickup', label: 'PICKUP', bg: '#dc2626' },
  { key: 'delivery', label: 'DELIVERY', bg: '#3b82f6' },
  { key: 'installation', label: 'INSTALLATION', bg: '#7c3aed' },
  { key: 'cash_customer', label: 'CASH CUSTOMER', bg: '#a21caf' },
  { key: 'credit', label: 'CREDIT', bg: '#831843' },
  { key: 'training', label: 'TRAINING/HANDOVER', bg: '#eab308' },
  { key: 'close', label: 'CLOSE', bg: '#9333ea' },
]

export const stageByKey = Object.fromEntries(
  pipelineStages.map((s) => [s.key, s]),
) as Record<string, PipelineStage>

/** Format a number as the app's currency (Omani rial symbol shown in the source UI). */
export function formatCurrency(value: number): string {
  return '﷼ ' + value.toLocaleString('en-US', { maximumFractionDigits: 2 })
}
