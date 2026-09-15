import React, { useState, useEffect } from 'react';
import { X, Plus, Package, ShoppingBag, CheckCircle, Clock, Truck, Layers, Image as ImageIcon, Upload, RotateCcw, Sparkles } from 'lucide-react';
import { Product, ProductCategory, Order, OrderStatus } from '../types';
import { BrandLogo } from './BrandLogo';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  products: Product[];
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  products,
}) => {
  const [activeTab, setActiveTab] = useState<'add_product' | 'view_orders' | 'all_products' | 'brand_logo'>('add_product');
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentLogo, setCurrentLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mayer_heshel_logo_img') || null;
    } catch {
      return null;
    }
  });
  const [logoSaveSuccess, setLogoSaveSuccess] = useState(false);

  // Logo file upload handler
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        localStorage.setItem('mayer_heshel_logo_img', dataUrl);
        setCurrentLogo(dataUrl);
        setLogoSaveSuccess(true);
        setTimeout(() => setLogoSaveSuccess(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    localStorage.removeItem('mayer_heshel_logo_img');
    setCurrentLogo(null);
    setLogoSaveSuccess(true);
    setTimeout(() => setLogoSaveSuccess(false), 2000);
  };

  // Add Product Form State
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState<ProductCategory>('grocery');
  const [price, setPrice] = useState<number | ''>(350);
  const [originalPrice, setOriginalPrice] = useState<number | ''>(400);
  const [unit, setUnit] = useState('১ কেজি প্যাকেট');
  const [tag, setTag] = useState('নতুন সংযোজন 🌿');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  // Load orders
  useEffect(() => {
    if (isOpen) {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('mayer_heshel_orders') || '[]');
        setOrders(savedOrders);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newProduct: Product = {
      id: 'custom_' + Date.now(),
      name: name.trim(),
      nameEn: nameEn.trim() || name.trim(),
      slug: (nameEn || name).toLowerCase().replace(/\s+/g, '-'),
      category,
      price: Number(price),
      originalPrice: Number(originalPrice || price),
      unit: unit.trim() || '১ প্যাকেট',
      rating: 5.0,
      reviewCount: 1,
      tag: tag.trim() || undefined,
      badgeColor: category === 'grocery' ? 'bg-emerald-700' : 'bg-amber-600',
      isAvailable: true,
      description: description.trim() || `${name} - মায়ের হেসেলের খাঁটি পণ্য।`,
      details: ['১০০% খাঁটি ও স্বাস্থ্যসম্মত প্যাকেজিং', 'সরাসরি প্রস্তুতকারক থেকে সংগৃহীত'],
      ingredients: ingredients
        ? ingredients.split(',').map((s) => s.trim())
        : ['১০০% খাঁটি দেশীয় উপাদান'],
      image:
        imageUrl.trim() ||
        (category === 'grocery'
          ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'),
    };

    onAddProduct(newProduct);
    setAddSuccess(true);
    setName('');
    setNameEn('');
    setDescription('');
    setImageUrl('');
    setTimeout(() => {
      setAddSuccess(false);
      setActiveTab('all_products');
    }, 1200);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('mayer_heshel_orders', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-stone-200 my-6">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">মায়ের হেসেল স্টোর অ্যাডমিন ও গ্রোসারি ম্যানেজার</h2>
              <p className="text-xs text-stone-400">নতুন গ্রোসারি/পিঠা আইটেম যুক্ত করুন ও কাস্টমার অর্ডার দেখুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2 gap-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('add_product')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'add_product'
                ? 'border-[#1B5E20] text-[#1B5E20]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পণ্য/গ্রোসারি যোগ করুন</span>
          </button>

          <button
            onClick={() => setActiveTab('all_products')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'all_products'
                ? 'border-[#1B5E20] text-[#1B5E20]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>বর্তমান পণ্য তালিকা ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('view_orders')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'view_orders'
                ? 'border-[#1B5E20] text-[#1B5E20]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>গ্রাহকের অর্ডার সমূহ ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('brand_logo')}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'brand_logo'
                ? 'border-[#1B5E20] text-[#1B5E20]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>ব্র্যান্ড লোগো</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'add_product' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                ✨ <strong>গ্রোসারি সম্প্রসারণ:</strong> আপনি ভবিষ্যতে যত নতুন গ্রোসারি পণ্য (যেমন: খাঁটি মধু, সরিষার তেল, চাল, ডাল, ঘি, মসলা) আনতে চান, তা খুব সহজে এখান থেকে লাইভ স্টোরে যুক্ত করতে পারবেন।
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    পণ্যের নাম (বাংলা) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: পাবনার খাঁটি গাওয়া ঘি"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs focus:ring-1 focus:ring-[#1B5E20]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    English Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Deshi Ghee"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs focus:ring-1 focus:ring-[#1B5E20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs"
                  >
                    <option value="grocery">গ্রোসারি আইটেম (Grocery)</option>
                    <option value="pitha">পিঠা সম্ভার (Pitha)</option>
                    <option value="ingredients">পিঠার উপকরণ ও গুড় (Ingredients)</option>
                    <option value="sweets">খাঁটি মিষ্টান্ন (Sweets)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">পূর্বের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">প্যাকেজিং / ওজন ইউনিট</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="যেমন: ১ লিটার বোতল / ৫০০ গ্রাম জার"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">স্পেশাল ব্যাজ / ট্যাগ</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="যেমন: নতুন আইটেম 🌿 / হট সেলিং 🔥"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">পণ্যের বিস্তারিত বর্ণনা</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="পণ্য সম্পর্কে ক্রেতাদের আকৃষ্ট করার মতো বিস্তারিত লিখুন..."
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">ছবি লিঙ্ক (Image URL - ঐচ্ছিক)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-xs"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#1B5E20] hover:bg-[#154a19] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>পণ্যটি শপে যুক্ত করুন</span>
                </button>

                {addSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> সফলভাবে শপে যোগ হয়েছে!
                  </span>
                )}
              </div>
            </form>
          )}

          {activeTab === 'all_products' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500">
                বর্তমানে মোট {products.length} টি পণ্য আপনার হেসেল স্টোরে লাইভ প্রদর্শিত হচ্ছে:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {products.map((p) => (
                  <div key={p.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3">
                    <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-lg object-cover border" />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-stone-900 truncate">{p.name}</p>
                      <p className="text-stone-500">{p.unit}</p>
                      <p className="font-extrabold text-[#1B5E20] mt-0.5">৳{p.price}</p>
                    </div>
                    <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded uppercase font-semibold">
                      {p.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'view_orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-xs">
                  এখনো কোনো অর্ডার প্লেস হয়নি। টেস্ট করার জন্য ওয়েবসাইট থেকে একটি অর্ডার দিন!
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
                      <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                        <div>
                          <span className="font-bold text-stone-900 text-sm">#{ord.id}</span>
                          <span className="text-stone-400 ml-2">
                            {new Date(ord.createdAt).toLocaleDateString('bn-BD')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-stone-500">স্ট্যাটাস:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-semibold text-stone-800"
                          >
                            <option value="pending">অপেক্ষারত (Pending)</option>
                            <option value="preparing">প্রস্তুত হচ্ছে (Preparing)</option>
                            <option value="on_delivery">ডেলিভারিতে বের হয়েছে</option>
                            <option value="delivered">ডেলিভার্ড (Delivered)</option>
                            <option value="cancelled">বাতিল (Cancelled)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-stone-700">
                        <div><strong>গ্রাহক:</strong> {ord.customerName} ({ord.phone})</div>
                        <div><strong>ঠিকানা:</strong> {ord.address} ({ord.zone === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'})</div>
                        <div><strong>পেমেন্ট:</strong> {ord.paymentMethod.toUpperCase()}</div>
                        <div><strong>সর্বমোট:</strong> <span className="font-bold text-[#1B5E20]">৳{ord.total}</span></div>
                      </div>

                      <div className="pt-2 border-t border-stone-200/80">
                        <span className="text-stone-500">আইটেমসমূহ: </span>
                        <span className="text-stone-800 font-medium">
                          {ord.items.map((i) => `${i.product.name} (${i.quantity}x)`).join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Brand Logo Settings Tab */}
          {activeTab === 'brand_logo' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900">
                    মায়ের হেসেল অফিসিয়াল ব্র্যান্ড লোগো
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    আপনার প্রদত্ত আসল লোগোটি ("মায়ের হেসেল - হোমমেড খাবার") বর্তমানে ওয়েবসাইটের হেডার, ফুটার, হিরো ব্যানার এবং কাস্টমার ইনভয়েসে সক্রিয় করা আছে। আপনি চাইলে আপনার ডিভাইস থেকে অন্য কোনো ছবিও সরাসরি আপলোড করে তাৎক্ষণিক পরিবর্তন করতে পারবেন।
                  </p>
                </div>
              </div>

              {logoSaveSuccess && (
                <div className="bg-emerald-600 text-white p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
                  <CheckCircle className="w-4 h-4" />
                  <span>লোগো সফলভাবে সংরক্ষিত হয়েছে! সমগ্র ওয়েবসাইটে এটি কার্যকর হয়েছে।</span>
                </div>
              )}

              {/* Logo Previews in Different Contexts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Crest Preview */}
                <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
                    অফিসিয়াল লোগো ক্রেস্ট
                  </span>
                  <div className="w-40 h-40 bg-white rounded-3xl p-3 shadow-lg border border-stone-200 flex items-center justify-center">
                    <img
                      src={currentLogo || '/logo.svg'}
                      alt="মায়ের হেসেল লোগো"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] text-stone-400 mt-2 font-medium">
                    {currentLogo ? 'কাস্টম আপলোডকৃত ইমেজ' : 'অফিসিয়াল ভেক্টর ফরম্যাট'}
                  </span>
                </div>

                {/* Dark & Header Context Mockups */}
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-stone-200">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                      হেডার নেভিগেশনে যেমন দেখাবে:
                    </span>
                    <div className="bg-white p-3 rounded-xl border border-stone-100 flex items-center gap-3">
                      <BrandLogo variant="header" />
                    </div>
                  </div>

                  <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                      ডার্ক ফুটারে যেমন দেখাবে:
                    </span>
                    <BrandLogo variant="footer" />
                  </div>
                </div>
              </div>

              {/* Upload Controls */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#1B5E20]" />
                  <span>ডিভাইস থেকে নতুন লোগো ফাইল আপলোড করুন (PNG/JPG/SVG)</span>
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer bg-[#1B5E20] hover:bg-[#144818] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>লোগো ফাইল নির্বাচন করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      className="hidden"
                    />
                  </label>

                  {currentLogo && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>রিসেট করুন (আসল ভেক্টর লোগো)</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-stone-500">
                  সুপারিশ: স্বচ্ছ বা সাদা ব্যাকগ্রাউন্ডের উচ্চ রেজোলিউশনের স্কয়ার (১:১ অনুপাতের) ছবি ব্যবহার করুন।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
