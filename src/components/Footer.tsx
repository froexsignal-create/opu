import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Facebook } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenPixelModal: () => void;
  onOpenAdminModal: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPixelModal,
  onOpenAdminModal,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t-4 border-[#1B5E20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-xs text-stone-400 leading-relaxed">
              ঘরের বাজারের মতো শতভাগ নির্ভেজাল, মাটির সান্নিধ্যে তৈরি খাঁটি গুড়ের পিঠা ও দেশীয় খাদ্যপণ্যের বিশ্বস্ত অনলাইন ঠিকানা। কোনো কৃত্রিম প্রিজারভেটিভ বা চিনি ছাড়া মায়ের হাতের নিখুঁত মমতা।
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
                title="ফেসবুক পেজ"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenPixelModal}
                className="text-[11px] bg-blue-900/40 hover:bg-blue-900/60 text-blue-300 border border-blue-700/50 px-2.5 py-1.5 rounded-lg transition-colors font-medium"
              >
                ফেসবুক অ্যাডস ও পিক্সেল সেটআপ
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">পণ্য সম্ভার</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onSelectCategory('pitha')} className="hover:text-amber-400 transition-colors">
                  ঐতিহ্যবাহী পিঠা সম্ভার (ভাপা, পাটিসাপটা, চিতই)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('ingredients')} className="hover:text-amber-400 transition-colors">
                  যশোরের নলেন ঝোলা গুড় ও পাটালি গুড়
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('ingredients')} className="hover:text-amber-400 transition-colors">
                  ঢেঁকি ছাঁটা আতপ চালের গুঁড়া
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('grocery')} className="hover:text-amber-400 transition-colors">
                  আসন্ন গ্রোসারি আইটেম (খাঁটি সরিষার তেল, মধু, ঘি)
                </button>
              </li>
              <li>
                <button onClick={onOpenAdminModal} className="text-emerald-400 font-semibold hover:underline">
                  + নতুন গ্রোসারি পণ্য যোগ করুন (স্টোর অ্যাডমিন)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Assurance */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">গ্রাহক সেবা ও নিয়মাবলি</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>১০০% ক্যাশ অন ডেলিভারি (দেখে মূল্য দিন)</span>
              </li>
              <li>ডেলিভারি চার্জ: ঢাকা ৳৭০ | সারা দেশ ৳১৩০</li>
              <li>হাইজিনিক ইনসুলেটেড গরম ফুড কন্টেইনারে ডেলিভারি</li>
              <li>প্যাকেজ ড্যামেজ হলে ইনস্ট্যান্ট রিটার্ন বা রিপ্লেসমেন্ট</li>
            </ul>
          </div>

          {/* Col 4: Contact Hotline */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">যোগাযোগ ও ঠিকানা</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-300 font-bold block">হটলাইন (সকাল ৯টা - রাত ১০টা):</span>
                  <a href="tel:01711002233" className="hover:text-white">০১৭১১-০০২২৩৩, ০১৮০০-১১২২৩৩</a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>order@mayerheshel.com</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>হেসেল কিচেন: বাড়ি # ১৪, রোড # ৫, ধানমন্ডি, ঢাকা-১২০৫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Security */}
        <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400">পেমেন্ট মেথড:</span>
            <span className="bg-stone-800 text-stone-300 px-2 py-1 rounded font-bold">ক্যাশ অন ডেলিভারি</span>
            <span className="bg-[#D12053] text-white px-2 py-1 rounded font-bold">bKash</span>
            <span className="bg-[#F7931E] text-white px-2 py-1 rounded font-bold">নগদ</span>
            <span className="bg-[#8A2BE2] text-white px-2 py-1 rounded font-bold">Rocket</span>
          </div>

          <div className="text-stone-500 text-[11px] flex items-center gap-1">
            <span>© {new Date().getFullYear()} মায়ের হেসেল (Mayer Heshel). সর্বস্বত্ব সংরক্ষিত।</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400">
              মায়ের মমতায় তৈরি <Heart className="w-3 h-3 fill-amber-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
