import React, { useState, useEffect } from 'react';
import { X, Check, Activity, Sparkles, HelpCircle, Save, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { getPixelConfig, savePixelConfig, getPixelLogs, clearPixelLogs, trackPixelEvent } from '../utils/pixel';
import { PixelEventLog } from '../types';

interface FacebookPixelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacebookPixelModal: React.FC<FacebookPixelModalProps> = ({ isOpen, onClose }) => {
  const [pixelId, setPixelId] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [logs, setLogs] = useState<PixelEventLog[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'settings' | 'logs'>('guide');

  useEffect(() => {
    if (isOpen) {
      const config = getPixelConfig();
      setPixelId(config.pixelId);
      setIsEnabled(config.isEnabled);
      setLogs(getPixelLogs());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      setLogs(getPixelLogs());
    };
    window.addEventListener('mayer_heshel_pixel_event', handleUpdate);
    window.addEventListener('mayer_heshel_pixel_event_clear', handleUpdate);
    return () => {
      window.removeEventListener('mayer_heshel_pixel_event', handleUpdate);
      window.removeEventListener('mayer_heshel_pixel_event_clear', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    savePixelConfig({ pixelId: pixelId.trim(), isEnabled });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSendTestEvent = () => {
    trackPixelEvent('TestEvent_MayerHeshel', {
      time: new Date().toISOString(),
      shop: 'মায়ের হেসেল',
      purpose: 'ফেসবুক পিক্সেল টেস্ট',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-stone-200 my-6">
        {/* Header */}
        <div className="bg-linear-to-r from-[#1877F2] to-[#0D59C2] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner">
              <span className="font-black text-xl text-white">f</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">ফেসবুক অ্যাড ও পিক্সেল গাইড</h2>
                <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  সম্পূর্ণ প্রস্তুত
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                ভবিষ্যতে ফেসবুকে বিজ্ঞাপন ও কনভার্সন ট্র্যাকিং সম্পর্কিত সার্বিক দিকনির্দেশনা
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2 gap-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-[#1877F2] text-[#1877F2]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>কে অ্যাড চালাবে ও কীভাবে করবেন?</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-[#1877F2] text-[#1877F2]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>পিক্সেল আইডি সেটআপ</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'border-[#1877F2] text-[#1877F2]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>লাইভ ইভেন্ট ট্র্যাকার ({logs.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'guide' && (
            <div className="space-y-6 text-stone-800 text-sm">
              {/* Question Answer Box */}
              <div className="p-4 sm:p-5 bg-amber-50/80 border border-amber-300 rounded-2xl">
                <h3 className="font-extrabold text-base text-amber-950 flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                  প্রশ্ন: &ldquo;আমি ভবিষ্যতে ফেসবুকে অ্যাড রান করব। কে এই ব্যবস্থাটা করবে?&rdquo;
                </h3>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  <strong>উত্তর:</strong> আপনার মায়ের হেসেল ওয়েবসাইটের জন্য ফেসবুকে অ্যাড রান করার ২টি চমৎকার এবং সহজ বিকল্প ব্যবস্থা রয়েছে:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-amber-200">
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs">
                    <h4 className="font-bold text-[#1B5E20] text-sm flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1B5E20] text-xs flex items-center justify-center font-bold">১</span>
                      আপনি নিজেই করতে পারবেন (সহজ উপায়)
                    </h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      ফেসবুকের <strong>Meta Business Suite</strong> বা মোবাইল অ্যাপ দিয়েই সরাসরি আপনার মায়ের হেসেল পেজ থেকে পোস্ট বা রিল বুস্ট করতে পারবেন। শুধু ডুয়েল কারেন্সি কার্ড বা আন্তর্জাতিক ক্রেডিট/ডেবিট কার্ড যুক্ত করলেই যেকোনো সময় দিনে $২–$৫ দিয়ে অ্যাড চালু করতে পারেন।
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs">
                    <h4 className="font-bold text-[#1877F2] text-sm flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1877F2] text-xs flex items-center justify-center font-bold">২</span>
                      ডিজিটাল মার্কেটার বা এজেন্সি দিয়ে
                    </h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      আপনি যদি ঝামেলাহীনভাবে পেশাদার অডিয়েন্স টার্গেটিং (যেমন: ঢাকার ভোজনরসিক মানুষ, শীতের পিঠাপ্রেমী পরিবার) চান, তবে একজন বিশ্বস্ত <strong>ডিজিটাল মার্কেটার বা ফেসবুক অ্যাডস স্পেশালিস্টকে</strong> হায়্যার করতে পারেন। তারা অ্যাড কপি, ভিডিও এবং বাজেট ম্যানেজ করে দেবে।
                    </p>
                  </div>
                </div>
              </div>

              {/* Ready In Website Box */}
              <div className="p-4 sm:p-5 bg-emerald-50/70 border border-emerald-300 rounded-2xl">
                <h3 className="font-bold text-base text-emerald-950 flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  আমরা এই ওয়েবসাইটে আপনার জন্য কী কী রেডি করে রেখেছি?
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 mb-3">
                  ফেসবুকে বিজ্ঞাপন দিয়ে বেশি বিক্রি ও রিটার্গেটিং করার জন্য সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো <strong>Meta Pixel</strong>। এই ওয়েবসাইটে সমস্ত কোড আমরা আগে থেকেই সংযুক্ত করে দিয়েছি:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200 flex items-start gap-2">
                    <span className="font-bold text-emerald-700">✓ PageView:</span>
                    <span className="text-stone-600">ওয়েবসাইটে ভিজিটর আসলেই ফেসবুক স্বয়ংক্রিয়ভাবে ট্র্যাক করবে।</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200 flex items-start gap-2">
                    <span className="font-bold text-emerald-700">✓ ViewContent:</span>
                    <span className="text-stone-600">কোন পিঠাটি বা গুড় কাস্টমার দেখছেন তা ফেসবুকে রেকর্ড হবে।</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200 flex items-start gap-2">
                    <span className="font-bold text-emerald-700">✓ AddToCart:</span>
                    <span className="text-stone-600">কার্টে পিঠা যোগ করলে রিটার্গেটিং অডিয়েন্স তৈরি হবে।</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200 flex items-start gap-2">
                    <span className="font-bold text-emerald-700">✓ Purchase:</span>
                    <span className="text-stone-600">অর্ডার সম্পন্ন হলে মোট টাকার অংক (BDT) সহ নিখুঁত কনভার্সন ট্র্যাক হবে।</span>
                  </div>
                </div>
              </div>

              {/* Tips for Pitha Business */}
              <div className="p-4 sm:p-5 bg-stone-50 border border-stone-200 rounded-2xl">
                <h3 className="font-bold text-sm text-stone-900 mb-2">
                  💡 পিঠা ব্যবসার জন্য ফেসবুক অ্যাডে বেশি সেল পাওয়ার ৩টি গোপন কৌশল:
                </h3>
                <ul className="space-y-2 text-xs text-stone-700 list-disc list-inside">
                  <li><strong>ধোঁয়া ওঠা ভাপা ও পাটিসাপটার রিল:</strong> মাটির চুলায় পিঠা তৈরি ও ধোঁয়া ওঠার ৮–১২ সেকেন্ডের খাঁটি মোবাইল ভিডিও সবচেয়ে বেশি ভাইরাল হয়।</li>
                  <li><strong>লোকেশন টার্গেটিং:</strong> শীতকালে ঢাকার গুলশান, বনানী, ধানমন্ডি, উত্তরা, মিরপুর এরিয়া টার্গেট করে অ্যাড চালালে দ্রুত একই দিনে হট ডেলিভারি দেওয়া যায়।</li>
                  <li><strong>ক্যাশ অন ডেলিভারির আশ্বাস:</strong> ক্যাপশনে স্পষ্ট লিখবেন &ldquo;পণ্য হাতে পেয়ে টাকা পরিশোধ&rdquo;, এতে বাংলাদেশের গ্রাহকরা শতভাগ নিশ্চিন্তে অর্ডার করে।</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-5">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 leading-relaxed">
                <p className="font-bold text-sm mb-1">কীভাবে পিক্সেল আইডি পাবেন?</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                  <li>Facebook Business Manager / Events Manager এ যান।</li>
                  <li>Data Sources &gt; Pixels / Datasets এ গিয়ে আপনার ১৬ ডিজিটের Pixel ID টি কপি করুন।</li>
                  <li>নিচের বক্সে পেস্ট করে &ldquo;সংরক্ষণ করুন&rdquo; চাপুন। ব্যাস, সাথে সাথে ওয়েবসাইটে ট্র্যাকিং শুরু হবে!</li>
                </ol>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Meta Pixel ID (১৬ ডিজিটের আইডি)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: 984120394810293"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-900 focus:outline-hidden focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    বর্তমানে ডেমো/টেস্ট আইডি প্রি-কনফিগার করা আছে। আপনি যেকোনো সময় আসল আইডি বসাতে পারবেন।
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enable-pixel"
                    checked={isEnabled}
                    onChange={(e) => setIsEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1877F2] focus:ring-[#1877F2]"
                  />
                  <label htmlFor="enable-pixel" className="text-xs font-semibold text-stone-800">
                    ওয়েবসাইটে ফেসবুক পিক্সেল সক্রিয় (Enabled) রাখুন
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#0D59C2] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>সংরক্ষণ করুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendTestEvent}
                    className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>টেস্ট ইভেন্ট পাঠান</span>
                  </button>

                  {saveSuccess && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> সংরক্ষিত হয়েছে!
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-stone-600">
                  এই ওয়েবসাইটে কাস্টমার যখনই পেজ দেখে, কার্টে পণ্য যোগ করে বা অর্ডার দেয়, সেই ইভেন্টগুলো এখানে সরাসরি প্রদর্শিত হয়:
                </p>
                <button
                  onClick={clearPixelLogs}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold underline"
                >
                  লগ পরিষ্কার করুন
                </button>
              </div>

              {logs.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-xs">
                  এখনো কোনো ইভেন্ট লগ হয়নি। কোনো পিঠার কার্ডে &ldquo;কার্টে যোগ&rdquo; করুন বা টেস্ট ইভেন্ট পাঠান।
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs flex justify-between items-start gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1877F2]">{log.eventName}</span>
                          <span className="text-[10px] text-stone-400">{log.timestamp}</span>
                        </div>
                        {log.data && (
                          <pre className="text-[11px] text-stone-600 mt-1 overflow-x-auto max-w-lg">
                            {JSON.stringify(log.data, null, 1)}
                          </pre>
                        )}
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded shrink-0">
                        Dispatched
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
          <span>মায়ের হেসেল ডিজিটাল মার্কেটিং সাপোর্ট</span>
          <button
            onClick={onClose}
            className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-xl font-bold transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
