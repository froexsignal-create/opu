import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Clock, HeartHandshake } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeroBannerProps {
  onExplorePitha: () => void;
  onExploreGrocery: () => void;
  onOpenPixelModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExplorePitha,
  onExploreGrocery,
  onOpenPixelModal,
}) => {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-[#FAF4EB] via-[#F4EDE0] to-[#FAF7F2] border-b border-amber-100/70 py-8 sm:py-12 lg:py-16">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 bg-amber-100/90 border border-amber-300 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span>ঘরের বাজারের মতো শতভাগ বিশুদ্ধতা ও আস্থার প্রতীক</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight sm:leading-tight">
              মায়ের হাতের মমতা ও <br className="hidden sm:inline" />
              <span className="text-[#1B5E20] underline decoration-amber-400 decoration-wavy decoration-2">
                খাঁটি নলেন গুড়ের
              </span>{' '}
              ঐতিহ্যবাহী পিঠা
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ঢেঁকি ছাঁটা চালের গুঁড়া, যশোরের খেজুরের ঝোলা গুড় ও দেশি গরুর খাঁটি দুধে তৈরি গরম নরম ভাপা, পাটিসাপটা, ও রস চিতই পিঠা। সাথে দ্রুত যুক্ত হচ্ছে আমাদের প্রিমিয়াম অর্গানিক গ্রোসারি কালেকশন।
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                id="hero-order-pitha-btn"
                onClick={onExplorePitha}
                className="flex items-center gap-2 bg-[#1B5E20] hover:bg-[#154a19] text-white px-6 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>গরম পিঠা অর্ডার করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-grocery-btn"
                onClick={onExploreGrocery}
                className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 px-5 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all"
              >
                <span>গ্রোসারি আইটেমসমূহ 🌿</span>
              </button>

              <button
                id="hero-facebook-guide-btn"
                onClick={onOpenPixelModal}
                className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold bg-blue-50/80 hover:bg-blue-100 border border-blue-200 px-3.5 py-2.5 rounded-full transition-colors"
              >
                <span>ফেসবুকে অ্যাড রান করার নিয়ম?</span>
              </button>
            </div>

            {/* Mini Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-amber-200/60 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>১০০% রাসায়নিক মুক্ত খাঁটি উপাদান</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>অর্ডারের পর তাজা প্রস্তুতকৃত</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium col-span-2 sm:col-span-1">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span>ক্যাশ অন ডেলিভারি (পণ্য দেখে দাম)</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame with Warm Shadow & Border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-amber-50">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
                  alt="ঐতিহ্যবাহী নলেন গুড়ের ভাপা ও পাটিসাপটা পিঠা"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-xs font-semibold bg-amber-500 text-stone-950 px-2 py-0.5 rounded w-max mb-1">
                    আজকের সেরা পছন্দ
                  </span>
                  <h3 className="text-lg font-bold">নলেন গুড়ের ধোঁয়া ওঠা স্পেশাল ভাপা পিঠা</h3>
                  <p className="text-xs text-stone-200">খেজুরের তরল নলেন গুড় ও টাটকা নারকেলের রাজকীয় মেলবন্ধন</p>
                </div>
              </div>

              {/* Official Brand Logo Seal */}
              <div className="absolute -top-5 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border-2 border-emerald-600/30 flex items-center gap-2.5 z-20 hover:scale-105 transition-transform">
                <BrandLogo variant="icon" className="w-11 h-11 bg-white border border-stone-100" />
                <div className="text-left pr-2">
                  <div className="text-[12px] font-black text-[#1B5E20] leading-tight">মায়ের হেসেল</div>
                  <div className="text-[9px] font-extrabold text-stone-600 tracking-wider">হোমমেড খাবার</div>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-amber-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                  ৳২৪০
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase">বিশেষ ছাড়</div>
                  <div className="text-xs font-bold text-stone-900">ভাপা পিঠা ৫ পিস বক্স</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-emerald-200 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#1B5E20]" />
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900">৫,০০০+ সন্তুষ্ট গ্রাহক</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">৪.৯ ★ রেটিং রিভিউ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
