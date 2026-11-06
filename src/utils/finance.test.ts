import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPKR,
  calculateGrossRevenue,
  calculateTotalExpenses,
  calculateNetIncome,
  calculateProfitMarginPercent,
  generatePnLSummary,
} from './finance';
import { FinancialRecord, ExpenseRecord, RefundRecord } from '../types';

test('formatPKR formats numeric amounts correctly with currency symbol', () => {
  assert.equal(formatPKR(15000), 'PKR 15,000');
  assert.equal(formatPKR(6000), 'PKR 6,000');
  assert.equal(formatPKR(1250000), 'PKR 1,250,000');
});

test('calculateGrossRevenue accumulates only completed and approved amounts', () => {
  const transactions = [
    { amountPKR: 15000, status: 'Completed' },
    { amountPKR: 6000, status: 'Approved' },
    { amountPKR: 15000, status: 'Pending' },
    { amountPKR: 6000, status: 'Rejected' },
  ];
  assert.equal(calculateGrossRevenue(transactions), 21000);
});

test('calculateNetIncome and calculateProfitMarginPercent computes accurate financial metrics', () => {
  const gross = 100000;
  const expenses = 40000;
  const refunds = 5000;
  const net = calculateNetIncome(gross, expenses, refunds);
  assert.equal(net, 55000);
  assert.equal(calculateProfitMarginPercent(net, gross), 55);
});

test('generatePnLSummary segments recorded course vs live zoom revenue properly', () => {
  const transactions: FinancialRecord[] = [
    {
      id: 'tx-1',
      date: '2026-10-01',
      type: 'Income',
      category: 'Recorded Business Management Course',
      description: 'Course purchase',
      amountPKR: 15000,
      referenceNumber: 'TX-101',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
    },
    {
      id: 'tx-2',
      date: '2026-10-02',
      type: 'Income',
      category: 'Live Zoom Classes',
      description: 'Monthly Cohort',
      amountPKR: 6000,
      referenceNumber: 'TX-102',
      paymentMethod: 'Raast',
      status: 'Completed',
    },
  ];

  const expenses: ExpenseRecord[] = [
    {
      id: 'exp-1',
      date: '2026-10-05',
      category: 'Zoom Licenses',
      description: 'Zoom Enterprise Pro 500',
      amountPKR: 4500,
      approvedBy: 'Admin',
      receiptNumber: 'ZM-9812',
    },
  ];

  const refunds: RefundRecord[] = [];

  const pnl = generatePnLSummary(transactions, expenses, refunds);
  assert.equal(pnl.grossCourseRevenue, 15000);
  assert.equal(pnl.liveClassesRevenue, 6000);
  assert.equal(pnl.totalRevenue, 21000);
  assert.equal(pnl.totalExpenses, 4500);
  assert.equal(pnl.netOperatingIncome, 16500);
  assert.equal(pnl.operatingMarginPercent, 78.6);
});
