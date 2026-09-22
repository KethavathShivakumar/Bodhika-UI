import React, { useState } from 'react';

export default function EnrollModal({ exam, onClose, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  if (!exam) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirm(exam);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0a4b56] flex items-center justify-center font-bold shadow-md">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">Enroll in Examination</h3>
              <p className="text-xs text-slate-400 font-bold">Secure checkout powered by Razorpay</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Exam Summary */}
          <div className="p-5 rounded-3xl bg-teal-50/60 border border-teal-100 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-black text-[#0a4b56] uppercase tracking-wider">{exam.type || 'MOCK EXAM'}</span>
              <h4 className="font-extrabold text-base text-slate-900 mt-1">{exam.name}</h4>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{exam.description || 'Full mock exam package with instant score diagnostic.'}</p>
            </div>
            <div className="text-right shrink-0 ml-4">
              <div className="text-[10px] text-slate-400 font-extrabold uppercase">Fee</div>
              <div className="text-2xl font-black text-[#0a4b56]">₹{exam.price.toFixed(2)}</div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Select Payment Gateway
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'upi'
                    ? 'border-[#0a4b56] bg-teal-50/80 text-[#0a4b56] font-extrabold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
                <span className="text-xs">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-[#0a4b56] bg-teal-50/80 text-[#0a4b56] font-extrabold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">credit_card</span>
                <span className="text-xs">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#0a4b56] bg-teal-50/80 text-[#0a4b56] font-extrabold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
                <span className="text-xs">NetBanking</span>
              </button>
            </div>
          </div>

          {/* Secure Trust Badge */}
          <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-semibold">
            <span className="material-symbols-outlined text-[20px] text-[#0a4b56]">verified_user</span>
            <span>256-bit SSL encrypted transaction. Instant access code generated immediately.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePay}
            disabled={processing}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white text-xs font-extrabold hover:shadow-lg hover:shadow-[#0a4b56]/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {processing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing ₹{exam.price.toFixed(2)}...
              </>
            ) : (
              <>
                <span>Pay & Enroll Now</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

