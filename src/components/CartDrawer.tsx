import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const price = item.selectedOption ? item.selectedOption.price : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const freeDeliveryThreshold = 1000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                আপনার শপিং ব্যাগ ({items.reduce((s, i) => s + i.quantity, 0)} টি)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Target Meter */}
          <div className="px-4 py-3 bg-amber-50/70 border-b border-amber-200 text-xs text-stone-800">
            {remainingForFreeDelivery > 0 ? (
              <p className="font-semibold text-amber-900 mb-1.5">
                আর মাত্র <span className="font-extrabold text-[#1B5E20]">৳{remainingForFreeDelivery}</span> টাকার অর্ডার করলেই ফ্রি ডেলিভারি!
              </p>
            ) : (
              <p className="font-semibold text-[#1B5E20] mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> অভিনন্দন! আপনি ফ্রি হোম ডেলিভারি পাচ্ছেন।
              </p>
            )}
            <div className="w-full bg-amber-200/80 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#1B5E20] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-stone-700 text-base">আপনার কার্ট খালি রয়েছে</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  তাজা গরম পিঠা কিংবা যশোরের খাঁটি নলেন গুড় পছন্দ করে কার্টে যোগ করুন।
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-[#1B5E20] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#154a19] transition-colors"
                >
                  মেন্যু দেখুন
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const itemPrice = item.selectedOption ? item.selectedOption.price : item.product.price;
                const portionLabel = item.selectedOption ? item.selectedOption.unit : item.product.unit;

                return (
                  <div
                    key={index}
                    className="flex gap-3 p-3 bg-stone-50/80 rounded-xl border border-stone-200/80 relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-stone-900 text-sm leading-tight truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">প্যাক: {portionLabel}</p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-800 min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-extrabold text-[#1B5E20] text-sm">
                            ৳{itemPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => onRemoveItem(index)}
                      title="আইটেম মুছুন"
                      className="text-stone-400 hover:text-red-600 p-1 self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF7F2] space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>মোট পণ্য মূল্য:</span>
                  <span className="font-bold text-stone-800">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-medium text-stone-700">
                    {subtotal >= freeDeliveryThreshold ? (
                      <span className="text-emerald-700 font-bold">ফ্রি (০৳)</span>
                    ) : (
                      'চেকআউটে নির্ধারিত হবে (৳৭০/৳১৩০)'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-1 border-t border-stone-200">
                  <span>সর্বমোট (আনুমানিক):</span>
                  <span className="text-base text-[#1B5E20]">৳{subtotal}</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={onProceedCheckout}
                className="w-full bg-[#1B5E20] hover:bg-[#154a19] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-500">
                🔒 ১০০% নিরাপদ ক্যাশ অন ডেলিভারি অথবা বিকাশ পেমেন্ট
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
