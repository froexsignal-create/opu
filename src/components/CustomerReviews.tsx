import React from 'react';
import { Star, Quote, Heart, CheckCircle2 } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'তানজিলা রহমান',
      location: 'উত্তরা, ঢাকা',
      comment: 'মায়ের হেসেলের নলেন গুড়ের ভাপা পিঠা খেয়ে শৈশবের নানুবাড়ির কথা মনে পড়ে গেল! একদম গরম ও টাটকা পেয়েছি। গুড় এবং নারকেলের মিষ্টিটা অসাধারণ ব্যালেন্সড।',
      rating: 5,
      date: 'গতকাল',
      item: 'ঐতিহ্যবাহী নলেন গুড়ের ভাপা পিঠা',
    },
    {
      id: 2,
      name: 'ফারহান আহমেদ',
      location: 'ধানমন্ডি, ঢাকা',
      comment: 'ঘরের বাজারের মতো এত নির্ভেজাল ক্ষীর পাটিসাপটা ঢাকায় পাওয়া সত্যি দুর্লভ। ক্ষীরসাটা এত ঘন আর খাঁটি গরুর দুধের ছিল যে পরিবারের সবাই প্রশংসা করেছে।',
      rating: 5,
      date: '৩ দিন আগে',
      item: 'খাঁটি ক্ষীর পাটিসাপটা পিঠা',
    },
    {
      id: 3,
      name: 'নাজনীন সুলতানা',
      location: 'গুলশান-২, ঢাকা',
      comment: 'ডিম চিতই আর ৩ পদের ভর্তা শীতের সন্ধ্যার পারফেক্ট নাস্তা। ক্যাশ অন ডেলিভারি পেয়েছি সময়মতো। প্যাকেজিংও খুব প্রিমিয়াম ছিল।',
      rating: 5,
      date: '১ সপ্তাহ আগে',
      item: 'স্পেশাল ডিম চিতই ও ৩ পদের ভর্তা',
    },
  ];

  const faqs = [
    {
      q: 'পিঠা কি গরম অবস্থায় ডেলিভারি দেওয়া হয়?',
      a: 'হ্যাঁ, ঢাকায় ডেলিভারির ক্ষেত্রে প্রতিটি অর্ডার পাওয়ার পর তাজা ভাপে বা কড়াইয়ে তৈরি করে স্পেশাল ইনসুলেটেড উষ্ণ ফুড কন্টেইনারে গরম অবস্থাতেই পাঠানো হয়।',
    },
    {
      q: 'পিঠা কতদিন পর্যন্ত ভালো থাকে ও কীভাবে গরম করতে হবে?',
      a: 'ভাপা ও রস চিতই সাধারণ তাপমাত্রায় ১ দিন এবং ফ্রিজে ২ দিন ভালো থাকে। খাওয়ার আগে রাইস কুকার/পানির ভাপে ২ মিনিট অথবা ওভেনে ৩০ সেকেন্ড গরম করে নিলে আবার একদম তাজা স্বাদে খাওয়া যায়। নকশী পিঠা ও ভাজা পুলি এয়ারটাইট বক্সে ১ মাস পর্যন্ত মুচমুচে থাকে।',
    },
    {
      q: 'ঢাকার বাইরে কীভাবে ডেলিভারি পাওয়া যাবে?',
      a: 'নকশী পিঠা, ভাজা পুলি, যশোরের খাঁটি পাটালি গুড়, নলেন গুড় এবং খাঁটি গ্রোসারি আইটেমগুলো এসএ পরিবহন বা সুন্দরবন কুরিয়ার সার্ভিসের মাধ্যমে সারা বাংলাদেশে ২-৩ দিনে নিরাপদে পৌঁছে দেওয়া হয়।',
    },
  ];

  return (
    <section className="py-12 bg-linear-to-b from-[#FAF7F2] to-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Reviews Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1 text-[#1B5E20] font-bold text-xs bg-emerald-100 px-3 py-1 rounded-full mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#1B5E20]" />
              <span>আমাদের প্রিয় গ্রাহকদের অভিজ্ঞতা</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              মায়ের হেসেল সম্পর্কে গ্রাহকদের মতামত
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              শতভাগ খাঁটি উপকরণ ও ঘরোয়া স্বাদের জন্য আমাদের গ্রাহকদের অকুণ্ঠ ভালোবাসা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>

                  <Quote className="w-6 h-6 text-amber-300/80 mb-1" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1">
                      {rev.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E20]" />
                    </h4>
                    <span className="text-[11px] text-stone-500">{rev.location}</span>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded font-medium truncate max-w-[120px]">
                    {rev.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-[#FAF4EB] p-6 sm:p-8 rounded-3xl border border-amber-200/80">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলি (FAQ)
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              পিঠার বিশুদ্ধতা, ডেলিভারি ও সংরক্ষণ সম্পর্কিত সাধারণ কিছু জিজ্ঞাসা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/60 shadow-xs">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-2 text-[#1B5E20]">
                  {faq.q}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
