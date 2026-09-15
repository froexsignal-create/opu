import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Truck, CheckCircle2, Phone, MapPin, User, FileText, Banknote } from 'lucide-react';
import { CartItem, DeliveryZone, PaymentMethod, Order } from '../types';
import { trackPixelEvent } from '../utils/pixel';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState<DeliveryZone>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Subtotal Calculation
  const subtotal = items.reduce((acc, item) => {
    const price = item.selectedOption ? item.selectedOption.price : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const deliveryCharge = zone === 'inside_dhaka' ? 70 : 130;
  const total = subtotal + deliveryCharge;

  // Track InitiateCheckout on open
  useEffect(() => {
    if (isOpen && items.length > 0) {
      trackPixelEvent('InitiateCheckout', {
        content_type: 'product',
        num_items: items.reduce((s, i) => s + i.quantity, 0),
        value: total,
        currency: 'BDT',
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          quantity: i.quantity,
          price: i.selectedOption ? i.selectedOption.price : i.product.price,
        })),
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!customerName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম লিখুন');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01711002233)');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMsg('অনুগ্রহ করে আপনার সঠিক ও বিস্তারিত ঠিকানা লিখুন (বাসা/রোড/এলাকা)');
      return;
    }

    setIsSubmitting(true);

    const orderId = 'MH-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      zone,
      deliveryCharge,
      paymentMethod,
      notes: notes.trim(),
      items,
      subtotal,
      discount: 0,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save to local orders array
    try {
      const existing = JSON.parse(localStorage.getItem('mayer_heshel_orders') || '[]');
      localStorage.setItem('mayer_heshel_orders', JSON.stringify([newOrder, ...existing]));
    } catch (e) {
      console.error(e);
    }

    // Fire Facebook Pixel Purchase Event
    trackPixelEvent('Purchase', {
      order_id: orderId,
      value: total,
      currency: 'BDT',
      num_items: items.reduce((s, i) => s + i.quantity, 0),
      content_name: 'Mayer Heshel Order',
      customer_name: customerName,
      customer_phone: phone,
      delivery_zone: zone,
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.selectedOption ? i.selectedOption.price : i.product.price,
      })),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-stone-200 my-8">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-[#1B5E20] to-[#2E7D32] text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <h2 className="text-lg sm:text-xl font-bold">অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</h2>
            </div>
            <p className="text-xs text-emerald-100 mt-0.5">
              পণ্য হাতে পেয়ে দেখে টাকা পরিশোধের সম্পূর্ণ নিরাপদ সুবিধা
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Fields: Name, Phone, Address */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                আপনার পুরো নাম <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="যেমন: মো: রাশেদুল ইসলাম"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                ১১ ডিজিটের মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 01711002233"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                ডেলিভারি রাইডার এই নম্বরে কল করে আপনার সাথে যোগাযোগ করবেন।
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                ডেলিভারি এলাকা নির্বাচন করুন <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setZone('inside_dhaka')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    zone === 'inside_dhaka'
                      ? 'border-[#1B5E20] bg-emerald-50 text-[#1B5E20] ring-1 ring-[#1B5E20]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <Truck className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-xs sm:text-sm">ঢাকার ভেতরে</div>
                    <div className="text-[11px] text-stone-500">চার্জ: ৳৭০ (একই দিনে বা পরের দিন)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setZone('outside_dhaka')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    zone === 'outside_dhaka'
                      ? 'border-[#1B5E20] bg-emerald-50 text-[#1B5E20] ring-1 ring-[#1B5E20]'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <Truck className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-xs sm:text-sm">ঢাকার বাইরে</div>
                    <div className="text-[11px] text-stone-500">চার্জ: ৳১৩০ (কুরিয়ার সার্ভিসে ২-৩ দিন)</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                সম্পূর্ণ ঠিকানা (বাসা নং, রোড, এলাকা) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={2}
                  placeholder="যেমন: বাসা # ১২, রোড # ৪, সেক্টর # ৭, উত্তরা, ঢাকা"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-sm text-stone-900 focus:outline-hidden focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20]"
                />
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                পেমেন্ট পদ্ধতি
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cod', label: 'ক্যাশ অন ডেলিভারি', icon: Banknote },
                  { id: 'bkash', label: 'বিকাশ (bKash)', icon: CheckCircle2 },
                  { id: 'nagad', label: 'নগদ (Nagad)', icon: CheckCircle2 },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                      paymentMethod === m.id
                        ? 'border-[#1B5E20] bg-emerald-50 text-[#1B5E20] ring-1 ring-[#1B5E20]'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">
                বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="যেমন: 'গুড়ের রস একটু বেশি দিয়েন' অথবা 'সন্ধ্যা ৬টার পর ডেলিভারি দিন'"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-800"
                />
                <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              আপনার অর্ডারের বিবরণ ({items.length} টি পদ)
            </h4>
            <div className="max-h-36 overflow-y-auto divide-y divide-amber-200/50 text-xs">
              {items.map((item, idx) => {
                const price = item.selectedOption ? item.selectedOption.price : item.product.price;
                const portion = item.selectedOption ? item.selectedOption.unit : item.product.unit;
                return (
                  <div key={idx} className="py-1.5 flex justify-between items-center">
                    <span className="truncate max-w-[280px]">
                      {item.product.name} ({portion}) × {item.quantity}
                    </span>
                    <span className="font-bold text-stone-900 shrink-0">৳{price * item.quantity}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-amber-200 space-y-1 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>পণ্য মূল্য সাবটোটাল:</span>
                <span className="font-bold text-stone-900">৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ ({zone === 'inside_dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}):</span>
                <span className="font-bold text-stone-900">৳{deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-stone-950 pt-1 border-t border-amber-300">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span className="text-[#1B5E20] text-lg">৳{total}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="checkout-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1B5E20] hover:bg-[#154a19] text-white py-3.5 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                অর্ডার নিশ্চিত হচ্ছে...
              </span>
            ) : (
              <span>অর্ডার নিশ্চিত করুন (৳{total})</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
