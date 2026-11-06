import { FinancialRecord, ExpenseRecord, RefundRecord } from '../types';

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-US')}`;
}

export function calculateGrossRevenue(transactions: { amountPKR: number; status: string }[]): number {
  return transactions
    .filter(t => t.status === 'Completed' || t.status === 'Approved')
    .reduce((sum, t) => sum + t.amountPKR, 0);
}

export function calculateTotalExpenses(expenses: { amountPKR: number }[]): number {
  return expenses.reduce((sum, e) => sum + e.amountPKR, 0);
}

export function calculateTotalRefunds(refunds: { amountPKR: number; status: string }[]): number {
  return refunds
    .filter(r => r.status === 'Processed' || r.status === 'Completed')
    .reduce((sum, r) => sum + r.amountPKR, 0);
}

export function calculateNetIncome(grossRevenue: number, expenses: number, refunds: number): number {
  return grossRevenue - expenses - refunds;
}

export function calculateProfitMarginPercent(netIncome: number, grossRevenue: number): number {
  if (grossRevenue <= 0) return 0;
  const margin = (netIncome / grossRevenue) * 100;
  return Math.round(margin * 10) / 10;
}

export interface PnLBreakdown {
  grossCourseRevenue: number;
  liveClassesRevenue: number;
  totalRevenue: number;
  instructorCosts: number;
  platformAndHostingCosts: number;
  marketingCosts: number;
  generalOperationalCosts: number;
  totalExpenses: number;
  totalRefunds: number;
  netOperatingIncome: number;
  operatingMarginPercent: number;
}

export function generatePnLSummary(
  transactions: FinancialRecord[],
  expenses: ExpenseRecord[],
  refunds: RefundRecord[]
): PnLBreakdown {
  const approvedTxs = transactions.filter(t => t.status === 'Completed' && t.type === 'Income');
  
  const grossCourseRevenue = approvedTxs
    .filter(t => t.category.toLowerCase().includes('recorded') || t.category.toLowerCase().includes('course'))
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const liveClassesRevenue = approvedTxs
    .filter(t => t.category.toLowerCase().includes('live') || t.category.toLowerCase().includes('zoom'))
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const totalRevenue = grossCourseRevenue + liveClassesRevenue;

  const instructorCosts = expenses
    .filter(e => e.category === 'Instructor Honorarium')
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const platformAndHostingCosts = expenses
    .filter(e => e.category === 'Cloud Infrastructure' || e.category === 'Zoom Licenses')
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const marketingCosts = expenses
    .filter(e => e.category === 'Marketing')
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const generalOperationalCosts = expenses
    .filter(e => e.category === 'Operations')
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const totalExpenses = instructorCosts + platformAndHostingCosts + marketingCosts + generalOperationalCosts;
  const totalRefunds = refunds.filter(r => r.status === 'Processed').reduce((acc, curr) => acc + curr.amountPKR, 0);

  const netOperatingIncome = totalRevenue - totalExpenses - totalRefunds;
  const operatingMarginPercent = calculateProfitMarginPercent(netOperatingIncome, totalRevenue);

  return {
    grossCourseRevenue,
    liveClassesRevenue,
    totalRevenue,
    instructorCosts,
    platformAndHostingCosts,
    marketingCosts,
    generalOperationalCosts,
    totalExpenses,
    totalRefunds,
    netOperatingIncome,
    operatingMarginPercent,
  };
}
