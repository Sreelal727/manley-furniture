// Mock CRM data derived from the reference screenshots.

export interface PipelineSummary {
  key: string
  count: number
  value: number
}

export const pipelineSummary: PipelineSummary[] = [
  { key: 'new_lead', count: 63, value: 718258.69 },
  { key: 'contacted', count: 8, value: 158945 },
  { key: 'qualified', count: 24, value: 2833104 },
  { key: 'proposal', count: 83, value: 3019527.85 },
  { key: 'follow_up', count: 7, value: 316000 },
  { key: 'demo', count: 6, value: 173997.5 },
  { key: 'negotiation', count: 4, value: 115175 },
  { key: 'deal', count: 1, value: 224999.99 },
  { key: 'lpo', count: 10, value: 523887.49 },
  { key: 'purchase', count: 2, value: 17400 },
  { key: 'pickup', count: 0, value: 0 },
  { key: 'delivery', count: 4, value: 11450 },
  { key: 'installation', count: 0, value: 0 },
  { key: 'cash_customer', count: 7, value: 167112.5 },
  { key: 'credit', count: 68, value: 501235.47 },
  { key: 'training', count: 0, value: 0 },
  { key: 'close', count: 40, value: 32609.75 },
]

export type LeadSource = 'Other' | 'Website' | 'Referral'

export interface Lead {
  id: string
  company: string
  contact: string
  source: LeadSource
  stage: string // pipeline stage key
  value: number
  probability: number
}

export const leads: Lead[] = [
  { id: 'L-001', company: 'STARCARE MEDICAL CENTER', contact: 'DR. RASHEEK AHAMMED', source: 'Other', stage: 'new_lead', value: 0, probability: 50 },
  { id: 'L-002', company: 'AL FAHIM MEDICAL CENTRE', contact: 'DR. ASIF', source: 'Other', stage: 'new_lead', value: 0, probability: 50 },
  { id: 'L-003', company: 'AL AHLY SPECIALIST MEDICAL CENTER', contact: 'DEEPNA', source: 'Other', stage: 'new_lead', value: 0, probability: 50 },
  { id: 'L-004', company: 'AL FAHIM CLINIC', contact: 'ANY SHARMA', source: 'Other', stage: 'new_lead', value: 1000, probability: 50 },
  { id: 'L-005', company: 'PHARMALAND MEDICAL EQUIPMENT TRADING LLC', contact: 'PHARMALAND MEDICAL EQUIPMENT TRADING LLC', source: 'Website', stage: 'close', value: 425.2, probability: 100 },
  { id: 'L-006', company: 'FORTUNE NOVA TECHNICAL SERVICE', contact: 'MANU', source: 'Website', stage: 'lpo', value: 840, probability: 100 },
  { id: 'L-007', company: 'FERTICLINIC FERTILIZATION CENTRE', contact: 'JAYAMOL', source: 'Website', stage: 'lpo', value: 367.4, probability: 100 },
  { id: 'L-008', company: 'ACHIRA DENTAL CLINIC', contact: 'ACHIRA DENTAL CLINIC', source: 'Website', stage: 'lpo', value: 305, probability: 50 },
  { id: 'L-009', company: 'ALAYADI AL BADHYA MEDICAL CENTER', contact: 'JAMAL', source: 'Referral', stage: 'delivery', value: 300, probability: 100 },
  { id: 'L-010', company: 'MUMTAZ AL NOOR EXPRESS PHARMACY L.L.C', contact: 'MUMTAZ AL NOOR EXPRESS PHARMACY L.L.C', source: 'Referral', stage: 'delivery', value: 650, probability: 100 },
  { id: 'L-011', company: 'MUMTAZ AL NOOR EXPRESS PHARMACY L.L.C', contact: 'MUMTAZ AL NOOR EXPRESS PHARMACY L.L.C', source: 'Referral', stage: 'delivery', value: 1500, probability: 100 },
  { id: 'L-012', company: 'MUMTAZ AL NOOR EXPRESS PHARMACY L.L.C', contact: 'MUMTAZ AL NOOR EXPRESS PHARMACY L.L.C', source: 'Referral', stage: 'credit', value: 300, probability: 100 },
  { id: 'L-013', company: 'ALAYADI AL BADHYA MEDICAL CENTER', contact: 'JAMAL', source: 'Referral', stage: 'close', value: 300, probability: 100 },
  { id: 'L-014', company: 'DR.SAMI AL HASHMI MEDICAL CENTER', contact: 'MUHAMMAD RAFEEK KABEER', source: 'Other', stage: 'proposal', value: 2400, probability: 75 },
  { id: 'L-015', company: 'SKY LINE', contact: 'MUHAMMAD RAFEEK KABEER', source: 'Website', stage: 'qualified', value: 1875, probability: 60 },
]

export interface InsightItem {
  rank: number
  title: string
  subtitle: string
}

export const stuckOver7Days: InsightItem[] = [
  { rank: 235, title: 'DR.SAMI AL HASHMI MEDICAL CENTER', subtitle: 'Proposal · MUHAMMAD RAFEEK KABEER' },
  { rank: 234, title: 'DALMAR SPECIALIST & TEACHING HOSPITAL', subtitle: 'Qualified · SULTHANA RASHEED' },
  { rank: 234, title: 'ABEER AL NOOR POLY CLINIC - AL QUSAIS', subtitle: 'Proposal · JASSAR MUHAMMAD' },
  { rank: 234, title: 'AL RASHIDIYAH ALNOOR POLYCLINIC', subtitle: 'Qualified · JASSAR MUHAMMAD' },
  { rank: 234, title: 'SKY LINE', subtitle: 'Proposal · MUHAMMAD RAFEEK KABEER' },
]

export const oldestOpenLeads: InsightItem[] = [
  { rank: 235, title: 'DR.SAMI AL HASHMI MEDICAL CENTER', subtitle: 'Proposal · MUHAMMAD RAFEEK KABEER' },
  { rank: 234, title: 'CLINIC PROJECT -SAFNAS', subtitle: 'Proposal · MUHAMMAD RAFEEK KABEER' },
  { rank: 234, title: 'DR FAKHRIYA OMAN', subtitle: 'Lpo Billing Advance · CHITHRA VENKATESH' },
  { rank: 234, title: 'MEDICAL INTERNATIONAL SPECIALIST CENTER', subtitle: 'Proposal · MUHAMMAD RAFEEK KABEER' },
  { rank: 234, title: 'MOOPANS CLINIC', subtitle: 'Proposal · JUHANA ZAMZAD' },
]

export interface ActivityRep {
  rank: number
  name: string
  changes: string
  active: string
}

export const leastActiveToday: ActivityRep[] = [
  { rank: 1, name: 'Keerthi K', changes: '0 changes today', active: '4 active' },
  { rank: 2, name: 'VARUN MATHEW', changes: '0 changes today', active: '2 active' },
  { rank: 3, name: 'Mahalakshmi Jagadeep', changes: '1 change today', active: '20 active' },
]
