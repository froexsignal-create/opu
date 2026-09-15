import React from 'react';
import { CheckCircle2, MessageSquare, Printer, ArrowRight } from 'lucide-react';
import { Order } from '../types';
import { BrandLogo } from './BrandLogo';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `আসসালামু আলাইকুম মায়ের হেসেল,\nআমি এইমাত্র ওয়েবসাইটে একটি অর্ডার দিয়েছি।\nঅর্ডার আইডি: #${order.id}\nনাম: ${order.customerName}\nমোবাইল: ${order.phone}\nমোট মূল্য: ৳${order.total}\nঠিকানা: ${order.address}\n\nঅনুগ্রহ করে অর্ডারটি দ্রুত প্রস্তুত ও নিশ্চিত করুন। ধন্যবাদ!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-stone-200 my-8">
        {/* Success Header */}
        <div className="bg-linear-to-b from-[#1B5E20] to-[#2E7D32] text-white p-6 text-center relative">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase tracking-widest bg-amber-400 text-stone-900 font-extrabold px-3 py-0.5 rounded-full inline-block mb-1.5">
            অর্ডার সফল হয়েছে 🎉
          </span>
          <h2 className="text-2xl font-black">ধন্যবাদ, {order.customerName}!</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-sm mx-auto">
            আপনার পিঠার অর্ডারটি আমাদের রান্নাঘরে পৌঁছেছে। কিছুক্ষণের মধ্যেই আমাদের প্রতিনিধি কল করে নিশ্চিত করবেন।
          </p>
        </div>

        {/* Invoice Summary Box */}
        <div className="p-6 space-y-4">
          {/* Brand Header for Invoice */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <BrandLogo variant="header" showSubtitle={true} />
            <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-1 rounded">
              অফিসিয়াল ইনভয়েস
            </span>
          </div>

          {/* Order Meta */}
          <div className="flex justify-between items-center bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block text-[11px]">অর্ডার রেফারেন্স নং</span>
              <span className="font-extrabold text-stone-900 text-sm">#{order.id}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-500 block text-[11px]">পেমেন্ট মেথড</span>
              <span className="font-bold text-[#1B5E20]">
                {order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.paymentMethod.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="text-xs space-y-1.5 text-stone-600 bg-[#FAF7F2] p-3.5 rounded-xl border border-amber-200/80">
            <div className="flex justify-between">
              <span className="text-stone-500">ফোন নম্বর:</span>
              <span className="font-bold text-stone-800">{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">ডেলিভারি এলাকা:</span>
              <span className="font-bold text-stone-800">
                {order.zone === 'inside_dhaka' ? 'ঢাকার ভেতরে (৳৭০)' : 'ঢাকার বাইরে (৳১৩০)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">ডেলিভারি ঠিকানা:</span>
              <span className="font-semibold text-stone-800 text-right max-w-[200px] truncate">
                {order.address}
              </span>
            </div>
            {order.notes && (
              <div className="flex justify-between pt-1 border-t border-amber-200/60">
                <span className="text-stone-500">বিশেষ নোট:</span>
                <span className="font-medium text-stone-700 italic">{order.notes}</span>
              </div>
            )}
          </div>

          {/* Items Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              অর্ডারের আইটেমসমূহ:
            </h4>
            <div className="space-y-1.5 max-h-36 overflow-y-auto divide-y divide-stone-100 text-xs">
              {order.items.map((item, idx) => {
                const price = item.selectedOption ? item.selectedOption.price : item.product.price;
                const portion = item.selectedOption ? item.selectedOption.unit : item.product.unit;
                return (
                  <div key={idx} className="pt-1.5 flex justify-between items-center">
                    <span className="truncate max-w-[260px] text-stone-800">
                      {item.product.name} ({portion}) × {item.quantity}
                    </span>
                    <span className="font-bold text-stone-900">৳{price * item.quantity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Sum */}
          <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
            <span className="font-bold text-sm text-stone-800">মোট প্রদেয় টাকা:</span>
            <span className="text-xl font-black text-[#1B5E20]">৳{order.total}</span>
          </div>

          {/* Action CTAs: WhatsApp & Print */}
          <div className="space-y-2 pt-2">
            <a
              href={`https://wa.me/8801711002233?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে দ্রুত কনফার্ম করুন (WhatsApp Order)</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePrint}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>রসিদ প্রিন্ট করুন</span>
              </button>

              <button
                onClick={onClose}
                className="bg-[#1B5E20] hover:bg-[#154a19] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>আরও পিঠা কিনুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
