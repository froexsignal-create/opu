import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Zap, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Product, ProductOption } from '../types';
import { trackPixelEvent } from '../utils/pixel';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, option?: ProductOption, qty?: number) => void;
  onDirectOrder: (product: Product, option?: ProductOption) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectOrder,
}) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedOption(product.options && product.options.length > 0 ? product.options[0] : undefined);
      setQuantity(1);
      // Track ViewContent on Meta Pixel
      trackPixelEvent('ViewContent', {
        content_name: product.name,
        content_category: product.category,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: 'BDT',
      });
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedOption ? selectedOption.price : product.price;

  const handleAdd = () => {
    onAddToCart(product, selectedOption, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-stone-200 my-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-square md:aspect-auto bg-stone-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className={`absolute top-4 left-4 text-xs font-bold text-white px-2.5 py-1 rounded-md shadow-xs ${product.badgeColor || 'bg-[#1B5E20]'}`}>
                {product.tag}
              </span>
            )}
          </div>

          {/* Details Side */}
          <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800 ml-1">{product.rating}</span>
                </div>
                <span>•</span>
                <span>({product.reviewCount} জন ক্রেতার রিভিউ)</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-black text-stone-900 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-stone-400">{product.nameEn}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black text-[#1B5E20]">
                  ৳{currentPrice}
                </span>
                {product.originalPrice > currentPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-stone-500 ml-1">
                  / {selectedOption ? selectedOption.unit : product.unit}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Options selection */}
              {product.options && product.options.length > 0 && (
                <div className="mt-3">
                  <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                    প্যাকেট সাইজ নির্বাচন করুন:
                  </label>
                  <div className="space-y-1.5">
                    {product.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full p-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                          selectedOption?.label === opt.label
                            ? 'border-[#1B5E20] bg-emerald-50 text-[#1B5E20] ring-1 ring-[#1B5E20]'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className="font-bold">৳{opt.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients & Details Pills */}
              <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                <div className="text-[11px] text-stone-600">
                  <strong className="text-stone-800">উপকরণ: </strong>
                  {product.ingredients.join(', ')}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-[#1B5E20] shrink-0" />
                  <span>১০০% খাঁটি ও তাজা মাটির চুলায় প্রস্তুত</span>
                </div>
              </div>
            </div>

            {/* CTA & Quantity */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-1.5 bg-[#FAF7F2] hover:bg-stone-200 text-stone-800 border border-stone-300 py-3 rounded-xl text-xs font-bold transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>কার্টে যোগ করুন</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onDirectOrder(product, selectedOption);
                  }}
                  className="flex items-center justify-center gap-1.5 bg-[#1B5E20] hover:bg-[#154a19] text-white py-3 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>সরাসরি অর্ডার</span>
                </button>
              </div>

              {addedToast && (
                <div className="text-center text-xs font-bold text-[#1B5E20] flex items-center justify-center gap-1 bg-emerald-50 py-1.5 rounded-lg border border-emerald-200 animate-fade-in">
                  <Check className="w-3.5 h-3.5" /> পণ্যটি আপনার কার্টে যোগ করা হয়েছে!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
