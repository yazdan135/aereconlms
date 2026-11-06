import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { formatPKR } from '../../utils/finance';
import {
  CheckCircle2,
  Copy,
  Building2,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Image,
  Tag,
  ShieldCheck,
  Check,
  Sparkles,
  AlertCircle,
  X,
  CreditCard,
  QrCode,
} from 'lucide-react';
import { PaymentVerification } from '../../types';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
  onSubmitEnrollment: (verification: PaymentVerification) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = 'Executive Business Management Course',
  onSubmitEnrollment,
}) => {
  // 2-Step Flow: 'details' (Step 1) -> 'payment' (Step 2)
  const [step, setStep] = useState<'details' | 'payment'>('details');

  // Step 1: Student Information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [city, setCity] = useState('');
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // Step 2: Payment, Promo & Screenshot
  const basePrice = 15000;
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);
  const [promoError, setPromoError] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Raast' | 'EasyPaisa' | 'JazzCash'>(
    'Bank Transfer'
  );
  const [bankName, setBankName] = useState('Meezan Bank Ltd');
  const [transactionRef, setTransactionRef] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string>('');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});

  // Discount calculation
  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
  const finalAmount = Math.max(0, basePrice - discountAmount);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(label);
    setTimeout(() => setIsCopied(null), 2000);
  };

  // Step 1 validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required';
    if (!phone.trim()) errs.phone = 'WhatsApp / phone number is required';
    setStep1Errors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setStep('payment');
  };

  // Promo Code Validation
  const handleApplyPromo = () => {
    const cleaned = promoCodeInput.trim().toUpperCase();
    setPromoError('');

    if (!cleaned) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (cleaned === 'AERECON20') {
      const discount = Math.round(basePrice * 0.2); // 20%
      setAppliedPromo({ code: 'AERECON20', discountPercent: 20, discountAmount: discount });
      setPromoCodeInput('');
    } else if (cleaned === 'WELCOME10') {
      const discount = Math.round(basePrice * 0.1); // 10%
      setAppliedPromo({ code: 'WELCOME10', discountPercent: 10, discountAmount: discount });
      setPromoCodeInput('');
    } else if (cleaned === 'VIP50' || cleaned === 'SPECIAL50') {
      const discount = Math.round(basePrice * 0.5); // 50%
      setAppliedPromo({ code: cleaned, discountPercent: 50, discountAmount: discount });
      setPromoCodeInput('');
    } else if (cleaned === 'STUDENT15') {
      const discount = Math.round(basePrice * 0.15); // 15%
      setAppliedPromo({ code: 'STUDENT15', discountPercent: 15, discountAmount: discount });
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid promo code. Try "AERECON20" or "WELCOME10"');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  // Screenshot File Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setUploadedFilePreview(url);
      } else {
        setUploadedFilePreview('');
      }
    }
  };

  const handleUseSampleReceipt = () => {
    setUploadedFileName('Meezan_IBFT_Transfer_Proof.jpg');
    setUploadedFilePreview(
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80'
    );
    if (!transactionRef) {
      setTransactionRef('IBFT-MZB-99823104');
    }
  };

  // Step 2 validation & final submit
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!transactionRef.trim()) {
      errs.transactionRef = 'Transaction Reference / Slip ID is required';
    }
    if (!uploadedFileName) {
      errs.screenshot = 'Please upload your deposit slip / screenshot proof';
    }
    setStep2Errors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const newVerification: PaymentVerification = {
      id: `pay-v-${Date.now()}`,
      studentName: name,
      studentEmail: email,
      phone,
      productType: 'Executive Business Management Course',
      amountPKR: finalAmount,
      originalAmountPKR: basePrice,
      promoCode: appliedPromo ? appliedPromo.code : undefined,
      discountPKR: discountAmount > 0 ? discountAmount : undefined,
      paymentMethod,
      bankName: paymentMethod === 'Bank Transfer' ? bankName : undefined,
      transactionReference: transactionRef,
      submittedAt: 'Just now',
      proofDocumentUrl: uploadedFileName || 'Transfer_Screenshot_Receipt.png',
      status: 'Pending',
    };

    onSubmitEnrollment(newVerification);
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    onClose();
    // reset after close
    setTimeout(() => {
      setStep('details');
      setName('');
      setEmail('');
      setPhone('');
      setOrganization('');
      setCity('');
      setAppliedPromo(null);
      setPromoCodeInput('');
      setPromoError('');
      setTransactionRef('');
      setUploadedFileName('');
      setUploadedFilePreview('');
      setStep1Errors({});
      setStep2Errors({});
    }, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={step === 'details' ? 'Enroll in Executive Program' : 'Deposit Details & Payment Slip'}
      description={
        step === 'details'
          ? 'Step 1 of 2: Fill out your student information to generate your enrollment invoice.'
          : 'Step 2 of 2: Transfer fee to official bank details, apply promo codes, and upload screenshot proof.'
      }
      maxWidth="2xl"
    >
      {/* Visual Step Indicator Bar */}
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'details'
                ? 'bg-[#0f2b48] text-white'
                : 'bg-emerald-600 text-white cursor-pointer'
            }`}
            onClick={() => setStep('details')}
          >
            {step === 'payment' ? <Check className="w-3.5 h-3.5" /> : '1'}
          </div>
          <span
            className={`text-xs font-bold ${
              step === 'details' ? 'text-slate-900' : 'text-emerald-700 cursor-pointer'
            }`}
            onClick={() => setStep('details')}
          >
            1. Student Information
          </span>
        </div>

        <div className="w-12 h-0.5 bg-slate-200" />

        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'payment' ? 'bg-[#0f2b48] text-white' : 'bg-slate-100 text-slate-400'
            }`}
          >
            2
          </div>
          <span
            className={`text-xs font-bold ${
              step === 'payment' ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            2. Deposit & Screenshot Proof
          </span>
        </div>
      </div>

      {/* ================= STEP 1: FORM FILL ================= */}
      {step === 'details' && (
        <form onSubmit={handleProceedToPayment} className="space-y-4">
          {/* Program Overview Banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                Selected Course Program
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Executive Business Management & Strategy
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Lifetime on-demand access • 42h video lectures • Excel financial models • Verified certificate
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-extrabold text-[#0f2b48] block">
                {formatPKR(15000)}
              </span>
              <span className="text-[10px] text-slate-400">One-time payment</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Kamran Ashraf"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (step1Errors.name) setStep1Errors({ ...step1Errors, name: '' });
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              />
              {step1Errors.name && (
                <p className="text-[10px] text-rose-600 mt-0.5">{step1Errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="kamran.ashraf@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (step1Errors.email) setStep1Errors({ ...step1Errors, email: '' });
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              />
              {step1Errors.email && (
                <p className="text-[10px] text-rose-600 mt-0.5">{step1Errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp / Phone Number *
              </label>
              <input
                type="text"
                placeholder="+92 300 1234567"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (step1Errors.phone) setStep1Errors({ ...step1Errors, phone: '' });
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              />
              {step1Errors.phone && (
                <p className="text-[10px] text-rose-600 mt-0.5">{step1Errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Location
              </label>
              <input
                type="text"
                placeholder="e.g. Lahore, Karachi, Islamabad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Organization / Company & Designation (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Operations Manager, Engro / Freelance Consultant"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80 text-[11px] text-blue-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              On the next screen, you will receive official bank deposit details, an option to apply promo discount codes, and the screenshot upload field for verification.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0f2b48] hover:bg-[#163e68] rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: Deposit Details & Promo Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 2: DEPOSIT DETAILS, PROMO CODE & SCREENSHOT UPLOAD ================= */}
      {step === 'payment' && (
        <form onSubmit={handleSubmitFinal} className="space-y-4">
          {/* Active Student Indicator Chip */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100/80 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">Enrolling:</span>
              <span className="text-slate-700 font-medium">{name}</span>
              <span className="text-slate-400">({email})</span>
            </div>
            <button
              type="button"
              onClick={() => setStep('details')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Edit Details</span>
            </button>
          </div>

          {/* 1. Official Fee Deposit Account Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0f2b48]" />
                <span className="font-bold text-slate-900">
                  Official Aerecon LMS Bank Deposit Details
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Direct IBFT & Raast Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
              <div className="p-2 rounded bg-white border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Bank:</span>
                  <span className="font-semibold text-slate-800">Meezan Bank Limited</span>
                </div>
              </div>

              <div className="p-2 rounded bg-white border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Account Title:</span>
                  <span className="font-semibold text-slate-800">AERECON EDUCATION PVT</span>
                </div>
              </div>

              <div className="p-2 rounded bg-white border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Account Number:</span>
                  <span className="font-mono font-bold text-slate-900">0102-01034492</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('010201034492', 'ac')}
                  className="px-2 py-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 rounded flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{isCopied === 'ac' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-2 rounded bg-white border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Raast Instant ID:</span>
                  <span className="font-mono font-bold text-slate-900">03008472910</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('03008472910', 'raast')}
                  className="px-2 py-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 rounded flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{isCopied === 'raast' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-2 rounded bg-blue-50/70 border border-blue-200/80 flex items-center justify-between text-[11px] text-blue-900">
              <div className="flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-blue-700" />
                <span>
                  EasyPaisa & JazzCash: <span className="font-bold font-mono">0300-8472910</span> (Aerecon Education)
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('03008472910', 'wallet')}
                className="text-[10px] font-semibold text-blue-700 hover:underline"
              >
                {isCopied === 'wallet' ? 'Copied' : 'Copy Number'}
              </button>
            </div>
          </div>

          {/* 2. Promo Code Box */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-900">Have a Promo / Referral Code?</span>
              </div>
              <span className="text-[10px] text-slate-400">Available: AERECON20, WELCOME10</span>
            </div>

            {appliedPromo ? (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-emerald-900 font-mono text-xs">
                      {appliedPromo.code}
                    </span>
                    <span className="text-[11px] text-emerald-700 ml-1.5">
                      ({appliedPromo.discountPercent}% Discount Applied — Save {formatPKR(appliedPromo.discountAmount)})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemovePromo}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. AERECON20, WELCOME10)"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:border-blue-600 uppercase font-mono outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 text-xs font-semibold bg-[#0f2b48] hover:bg-[#163e68] text-white rounded-lg transition-colors cursor-pointer"
                >
                  Apply Code
                </button>
              </div>
            )}
            {promoError && <p className="text-[10px] text-rose-600">{promoError}</p>}

            {/* Total Fee Calculation Breakdown */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-500">
                  Standard Program Fee:{' '}
                  <span className="line-through">{formatPKR(basePrice)}</span>
                </div>
                {appliedPromo && (
                  <div className="text-emerald-700 font-medium">
                    Promo Discount ({appliedPromo.code}): -{formatPKR(discountAmount)}
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">
                  Total Payable Fee:
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[#0f2b48]">
                  {formatPKR(finalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Payment Method & Transaction Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Payment Channel Used *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white font-medium"
              >
                <option value="Bank Transfer">Online Bank Transfer (IBFT)</option>
                <option value="Raast">Raast Instant P2P ID</option>
                <option value="EasyPaisa">EasyPaisa Mobile Wallet</option>
                <option value="JazzCash">JazzCash Mobile Wallet</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Bank Transaction Reference / Slip ID *
              </label>
              <input
                type="text"
                placeholder="e.g. IBFT-MZB-99823104 or Raast ID"
                value={transactionRef}
                onChange={(e) => {
                  setTransactionRef(e.target.value);
                  if (step2Errors.transactionRef) {
                    setStep2Errors({ ...step2Errors, transactionRef: '' });
                  }
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-blue-600 font-mono outline-none"
              />
              {step2Errors.transactionRef && (
                <p className="text-[10px] text-rose-600 mt-0.5">{step2Errors.transactionRef}</p>
              )}
            </div>
          </div>

          {/* 4. Screenshot / Slip Upload Section ("ss upload krne ki jagha") */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Upload Payment Screenshot / Deposit Slip *
              </label>
              <button
                type="button"
                onClick={handleUseSampleReceipt}
                className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                Use Sample Payment Receipt Slip
              </button>
            </div>

            {uploadedFileName ? (
              <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {uploadedFilePreview ? (
                    <img
                      src={uploadedFilePreview}
                      alt="Receipt preview"
                      className="w-12 h-12 object-cover rounded-lg border border-emerald-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        {uploadedFileName}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700">
                      Payment document attached ready for verification
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFileName('');
                    setUploadedFilePreview('');
                  }}
                  className="text-xs text-slate-500 hover:text-rose-600 p-1"
                  title="Remove screenshot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-blue-50/20 group">
                <Upload className="w-7 h-7 text-slate-400 group-hover:text-blue-600 transition-colors mb-2" />
                <span className="text-xs font-semibold text-slate-800">
                  Click to Browse or Drag & Drop Payment Screenshot
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Supports PNG, JPG, JPEG, PDF up to 10MB
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
            {step2Errors.screenshot && (
              <p className="text-[10px] text-rose-600">{step2Errors.screenshot}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep('details')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Details</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <span>Submit Verification Request ({formatPKR(finalAmount)})</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
