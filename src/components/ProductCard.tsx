import React, { useState } from 'react';
import { ShoppingCart, Zap, Star, Eye } from 'lucide-react';
import { Product, ProductOption } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, option?: ProductOption) => void;
  onDirectOrder: (product: Product, option?: ProductOption) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onDirectOrder,
  onQuickView,
}) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>(
    product.options && product.options.length > 0 ? product.options[0] : undefined
  );

  const currentPrice = selectedOption ? selectedOption.price : product.price;
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges / Discount Tag */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.tag && (
            <span className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-md shadow-xs ${product.badgeColor || 'bg-[#1B5E20]'}`}>
              {product.tag}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-[11px] font-extrabold bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded-md shadow-xs">
              {discountPercentage}% ছাড়
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          title="বিস্তারিত দেখুন"
          className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-white/90 text-stone-700 hover:text-white hover:bg-[#1B5E20] flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
        >
          <Eye className="w-4 h-4" />
        </button>

        {product.category === 'grocery' && (
          <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-1 rounded-lg text-center flex items-center justify-center gap-1">
            <span>🌿 গ্রোসারি কালেকশন (অর্ডার বা প্রি-বুক)</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-stone-800 ml-1">{product.rating}</span>
            </div>
            <span>•</span>
            <span className="text-[11px]">({product.reviewCount} টি রিভিউ)</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-stone-900 text-base line-clamp-1 cursor-pointer hover:text-[#1B5E20] transition-colors"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Weight / Pack Options Selector (If available) */}
          {product.options && product.options.length > 0 && (
            <div className="mt-3">
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                পরিমাণ নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {product.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all text-left truncate ${
                      selectedOption?.label === opt.label
                        ? 'border-[#1B5E20] bg-emerald-50 text-[#1B5E20] ring-1 ring-[#1B5E20]'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50'
                    }`}
                  >
                    <span className="truncate block">{opt.unit}</span>
                    <span className="text-[11px] font-bold">৳{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-extrabold text-[#1B5E20]">
              ৳{currentPrice}
            </span>
            {product.originalPrice > currentPrice && (
              <span className="text-xs text-stone-400 line-through font-medium">
                ৳{product.originalPrice}
              </span>
            )}
            <span className="text-[11px] text-stone-500 font-normal ml-auto">
              {selectedOption ? selectedOption.unit : product.unit}
            </span>
          </div>

          {/* Action Buttons: 1-Click Direct Order & Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product, selectedOption)}
              className="flex items-center justify-center gap-1.5 bg-[#FAF7F2] hover:bg-stone-200 text-stone-800 border border-stone-300 py-2 px-2 rounded-xl text-xs font-bold transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-stone-600" />
              <span>কার্টে যোগ</span>
            </button>

            <button
              onClick={() => onDirectOrder(product, selectedOption)}
              className="flex items-center justify-center gap-1.5 bg-[#1B5E20] hover:bg-[#154a19] text-white py-2 px-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>সরাসরি অর্ডার</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
