// Mock CRM data for Manley Furniture — a Kerala-based maker of sofas and
// home/office furniture. Clients are Kerala businesses & institutions, contacts
// use Kerala names, and all amounts are in Indian rupees.

export interface PipelineSummary {
  key: string
  count: number
  value: number
}

export const pipelineSummary: PipelineSummary[] = [
  { key: 'new_lead', count: 63, value: 7825000 },
  { key: 'contacted', count: 8, value: 1845000 },
  { key: 'qualified', count: 24, value: 12640000 },
  { key: 'proposal', count: 83, value: 21500000 },
  { key: 'follow_up', count: 7, value: 985000 },
  { key: 'demo', count: 6, value: 1340000 },
  { key: 'negotiation', count: 4, value: 760000 },
  { key: 'deal', count: 1, value: 285000 },
  { key: 'lpo', count: 10, value: 3420000 },
  { key: 'purchase', count: 2, value: 178000 },
  { key: 'pickup', count: 0, value: 0 },
  { key: 'delivery', count: 4, value: 540000 },
  { key: 'installation', count: 0, value: 0 },
  { key: 'cash_customer', count: 7, value: 1265000 },
  { key: 'credit', count: 68, value: 8930000 },
  { key: 'training', count: 0, value: 0 },
  { key: 'close', count: 40, value: 4560000 },
]

export type LeadSource = 'Showroom' | 'Website' | 'Referral' | 'Exhibition'

export interface Lead {
  id: string
  company: string
  /** Furniture product the client is interested in */
  product: string
  contact: string
  source: LeadSource
  stage: string // pipeline stage key
  value: number
  probability: number
}

export const leads: Lead[] = [
  { id: 'L-001', company: 'Taj Malabar Resort, Cochin', product: 'Lobby Sofa Seating (12 units)', contact: 'Anand Menon', source: 'Referral', stage: 'proposal', value: 845000, probability: 75 },
  { id: 'L-002', company: 'Lulu International Mall', product: 'Food Court Lounge Seating', contact: 'Reshma Nair', source: 'Exhibition', stage: 'qualified', value: 620000, probability: 60 },
  { id: 'L-003', company: 'Marriott Kochi', product: 'Executive Recliner Suites', contact: 'Arjun Pillai', source: 'Referral', stage: 'negotiation', value: 530000, probability: 80 },
  { id: 'L-004', company: 'Aster Medcity', product: 'Reception & Waiting Sofas', contact: 'Divya Krishnan', source: 'Website', stage: 'new_lead', value: 410000, probability: 50 },
  { id: 'L-005', company: 'Federal Bank Head Office', product: 'Office Workstations (40)', contact: 'Vishnu Warrier', source: 'Showroom', stage: 'lpo', value: 760000, probability: 100 },
  { id: 'L-006', company: 'Sobha Developers', product: 'Model Flat Furniture Pkg', contact: 'Sreejith Kurup', source: 'Website', stage: 'delivery', value: 385000, probability: 100 },
  { id: 'L-007', company: 'Dezignmania Interiors', product: 'L-Shaped Fabric Sofa Sets', contact: 'Anjali Varma', source: 'Referral', stage: 'lpo', value: 295000, probability: 100 },
  { id: 'L-008', company: 'Casino Hotel, Willingdon Island', product: '3+2 Leather Recliner Sofa', contact: 'Manoj Nambiar', source: 'Showroom', stage: 'close', value: 178000, probability: 100 },
  { id: 'L-009', company: 'Rajagiri Hospital', product: 'Attendant Lounge Chairs', contact: 'Lakshmi Menon', source: 'Website', stage: 'delivery', value: 142000, probability: 100 },
  { id: 'L-010', company: 'Asset Homes', product: 'Showflat Sofa & Dining Sets', contact: 'Nikhil Das', source: 'Referral', stage: 'credit', value: 268000, probability: 100 },
  { id: 'L-011', company: 'Grand Hyatt Bolgatty', product: 'Banquet Hall Seating', contact: 'Aswathy Pillai', source: 'Exhibition', stage: 'qualified', value: 915000, probability: 65 },
  { id: 'L-012', company: 'Nippon Toyota Showroom', product: 'Customer Lounge Sofas', contact: 'Rahul Mohan', source: 'Showroom', stage: 'demo', value: 96000, probability: 55 },
  { id: 'L-013', company: 'Le Meridien Kochi', product: 'Suite Sofa-cum-Beds', contact: 'Gayathri Iyer', source: 'Referral', stage: 'follow_up', value: 132000, probability: 50 },
  { id: 'L-014', company: 'Brigade Group', product: 'Co-working Modular Seating', contact: 'Deepak Panicker', source: 'Website', stage: 'new_lead', value: 480000, probability: 50 },
  { id: 'L-015', company: 'Saj Earth Resort', product: 'Outdoor Wicker Sofa Sets', contact: 'Meera Nair', source: 'Exhibition', stage: 'contacted', value: 224000, probability: 45 },
  { id: 'L-016', company: 'Kerala State Tourism Dept', product: 'Lounge & Office Furniture', contact: 'Biju Thampi', source: 'Website', stage: 'proposal', value: 690000, probability: 70 },
]

export interface InsightItem {
  rank: number
  title: string
  subtitle: string
}

export const stuckOver7Days: InsightItem[] = [
  { rank: 14, title: 'Taj Malabar Resort, Cochin', subtitle: 'Proposal · Anand Menon' },
  { rank: 12, title: 'Grand Hyatt Bolgatty', subtitle: 'Qualified · Aswathy Pillai' },
  { rank: 11, title: 'Kerala State Tourism Dept', subtitle: 'Proposal · Biju Thampi' },
  { rank: 9, title: 'Lulu International Mall', subtitle: 'Qualified · Reshma Nair' },
  { rank: 8, title: 'Brigade Group', subtitle: 'New Lead · Deepak Panicker' },
]

export const oldestOpenLeads: InsightItem[] = [
  { rank: 21, title: 'Le Meridien Kochi', subtitle: 'Follow Up · Gayathri Iyer' },
  { rank: 19, title: 'Saj Earth Resort', subtitle: 'Contacted · Meera Nair' },
  { rank: 17, title: 'Nippon Toyota Showroom', subtitle: 'Demo · Rahul Mohan' },
  { rank: 16, title: 'Aster Medcity', subtitle: 'New Lead · Divya Krishnan' },
  { rank: 15, title: 'Marriott Kochi', subtitle: 'Negotiation · Arjun Pillai' },
]

export interface ActivityRep {
  rank: number
  name: string
  changes: string
  active: string
}

export const leastActiveToday: ActivityRep[] = [
  { rank: 1, name: 'Sneha Ramesh', changes: '0 changes today', active: '4 active' },
  { rank: 2, name: 'Vinod Kumar', changes: '0 changes today', active: '2 active' },
  { rank: 3, name: 'Athira Suresh', changes: '1 change today', active: '20 active' },
]
