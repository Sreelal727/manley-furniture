// Sample inventory for Manley Furniture Studio, compiled from the company
// website (product names, colours, materials, selling price and MRP). Stock
// levels and SKUs are mocked for the ERP view. Amounts are in Indian rupees.

export type Category =
  | 'Sofa Set'
  | 'Bedroom Set'
  | 'Mattress'
  | 'Coffee Table'
  | 'Arm Chair'

export interface Product {
  id: string
  sku: string
  name: string
  category: Category
  colour: string
  material: string
  price: number
  mrp: number
  stock: number
  isNew?: boolean
}

export const products: Product[] = [
  // Sofa Sets
  { id: 'p01', sku: 'MF-SOF-001', name: 'Primer Corner Sofaset', category: 'Sofa Set', colour: 'Brown', material: 'Fabric & Mahogany Frame', price: 70000, mrp: 76900, stock: 8, isNew: true },
  { id: 'p02', sku: 'MF-SOF-002', name: 'Aero 2+1+1 Sofaset', category: 'Sofa Set', colour: 'Off White', material: 'Treated Mahogany Wood & Fabric', price: 71500, mrp: 78700, stock: 12, isNew: true },
  { id: 'p03', sku: 'MF-SOF-003', name: 'Livora 3+1+1 Sofaset', category: 'Sofa Set', colour: 'Cream', material: 'Treated Mahogany Wood & Fabric', price: 89900, mrp: 99500, stock: 5, isNew: true },
  { id: 'p04', sku: 'MF-SOF-004', name: 'Canelian 3+1+1 Sofaset', category: 'Sofa Set', colour: 'Green', material: 'Treated Mahogany with Natural Cane', price: 106000, mrp: 110000, stock: 3, isNew: true },
  { id: 'p05', sku: 'MF-SOF-005', name: 'Cane Sofaset 3+1+1', category: 'Sofa Set', colour: 'Cream', material: 'Treated Mahogany, Cane & Suede', price: 65000, mrp: 72500, stock: 0, isNew: true },
  { id: 'p06', sku: 'MF-SOF-006', name: 'Retrin 2+1+1 Sofaset', category: 'Sofa Set', colour: 'Cream', material: 'Treated Mahogany Wood & Fabric', price: 95500, mrp: 125500, stock: 7 },
  { id: 'p07', sku: 'MF-SOF-007', name: 'Royalist 3+1+1 Sofa Set', category: 'Sofa Set', colour: 'Off White', material: 'Fabric & Mahogany Frame', price: 89900, mrp: 99500, stock: 10, isNew: true },
  { id: 'p08', sku: 'MF-SOF-008', name: 'Berlin Corner Sofa Set 3+2', category: 'Sofa Set', colour: 'Brown', material: 'Leather & Mahogany Frame', price: 69900, mrp: 74500, stock: 4, isNew: true },

  // Bedroom Sets
  { id: 'p09', sku: 'MF-BED-001', name: 'Jesse 3-Door Queen Bedroom Set', category: 'Bedroom Set', colour: 'White', material: 'Particle Board & UV Board', price: 45000, mrp: 59900, stock: 15 },
  { id: 'p10', sku: 'MF-BED-002', name: 'Crey 4-Door Queen Bedroom Set', category: 'Bedroom Set', colour: 'White & Pink', material: 'Premium Particle Board', price: 57900, mrp: 69900, stock: 9 },
  { id: 'p11', sku: 'MF-BED-003', name: 'Walt Pro 3-Door Queen Bedroom Set', category: 'Bedroom Set', colour: 'Cream', material: 'Particle Board', price: 49900, mrp: 59900, stock: 6 },
  { id: 'p12', sku: 'MF-BED-004', name: 'Hiyora Premium 4-Door Queen Bedroom Set', category: 'Bedroom Set', colour: 'Ivory', material: 'HDF', price: 154500, mrp: 189900, stock: 2, isNew: true },
  { id: 'p13', sku: 'MF-BED-005', name: 'Arch Curve 4-Door King Bedroom Set', category: 'Bedroom Set', colour: 'Ivory', material: 'Premium HDF Board', price: 149900, mrp: 164324, stock: 4 },
  { id: 'p14', sku: 'MF-BED-006', name: 'Finora 4-Door Queen Bedroom Set', category: 'Bedroom Set', colour: 'Brown & Cream', material: 'Forest Acacia & Door Board', price: 174900, mrp: 192300, stock: 0, isNew: true },
  { id: 'p15', sku: 'MF-BED-007', name: 'Sleecon 4 Glass-Door Bedroom Set', category: 'Bedroom Set', colour: 'Green', material: 'Particle Board & UV Board', price: 89900, mrp: 98500, stock: 11, isNew: true },
  { id: 'p16', sku: 'MF-BED-008', name: 'Luxem Ivory 4-Door King Bedroom Set', category: 'Bedroom Set', colour: 'Ivory', material: 'UV Board', price: 99000, mrp: 112000, stock: 5, isNew: true },
  { id: 'p17', sku: 'MF-BED-009', name: 'Liner Premium 4-Door King Bedroom Set', category: 'Bedroom Set', colour: 'Natural', material: 'Solid Teak Wood', price: 149900, mrp: 159900, stock: 3, isNew: true },

  // Mattress
  { id: 'p18', sku: 'MF-MAT-001', name: 'Hiyora 1 HR Super Soft Rolling Mattress', category: 'Mattress', colour: 'Grey', material: 'HR Foam & Knitted Fabric', price: 14995, mrp: 16816, stock: 40, isNew: true },

  // Coffee Tables
  { id: 'p19', sku: 'MF-COF-001', name: 'Vivo Coffee Table', category: 'Coffee Table', colour: 'Brown', material: 'Treated Mahogany', price: 14500, mrp: 16900, stock: 18 },
  { id: 'p20', sku: 'MF-COF-002', name: 'Square Pandora Teapoy', category: 'Coffee Table', colour: 'Gold & White', material: 'Ceramic Top & Metal Frame', price: 6900, mrp: 8900, stock: 25 },

  // Arm Chairs
  { id: 'p21', sku: 'MF-ARM-001', name: 'Dual Template 1+1 Arm Chair Set with Teapoy', category: 'Arm Chair', colour: 'White & Blue', material: 'Velvet Fabric & Acacia Wood', price: 34500, mrp: 39900, stock: 6 },
]

export const categories: Category[] = [
  'Sofa Set',
  'Bedroom Set',
  'Mattress',
  'Coffee Table',
  'Arm Chair',
]

export type StockStatus = 'in' | 'low' | 'out'

/** Stock status from quantity: 0 = out, 1–5 = low, otherwise in stock. */
export function stockStatus(stock: number): StockStatus {
  if (stock === 0) return 'out'
  if (stock <= 5) return 'low'
  return 'in'
}
