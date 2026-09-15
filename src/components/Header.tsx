import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, SlidersHorizontal, Sparkles, ShieldCheck, X } from 'lucide-react';
import { CartItem, Product } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenPixelModal: () => void;
  onOpenAdminModal: () => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenPixelModal,
  onOpenAdminModal,
  onSelectProduct,
  allProducts,
  activeCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => {
    const price = item.selectedOption ? item.selectedOption.price : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const searchResults = searchQuery.trim() === ''
    ? []
    : allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#1B5E20] text-white text-xs md:text-sm py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-[#2E7D32] px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider text-amber-200">
              <Sparkles className="w-3 h-3 animate-spin text-amber-300" /> অফার
            </span>
            <p className="truncate">
              শীতের তাজা খেজুরের নলেন গুড় ও খাঁটি পিঠায় চলছে ধামাকা ছাড়! দেশজুড়ে ক্যাশ অন ডেলিভারি।
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs shrink-0 text-emerald-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> ১০০% খাঁটি উপাদান
            </span>
            <span>|</span>
            <a href="tel:01711002233" className="hover:text-amber-200 flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-300" /> ০১৭১১-০০২২৩৩
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="group flex items-center">
              <BrandLogo variant="header" />
            </a>
          </div>

          {/* Search Bar with Autocomplete */}
          <div className="relative flex-1 max-w-lg hidden sm:block">
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="ভাপা পিঠা, পাটিসাপটা, নলেন গুড়, সরিষার তেল খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#FAF7F2] border border-stone-200 rounded-full pl-11 pr-10 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/15 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 max-h-80 overflow-y-auto"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="px-3 py-1 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  পাওয়া গেছে ({searchResults.length} টি পণ্য)
                </div>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="px-3 py-2 hover:bg-emerald-50 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">{item.name}</p>
                      <p className="text-xs text-[#1B5E20] font-bold">৳{item.price} <span className="text-stone-400 font-normal">/ {item.unit}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Tools: Facebook Ads / Pixel Setup, Product Manager, Hotline & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Facebook Pixel Button (Direct response to user question) */}
            <button
              id="header-facebook-ads-btn"
              onClick={onOpenPixelModal}
              title="ফেসবুক অ্যাড ও পিক্সেল ট্র্যাকিং সেটিংস"
              className="flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2.5 sm:px-3 py-2 rounded-full transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="hidden lg:inline">ফেসবুক অ্যাডস ও পিক্সেল</span>
              <span className="lg:hidden">অ্যাড ও পিক্সেল</span>
            </button>

            {/* Admin / Grocery Manager Button */}
            <button
              id="header-admin-btn"
              onClick={onOpenAdminModal}
              title="পণ্য ও অর্ডার পরিচালনা (নতুন গ্রোসারি যুক্ত করুন)"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 px-3 py-2 rounded-full transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-600" />
              <span>পণ্য ও গ্রোসারি অ্যাড</span>
            </button>

            {/* Hotline Call Button */}
            <a
              id="header-hotline-btn"
              href="tel:01711002233"
              className="hidden xl:flex items-center gap-2 text-stone-700 hover:text-[#1B5E20] bg-[#FAF7F2] border border-stone-200 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center">
                <Phone className="w-3 h-3" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-stone-400 leading-none">হটলাইন কল</div>
                <div className="font-bold text-stone-800 leading-tight">০১৭১১-০০২২৩৩</div>
              </div>
            </a>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#1B5E20] hover:bg-[#154a19] text-white px-3 sm:px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-stone-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-emerald-100 leading-none">কার্ট</span>
                <span className="text-xs font-bold leading-tight">৳{totalCartPrice}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 sm:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="পিঠা, গুড়, খাঁটি সরিষার তেল খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-stone-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-800 placeholder-stone-400"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          {searchQuery && searchResults.length > 0 && (
            <div className="mt-1 bg-white rounded-lg shadow-lg border border-stone-200 py-1 divide-y divide-stone-100">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    setSearchQuery('');
                  }}
                  className="px-3 py-2 flex items-center gap-2"
                >
                  <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded object-cover" />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-stone-900 truncate">{item.name}</p>
                    <p className="text-[#1B5E20] font-bold">৳{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none border-t border-stone-100 mt-2 text-xs sm:text-sm">
          {[
            { id: 'all', label: 'সব পণ্য (All)' },
            { id: 'pitha', label: 'ঐতিহ্যবাহী পিঠা সম্ভার 🥟' },
            { id: 'ingredients', label: 'পিঠার উপকরণ ও খাঁটি গুড় 🍯' },
            { id: 'grocery', label: 'আসন্ন গ্রোসারি আইটেম 🌿 (তেল, মধু, চাল)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#1B5E20] text-white shadow-xs'
                  : 'bg-stone-100/80 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
