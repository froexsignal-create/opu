import React from 'react';
import { ShieldCheck, Flame, PackageCheck, Banknote } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: '১০০% খাঁটি ও নির্ভেজাল',
      desc: 'কোনো কৃত্রিম রং, রাসায়নিক বা চিনি নেই। আসল যশোরের গুড় ও তাজা নারকেল।',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-700 text-white',
    },
    {
      icon: Flame,
      title: 'অর্ডারের পর তাজা তৈরি',
      desc: 'আগে থেকে বানিয়ে ফ্রিজে রাখা হয় না। আপনি অর্ডার করলেই যত্ন নিয়ে তাজা প্রস্তুত হয়।',
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      iconBg: 'bg-amber-600 text-white',
    },
    {
      icon: PackageCheck,
      title: 'হাইজিনিক ও নিরাপদ প্যাকিং',
      desc: 'উষ্ণ ফুড-গ্রেড বক্সে প্যাকেজিং করা হয়, যেন গরম এবং তরতাজা সুবাস অটুট থাকে।',
      color: 'bg-stone-50 text-stone-900 border-stone-200',
      iconBg: 'bg-stone-800 text-white',
    },
    {
      icon: Banknote,
      title: 'ক্যাশ অন ডেলিভারি',
      desc: 'পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের শতভাগ বিশ্বস্ত ও নিশ্চিন্ত সুবিধা।',
      color: 'bg-teal-50 text-teal-900 border-teal-200',
      iconBg: 'bg-teal-700 text-white',
    },
  ];

  return (
    <section className="py-8 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border ${item.color} flex items-start gap-3.5 transition-all hover:shadow-md`}
              >
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-snug">{item.title}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
